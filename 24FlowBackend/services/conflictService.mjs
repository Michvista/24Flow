import prisma from '../db.mjs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Convert Date to HHMM format (e.g., 1430 for 2:30 PM)
 */
function dateToHHMM(date) {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return hours * 100 + minutes;
}

/**
 * Convert HHMM to minutes since midnight
 */
function hhmmToMinutes(hhmm) {
	const h = Math.floor(hhmm / 100);
	const m = hhmm % 100;
	return h * 60 + m;
}

/**
 * Determine event priority based on title, description, and duration
 */
function calculatePriority(event) {
	const text = `${event.title || ''} ${event.desc || ''}`.toLowerCase();
	const duration = Math.round((event.endTime - event.startTime) / (1000 * 60));

	// URGENT: Critical keywords
	if (/\b(urgent|emergency|critical|asap|deadline|interview|exam)\b/.test(text)) {
		return 'URGENT';
	}

	// HIGH: Important events or long meetings
	if (
		/\b(meeting|presentation|call|appointment|client|boss|review|important)\b/.test(text) ||
		duration >= 120
	) {
		return 'HIGH';
	}

	// LOW: Personal or flexible tasks
	if (/\b(break|lunch|personal|optional|maybe|coffee|gym)\b/.test(text)) {
		return 'LOW';
	}

	return 'NORMAL';
}

/**
 * Find overlapping event clusters
 */
function findOverlapClusters(events) {
	if (!events.length) return [];

	const sorted = [...events].sort((a, b) => a.startTime - b.startTime);
	const clusters = [];
	let currentCluster = [sorted[0]];
	let clusterEnd = sorted[0].endTime;

	for (let i = 1; i < sorted.length; i++) {
		const event = sorted[i];

		if (event.startTime < clusterEnd) {
			currentCluster.push(event);
			clusterEnd = new Date(Math.max(clusterEnd.getTime(), event.endTime.getTime()));
		} else {
			if (currentCluster.length > 1) {
				clusters.push(currentCluster);
			}
			currentCluster = [event];
			clusterEnd = event.endTime;
		}
	}

	if (currentCluster.length > 1) {
		clusters.push(currentCluster);
	}

	return clusters;
}

/**
 * Use Gemini AI to generate smart rescheduling proposal
 */
