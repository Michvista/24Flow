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
 * Check if two events overlap
 */
function eventsOverlap(event1, event2) {
	return event1.startTime < event2.endTime && event1.endTime > event2.startTime;
}

/**
 * Find all overlapping events in a user's schedule
 */
function findOverlaps(events) {
	const conflicts = [];
	const processed = new Set();

	for (let i = 0; i < events.length; i++) {
		for (let j = i + 1; j < events.length; j++) {
			if (eventsOverlap(events[i], events[j])) {
				const conflictKey = [events[i].id, events[j].id].sort().join('-');

				if (!processed.has(conflictKey)) {
					processed.add(conflictKey);
					conflicts.push({
						events: [events[i], events[j]],
						type: 'pair'
					});
				}
			}
		}
	}

	// Merge related conflicts into clusters
	const merged = [];
	const used = new Set();

	conflicts.forEach((conflict) => {
		if (used.has(conflict)) return;

		const cluster = [...conflict.events];
		const clusterIds = new Set(cluster.map((e) => e.id));

		// Find other conflicts that share events
		conflicts.forEach((otherConflict) => {
			if (otherConflict === conflict) return;

			const hasShared = otherConflict.events.some((e) => clusterIds.has(e.id));
			if (hasShared) {
				otherConflict.events.forEach((e) => {
					if (!clusterIds.has(e.id)) {
						cluster.push(e);
						clusterIds.add(e.id);
					}
				});
				used.add(otherConflict);
			}
		});

		merged.push(cluster);
		used.add(conflict);
	});

	return merged;
}

/**
 * Use Gemini AI to generate smart rescheduling proposal
 */
async function generateAIProposal(overlappingEvents, allUserEvents) {
	try {
		// Sort by start time
		const sorted = [...overlappingEvents].sort(
			(a, b) => a.startTime.getTime() - b.startTime.getTime()
		);

		// Prepare context for AI
		const conflictingEventsInfo = sorted.map((e) => ({
			id: e.id,
			title: e.title,
			description: e.desc || '',
			startTime: e.startTime.toISOString(),
			endTime: e.endTime.toISOString(),
			duration: Math.round((e.endTime - e.startTime) / (1000 * 60)) // minutes
		}));

		// Get other events on the same day for context
		const dayStart = new Date(sorted[0].startTime);
		dayStart.setHours(0, 0, 0, 0);
		const dayEnd = new Date(dayStart);
		dayEnd.setHours(23, 59, 59, 999);

		const otherEvents = allUserEvents
			.filter((e) => {
				const eventDate = new Date(e.startTime);
				return eventDate >= dayStart && eventDate <= dayEnd && !sorted.some((s) => s.id === e.id);
			})
			.map((e) => ({
				title: e.title,
				startTime: e.startTime.toISOString(),
				endTime: e.endTime.toISOString()
			}));

		// Construct AI prompt
		const prompt = `You are a smart scheduling assistant. Analyze this schedule conflict and suggest optimal rescheduling.

CONFLICTING EVENTS:
${JSON.stringify(conflictingEventsInfo, null, 2)}

OTHER EVENTS ON THIS DAY:
${JSON.stringify(otherEvents, null, 2)}

INSTRUCTIONS:
1. Keep the first event (${sorted[0].title}) at its current time: ${sorted[0].startTime.toISOString()}
2. Reschedule the other ${sorted.length - 1} event(s) to available time slots
3. Consider:
   - Event priority and type (meetings vs personal tasks)
   - Optimal time of day for each activity
   - Add 10-20 minute buffer between events
   - Avoid scheduling during typical lunch hours (12:00-13:00)
   - Prefer keeping events on the same day if possible
   - Consider work hours (9:00-18:00 for work events)

RESPOND WITH ONLY A JSON ARRAY in this exact format (no markdown, no backticks):
[
  {
    "id": <event_id>,
    "title": "<event_title>",
    "startTime": "<ISO_timestamp>",
    "endTime": "<ISO_timestamp>",
    "reasoning": "<brief explanation>"
  }
]

Important: Include ALL ${sorted.length} events in your response, even the one that stays in place.`;

		const response = await ai.models.generateContent({
			model: 'gemini-3-flash-preview',
			contents: prompt
		});

		const aiText = response.text ?? response?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

		if (!aiText) {
			throw new Error('Empty AI response');
		}

		// Clean the response - remove markdown code blocks if present
		let jsonText = aiText.trim();
		jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '');

		const aiProposals = JSON.parse(jsonText);

		// Validate proposals
		const validatedProposals = aiProposals.map((proposal) => ({
			id: proposal.id,
			title: proposal.title,
			startTime: proposal.startTime,
			endTime: proposal.endTime,
			reasoning: proposal.reasoning || 'AI-optimized scheduling'
		}));

		return validatedProposals;
	} catch (error) {
		console.error('AI proposal generation failed, falling back to simple scheduling:', error);

		// Fallback to simple sequential scheduling
		const sorted = [...overlappingEvents].sort(
			(a, b) => a.startTime.getTime() - b.startTime.getTime()
		);

		const proposals = [];
		let currentEndTime = sorted[0].endTime;

		proposals.push({
			id: sorted[0].id,
			title: sorted[0].title,
			startTime: sorted[0].startTime.toISOString(),
			endTime: sorted[0].endTime.toISOString(),
			reasoning: 'Kept in original time slot'
		});

		for (let i = 1; i < sorted.length; i++) {
			const event = sorted[i];
			const duration = event.endTime.getTime() - event.startTime.getTime();

			const bufferMinutes = 15;
			const bufferMs = bufferMinutes * 60 * 1000;

			const newStart = new Date(currentEndTime.getTime() + bufferMs);
			const newEnd = new Date(newStart.getTime() + duration);

			proposals.push({
				id: event.id,
				title: event.title,
				startTime: newStart.toISOString(),
				endTime: newEnd.toISOString(),
				reasoning: `Rescheduled with ${bufferMinutes} min buffer`
			});

			currentEndTime = newEnd;
		}

		return proposals;
	}
}