async function generateAIProposal(overlappingEvents, allUserEvents) {
	try {
		// Sort by priority first, then by start time
		const sorted = [...overlappingEvents].sort((a, b) => {
			const priorityOrder = { URGENT: 0, HIGH: 1, NORMAL: 2, LOW: 3 };
			const aPriority = calculatePriority(a);
			const bPriority = calculatePriority(b);

			if (priorityOrder[aPriority] !== priorityOrder[bPriority]) {
				return priorityOrder[aPriority] - priorityOrder[bPriority];
			}

			return a.startTime.getTime() - b.startTime.getTime();
		});

		// Prepare context for AI
		const conflictingEventsInfo = sorted.map((e) => {
			const priority = calculatePriority(e);
			return {
				id: e.id,
				title: e.title,
				description: e.desc || '',
				startTime: e.startTime.toISOString(),
				endTime: e.endTime.toISOString(),
				duration: Math.round((e.endTime - e.startTime) / (1000 * 60)),
				priority: priority,
				isPriorityEvent: priority === 'URGENT' || priority === 'HIGH'
			};
		});

		// Get other events on the same day
		const dayStart = new Date(sorted[0].startTime);
		dayStart.setHours(0, 0, 0, 0);
		const dayEnd = new Date(dayStart);
		dayEnd.setHours(23, 59, 59, 999);

		const otherEventsRaw = allUserEvents.filter((e) => {
			const eventDate = new Date(e.startTime);
			return eventDate >= dayStart && eventDate <= dayEnd && !sorted.some((s) => s.id === e.id);
		});

		// Merge overlapping intervals for context
		function mergeIntervals(eventsList) {
			if (!eventsList.length) return [];
			const intervals = eventsList
				.map((ev) => ({ start: new Date(ev.startTime), end: new Date(ev.endTime) }))
				.sort((a, b) => a.start - b.start);
			const merged = [intervals[0]];
			for (let i = 1; i < intervals.length; i++) {
				const last = merged[merged.length - 1];
				if (intervals[i].start <= last.end) {
					last.end = new Date(Math.max(last.end.getTime(), intervals[i].end.getTime()));
				} else {
					merged.push(intervals[i]);
				}
			}
			return merged.map((m) => ({ start: m.start.toISOString(), end: m.end.toISOString() }));
		}

		const busySlots = mergeIntervals(otherEventsRaw);
		const sampleOtherEvents = otherEventsRaw.slice(0, 8).map((e) => ({
			title: e.title,
			startTime: e.startTime.toISOString(),
			endTime: e.endTime.toISOString(),
			priority: calculatePriority(e)
		}));

		// Enhanced AI prompt with priority-aware scheduling
		const prompt = `You are an expert scheduling assistant with deep understanding of task prioritization. Analyze this conflict and provide optimal rescheduling that RESPECTS PRIORITY LEVELS.

CONFLICTING EVENTS (sorted by priority):
${JSON.stringify(conflictingEventsInfo, null, 2)}

BUSY SLOTS ON SAME DAY (other scheduled events):
${JSON.stringify(busySlots, null, 2)}

SAMPLE OTHER EVENTS (for context):
${JSON.stringify(sampleOtherEvents, null, 2)}

CRITICAL SCHEDULING RULES (MUST FOLLOW IN ORDER):

1. **PRIORITY IS SACRED**: 
   - URGENT events MUST be scheduled first and cannot be moved unless absolutely impossible
   - HIGH priority events take precedence over NORMAL and LOW
   - NEVER move a higher priority event to accommodate a lower priority one
   - The highest priority event should occupy the best available time slot

2. **INTELLIGENT POSITIONING**:
   - If the highest priority event is NOT first in the original order, move IT to the best time slot
   - Lower priority events must work around higher priority ones
   - Keep URGENT/HIGH priority events during peak work hours (09:00-17:00)
   - LOW priority events can be moved to early morning, late afternoon, or next day

3. **MAINTAIN DURATION**: Every event must keep its original duration

4. **BUFFER ZONES**: Add 10-20 minute buffer between consecutive events

5. **AVOID CONFLICTS WITH BUSY SLOTS**: Don't overlap with the busy slots provided

6. **LUNCH HOUR**: Avoid scheduling during 12:00-13:00 when possible (unless URGENT)

7. **PREFER SAME DAY**: Try to keep all events on the same day unless impossible

8. **WORK HOURS PREFERENCE**: Schedule within 08:00-18:00 when possible

EXAMPLES OF CORRECT PRIORITY HANDLING:
- If "Client Presentation" (HIGH) conflicts with "Coffee Break" (LOW) at 10:00 → Keep presentation at 10:00, move coffee to 14:30
- If "Urgent Deadline" (URGENT) conflicts with "Team Meeting" (NORMAL) at 14:00 → Keep deadline at 14:00, reschedule meeting
- If "Interview" (HIGH) is second in list but conflicts with "Lunch" (LOW) → Give interview the better time slot

OUTPUT FORMAT - Return ONLY a JSON array with ALL ${sorted.length} events:
[
  {
    "id": "event-uuid",
    "title": "Event Title",
    "startTime": "2024-01-25T14:00:00.000Z",
    "endTime": "2024-01-25T15:00:00.000Z",
    "reasoning": "Brief explanation mentioning priority level"
  }
]

CRITICAL: 
- Return ONLY the JSON array (no markdown, no backticks, no extra text)
- All timestamps must be valid ISO 8601 strings
- Include ALL ${sorted.length} events in your response
- Base your decisions on PRIORITY FIRST, then optimize for time/convenience`;

		console.log('Calling Gemini API with priority-aware prompt...');

		if (!process.env.GEMINI_API_KEY) {
			console.warn('No API key, using fallback');
			return generateFallbackProposals(sorted);
		}

		// Retry logic
		const MAX_RETRIES = 2;
		let response = null;
		let aiText = null;

		for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
			try {
				response = await ai.models.generateContent({
					model: 'gemini-3-flash-preview',
					contents: prompt,
					generationConfig: {
						temperature: 0.3 // Lower temp for more consistent priority handling
					}
				});

				// Extract text from response
				if (typeof response === 'string' && response.trim()) {
					aiText = response;
				} else if (response?.text) {
					aiText = response.text;
				} else if (typeof response?.response?.text === 'function') {
					aiText = await response.response.text();
				} else if (response?.candidates) {
					for (const cand of response.candidates) {
						const parts = cand?.content?.parts;
						if (Array.isArray(parts)) {
							const combined = parts.map((p) => p.text || '').join('\n');
							if (combined.trim()) {
								aiText = combined;
								break;
							}
						}
					}
				}

				if (aiText?.trim()) break;
			} catch (err) {
				console.warn(`Attempt ${attempt + 1} failed:`, err?.message);
			}

			if (attempt < MAX_RETRIES) {
				await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
			}
		}

		if (!aiText?.trim()) {
			console.warn('Empty AI response, using fallback');
			return generateFallbackProposals(sorted);
		}

		console.log('AI response received');

		// Clean and parse
		let jsonText = aiText.trim();
		jsonText = jsonText.replace(/```json\s*/gi, '').replace(/```\s*/g, '');

		const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
		if (jsonMatch) {
			jsonText = jsonMatch[0];
		}

		const aiProposals = JSON.parse(jsonText);

		if (!Array.isArray(aiProposals) || aiProposals.length === 0) {
			throw new Error('Invalid proposals array');
		}

		// Validate proposals
		const validated = aiProposals.map((p) => {
			if (!p.id || !p.startTime || !p.endTime) {
				throw new Error(`Invalid proposal structure: ${JSON.stringify(p)}`);
			}

			const start = new Date(p.startTime);
			const end = new Date(p.endTime);

			if (isNaN(start.getTime()) || isNaN(end.getTime())) {
				throw new Error(`Invalid dates: ${p.startTime} or ${p.endTime}`);
			}

			return {
				id: p.id,
				title: p.title,
				startTime: p.startTime,
				endTime: p.endTime,
				reasoning: p.reasoning || 'AI-optimized with priority awareness'
			};
		});

		console.log('AI proposals validated:', validated.length);
		return validated;
	} catch (error) {
		console.error('AI proposal failed:', error.message);
		return generateFallbackProposals(overlappingEvents);
	}
}

/**
 * Fallback: Priority-aware sequential scheduling
 */
function generateFallbackProposals(events) {
	console.log('Using priority-aware fallback scheduling...');

	// Sort by priority, then by original time
	const sorted = [...events].sort((a, b) => {
		const priorityOrder = { URGENT: 0, HIGH: 1, NORMAL: 2, LOW: 3 };
		const aPriority = calculatePriority(a);
		const bPriority = calculatePriority(b);

		if (priorityOrder[aPriority] !== priorityOrder[bPriority]) {
			return priorityOrder[aPriority] - priorityOrder[bPriority];
		}

		return a.startTime.getTime() - b.startTime.getTime();
	});

	const proposals = [];
	let currentEndTime = sorted[0].endTime;

	// First event keeps its time (it's highest priority)
	proposals.push({
		id: sorted[0].id,
		title: sorted[0].title,
		startTime: sorted[0].startTime.toISOString(),
		endTime: sorted[0].endTime.toISOString(),
		reasoning: `Kept at original time (${calculatePriority(sorted[0])} priority)`
	});

	// Schedule remaining events sequentially with buffers
	for (let i = 1; i < sorted.length; i++) {
		const event = sorted[i];
		const duration = event.endTime.getTime() - event.startTime.getTime();
		const priority = calculatePriority(event);

		const bufferMinutes = 15;
		const bufferMs = bufferMinutes * 60 * 1000;

		const newStart = new Date(currentEndTime.getTime() + bufferMs);
		const newEnd = new Date(newStart.getTime() + duration);

		proposals.push({
			id: event.id,
			title: event.title,
			startTime: newStart.toISOString(),
			endTime: newEnd.toISOString(),
			reasoning: `Rescheduled with ${bufferMinutes}m buffer (${priority} priority, fallback mode)`
		});

		currentEndTime = newEnd;
	}

	console.log('Fallback proposals generated');
	return proposals;
}