/**
 * Generate a conflict ID
 */
function generateErrorId() {
	const number = Math.floor(1000 + Math.random() * 9000);
	return `#ERR-${number}`;
}

/**
 * Main function to get overlap fixes for a user
 */
export async function getOverlapFixes(userId) {
	try {
		const events = await prisma.event.findMany({
			where: {
				userId
			},
			orderBy: {
				startTime: 'asc'
			}
		});

		if (events.length === 0) {
			return [];
		}

		// Find overlapping event clusters
		const overlapClusters = findOverlaps(events);

		if (overlapClusters.length === 0) {
			return [];
		}

		console.log('Found overlap clusters:', overlapClusters.length);

		// Generate AI-powered conflict resolutions
		const conflicts = await Promise.all(
			overlapClusters.map(async (cluster) => {
				// Sort cluster by start time
				const sortedCluster = [...cluster].sort(
					(a, b) => a.startTime.getTime() - b.startTime.getTime()
				);

				// Find the earliest time in the cluster to use as reference (for relative positioning)
				const earliestHHMM = Math.min(...sortedCluster.map((e) => dateToHHMM(e.startTime)));
				const earliestMinutes = hhmmToMinutes(earliestHHMM);

				// Convert events to the format expected by frontend
				const tasks = sortedCluster.map((event, idx) => {
					const startHHMM = dateToHHMM(event.startTime);
					const endHHMM = dateToHHMM(event.endTime);

					return {
						id: event.id,
						title: event.title,

						// RELATIVE minutes from earliest event (for vertical positioning)
						start: hhmmToMinutes(startHHMM) - earliestMinutes,
						end: hhmmToMinutes(endHHMM) - earliestMinutes,

						// ABSOLUTE time in HHMM format (for display)
						displayStart: startHHMM,
						displayEnd: endHHMM,

						type: idx === 0 ? 'static' : 'conflict'
					};
				});

				// Generate AI-powered proposals
				const rawProposals = await generateAIProposal(sortedCluster, events);

				// Convert proposals into UI-friendly format
				const proposals = rawProposals.map((p) => {
					const proposalStart = new Date(p.startTime);
					const proposalEnd = new Date(p.endTime);
					const startHHMM = dateToHHMM(proposalStart);
					const endHHMM = dateToHHMM(proposalEnd);

					return {
						id: p.id,
						title: p.title,

						// RELATIVE minutes from earliest event (for vertical positioning)
						start: hhmmToMinutes(startHHMM) - earliestMinutes,
						end: hhmmToMinutes(endHHMM) - earliestMinutes,

						// ABSOLUTE time in HHMM format (for display)
						displayStart: startHHMM,
						displayEnd: endHHMM,

						// Keep ISO timestamps for database update
						isoStart: p.startTime,
						isoEnd: p.endTime,

						type: p.id === sortedCluster[0].id ? 'static' : 'conflict',
						reasoning: p.reasoning
					};
				});

				// Create analysis message using AI reasoning
				const aiReasonings = proposals
					.filter((p) => p.id !== sortedCluster[0].id) // Skip first event
					.map((p) => p.reasoning)
					.join('. ');

				const overlapCount = sortedCluster.length - 1;
				const analysis =
					proposals.length > 1 && proposals[1].reasoning
						? `${aiReasonings}`
						: `Detected ${overlapCount} event${overlapCount > 1 ? 's' : ''} overlapping with '${sortedCluster[0].title}'. Suggesting optimal rescheduling.`;

				return {
					id: generateErrorId(),
					summary: `${sortedCluster.length} Tasks Collision`,
					tasks,
					proposals,
					analysis
				};
			})
		);

		console.log('Generated conflicts:', conflicts.length);

		return conflicts;
	} catch (error) {
		console.error('Error in getOverlapFixes:', error);
		throw error;
	}
}

/**
 * Apply the fix by updating events in the database
 */
export async function applyOverlapFix(proposals) {
	try {
		const updates = await Promise.all(
			proposals.map((proposal) => {
				// Use the ISO timestamps we stored in the proposal
				const startTime = proposal.isoStart
					? new Date(proposal.isoStart)
					: new Date(proposal.startTime);
				const endTime = proposal.isoEnd ? new Date(proposal.isoEnd) : new Date(proposal.endTime);

				return prisma.event.update({
					where: { id: proposal.id },
					data: {
						startTime,
						endTime
					}
				});
			})
		);

		return {
			success: true,
			updatedEvents: updates
		};
	} catch (error) {
		console.error('Error applying overlap fix:', error);
		throw error;
	}
}