/**
 * Generate unique error ID
 */
function generateErrorId() {
	const number = Math.floor(1000 + Math.random() * 9000);
	return `#ERR-${number}`;
}

/**
 * Store conflict in database
 */
async function storeConflict(userId, cluster, proposals, analysis) {
	const sorted = [...cluster].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

	const earliestHHMM = Math.min(...sorted.map((e) => dateToHHMM(e.startTime)));
	const earliestMinutes = hhmmToMinutes(earliestHHMM);

	// Create conflict record
	const conflict = await prisma.conflict.create({
		data: {
			userId,
			errorId: generateErrorId(),
			summary: `${cluster.length} Tasks Collision`,
			analysis,
			status: 'PENDING',
			tasks: {
				create: sorted.map((event, idx) => {
					const startHHMM = dateToHHMM(event.startTime);
					const endHHMM = dateToHHMM(event.endTime);

					return {
						eventId: event.id,
						title: event.title,
						startTime: event.startTime,
						endTime: event.endTime,
						displayStart: startHHMM,
						displayEnd: endHHMM,
						relativeStart: hhmmToMinutes(startHHMM) - earliestMinutes,
						relativeEnd: hhmmToMinutes(endHHMM) - earliestMinutes,
						taskType: idx === 0 ? 'STATIC' : 'CONFLICT',
						priority: calculatePriority(event)
					};
				})
			},
			proposals: {
				create: proposals.map((p) => {
					const proposalStart = new Date(p.startTime);
					const proposalEnd = new Date(p.endTime);
					const startHHMM = dateToHHMM(proposalStart);
					const endHHMM = dateToHHMM(proposalEnd);

					return {
						eventId: p.id,
						title: p.title,
						proposedStart: proposalStart,
						proposedEnd: proposalEnd,
						displayStart: startHHMM,
						displayEnd: endHHMM,
						relativeStart: hhmmToMinutes(startHHMM) - earliestMinutes,
						relativeEnd: hhmmToMinutes(endHHMM) - earliestMinutes,
						taskType: p.id === sorted[0].id ? 'STATIC' : 'CONFLICT',
						reasoning: p.reasoning
					};
				})
			}
		},
		include: {
			tasks: true,
			proposals: true
		}
	});

	return conflict;
}

/**
 * Get all active conflicts for a user
 */
export async function getActiveConflicts(userId) {
	try {
		console.log(`Fetching active conflicts for user ${userId}...`);

		const conflicts = await prisma.conflict.findMany({
			where: {
				userId,
				status: 'PENDING'
			},
			include: {
				tasks: {
					orderBy: { relativeStart: 'asc' }
				},
				proposals: {
					orderBy: { relativeStart: 'asc' }
				}
			},
			orderBy: {
				detectedAt: 'desc'
			}
		});

		console.log(`Found ${conflicts.length} active conflicts`);

		// Transform to frontend format
		return conflicts.map((c) => ({
			id: c.errorId,
			summary: c.summary,
			analysis: c.analysis,
			tasks: c.tasks.map((t) => ({
				id: t.eventId,
				title: t.title,
				start: t.relativeStart,
				end: t.relativeEnd,
				displayStart: t.displayStart,
				displayEnd: t.displayEnd,
				type: t.taskType.toLowerCase()
			})),
			proposals: c.proposals.map((p) => ({
				id: p.eventId,
				title: p.title,
				start: p.relativeStart,
				end: p.relativeEnd,
				displayStart: p.displayStart,
				displayEnd: p.displayEnd,
				isoStart: p.proposedStart.toISOString(),
				isoEnd: p.proposedEnd.toISOString(),
				type: p.taskType.toLowerCase(),
				reasoning: p.reasoning
			}))
		}));
	} catch (error) {
		console.error('Error fetching active conflicts:', error);
		throw error;
	}
}

/**
 * Detect and store new conflicts
 */
export async function detectAndStoreConflicts(userId) {
	try {
		console.log(`Detecting conflicts for user ${userId}...`);

		const events = await prisma.event.findMany({
			where: { userId },
			orderBy: { startTime: 'asc' }
		});

		if (events.length === 0) {
			return [];
		}

		const clusters = findOverlapClusters(events);

		if (clusters.length === 0) {
			console.log('No conflicts detected');
			return [];
		}

		console.log(`Found ${clusters.length} conflict clusters`);

		// Store each cluster as a conflict
		const storedConflicts = await Promise.all(
			clusters.map(async (cluster) => {
				const proposals = await generateAIProposal(cluster, events);

				const aiReasonings = proposals
					.slice(1)
					.map((p) => p.reasoning)
					.join('. ');

				const analysis =
					aiReasonings ||
					`Detected ${cluster.length - 1} event(s) overlapping. AI suggests priority-based rescheduling.`;

				return await storeConflict(userId, cluster, proposals, analysis);
			})
		);

		console.log(`Stored ${storedConflicts.length} conflicts`);

		return storedConflicts;
	} catch (error) {
		console.error('Error detecting conflicts:', error);
		throw error;
	}
}

/**
 * Apply conflict resolution
 */
export async function applyConflictResolution(conflictId, userId) {
	try {
		console.log(`Applying resolution for conflict ${conflictId}...`);

		// Get conflict with proposals
		const conflict = await prisma.conflict.findFirst({
			where: {
				errorId: conflictId,
				userId,
				status: 'PENDING'
			},
			include: {
				proposals: true
			}
		});

		if (!conflict) {
			throw new Error('Conflict not found or already resolved');
		}

		// Update all events
		await Promise.all(
			conflict.proposals.map((proposal) =>
				prisma.event.update({
					where: { id: proposal.eventId },
					data: {
						startTime: proposal.proposedStart,
						endTime: proposal.proposedEnd
					}
				})
			)
		);

		// Mark conflict as accepted
		await prisma.conflict.update({
			where: { id: conflict.id },
			data: {
				status: 'ACCEPTED',
				resolvedAt: new Date()
			}
		});

		console.log('Conflict resolved');

		return { success: true, updatedCount: conflict.proposals.length };
	} catch (error) {
		console.error('Error applying resolution:', error);
		throw error;
	}
}

/**
 * Decline conflict resolution
 */
export async function declineConflictResolution(conflictId, userId) {
	try {
		const conflict = await prisma.conflict.findFirst({
			where: {
				errorId: conflictId,
				userId,
				status: 'PENDING'
			}
		});

		if (!conflict) {
			throw new Error('Conflict not found');
		}

		await prisma.conflict.update({
			where: { id: conflict.id },
			data: {
				status: 'DECLINED',
				resolvedAt: new Date()
			}
		});

		console.log('Conflict declined');

		return { success: true };
	} catch (error) {
		console.error('Error declining conflict:', error);
		throw error;
	}
}
