// import { GoogleGenAI } from '@google/genai';
// import prisma from '../db.mjs';

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // 1st step:loop through all the evets of the user and find events that intersect

// export const getOverlapFixes = async (userId) => {
//     //  Get all events for the range
//     const events = await prisma.event.findMany({
//         where: { userId },
//         orderBy: { startTime: "asc" },
//     });

//     // Identify the overlapping clusters
//     const clusters = [];
//     let currentCluster = [];

//     for (let i = 0; i < events.length - 1; i++) {
//         const a = events[i];
//         const b = events[i + 1];

//         if (a.endTime > b.startTime) {
//             if (!currentCluster.includes(a)) currentCluster.push(a);
//             if (!currentCluster.includes(b)) currentCluster.push(b);
//         } else if (currentCluster.length > 0) {
//             clusters.push([...currentCluster]);
//             currentCluster = [];
//         }
//     }
//     if (currentCluster.length > 0) clusters.push(currentCluster);

//     if (clusters.length === 0) return { message: "No overlaps found", conflicts: [] };

//     // Ask Gemini to resolve each cluster
//     const resolvedConflicts = await Promise.all(clusters.map(async (cluster) => {
//         const prompt = `
//             Identify and resolve the schedule conflict between these events:
//             ${JSON.stringify(cluster.map(e => ({ id: e.id, title: e.title, start: e.startTime, end: e.endTime })))}

//             RULES:
//             1. Move events to the EARLIEST possible free time after their original start.
//             2. Maintain the original duration of each event.
//             3. Return a JSON object with:
//                - "id": a unique error string (e.g. #ERR-1234)
//                - "summary": e.g. "Collision between 2 tasks"
//                - "analysis": e.g. "Move Task B to 3:00 PM"
//                - "tasks": Array of original events with 'type' (static or conflict)
//                - "proposals": Array of same events but with corrected startTime/endTime.
//         `;

//         const response = await ai.models.generateContent({
//             model: "gemini-3-flash-preview",
//             contents: prompt,
//         });

//         const jsonMatch = response.text.match(/\{.*\}/s);
//         return JSON.parse(jsonMatch[0]);
//     }));

//     return resolvedConflicts;
// };

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
   - Event priority and type (meetings or interviews or urgent things vs personal tasks) [if the priority is important e.g meeting vs personal task, put the meeting before the personal task]
   - Optimal time of day for each activity
   - Add 10-20 minute buffer between events
   - Avoid scheduling during typical lunch hours (12:00-13:00)
   - Prefer keeping events on the same day if possible
   - Consider work hours (9:00-18:00 for work events)

RESPOND WITH ONLY A JSON ARRAY in this exact format (NO markdown, NO backticks, NO explanation):
[
  {
    "id": "${sorted[0].id}",
    "title": "${sorted[0].title}",
    "startTime": "${sorted[0].startTime.toISOString()}", 
    "endTime": "${sorted[0].endTime.toISOString()}",
    "reasoning": "Kept in original time slot"
  }
]

CRITICAL: 
- Start and end times MUST be valid ISO 8601 date-time strings (YYYY-MM-DDTHH:mm:ss.sssZ)
- Include ALL ${sorted.length} events in your response
- Return ONLY the JSON array, nothing else`;

		console.log('🤖 Calling Gemini API...');

		const response = await ai.models.generateContent({
			model: 'gemini-3-flash-preview',
			contents: prompt,
			generationConfig: {
				temperature: 0.7,
				maxOutputTokens: 2048
			}
		});

		console.log('📥 Raw Gemini response:', JSON.stringify(response, null, 2));

		// Try multiple ways to extract the text
		let aiText = null;

		if (response.text) {
			aiText = response.text;
		} else if (response.response?.text) {
			aiText = response.response.text();
		} else if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
			aiText = response.candidates[0].content.parts[0].text;
		}

		if (!aiText || aiText.trim() === '') {
			console.error('❌ Empty AI response. Full response object:', response);
			throw new Error('Empty AI response - check API key and quota');
		}

		console.log('📝 Extracted AI text:', aiText);

		// Clean the response - remove markdown code blocks if present
		let jsonText = aiText.trim();
		jsonText = jsonText.replace(/```json\s*/gi, '').replace(/```\s*/g, '');

		// Remove any leading/trailing text that isn't part of the JSON
		const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
		if (jsonMatch) {
			jsonText = jsonMatch[0];
		}

		console.log('🔧 Cleaned JSON text:', jsonText);

		const aiProposals = JSON.parse(jsonText);

		if (!Array.isArray(aiProposals) || aiProposals.length === 0) {
			throw new Error('AI returned invalid proposals array');
		}

		// Validate proposals
		const validatedProposals = aiProposals.map((proposal) => {
			if (!proposal.id || !proposal.startTime || !proposal.endTime) {
				throw new Error(`Invalid proposal structure: ${JSON.stringify(proposal)}`);
			}

			// Validate ISO date strings
			const start = new Date(proposal.startTime);
			const end = new Date(proposal.endTime);

			if (isNaN(start.getTime()) || isNaN(end.getTime())) {
				throw new Error(`Invalid date in proposal: ${proposal.startTime} or ${proposal.endTime}`);
			}

			return {
				id: proposal.id,
				title: proposal.title,
				startTime: proposal.startTime,
				endTime: proposal.endTime,
				reasoning: proposal.reasoning || 'AI-optimized scheduling'
			};
		});

		console.log('✅ AI proposals validated:', validatedProposals.length);

		return validatedProposals;
	} catch (error) {
		console.error('⚠️ AI proposal generation failed:', error);
		console.error('Error details:', {
			name: error.name,
			message: error.message,
			stack: error.stack
		});

		// Fallback to simple sequential scheduling
		console.log('🔄 Using fallback sequential scheduling...');

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
				reasoning: `Rescheduled with ${bufferMinutes} min buffer (fallback)`
			});

			currentEndTime = newEnd;
		}

		console.log('✅ Fallback proposals generated:', proposals.length);

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

function getOverlapClusters(events) {
	if (!events.length) return [];

	// sort by start time
	events.sort((a, b) => a.startTime - b.startTime);

	const clusters = [];
	let currentCluster = [events[0]];

	let clusterEnd = events[0].endTime;

	for (let i = 1; i < events.length; i++) {
		const e = events[i];

		// overlap with current cluster
		if (e.startTime < clusterEnd) {
			currentCluster.push(e);
			clusterEnd = Math.max(clusterEnd, e.endTime);
		} else {
			// close current cluster
			if (currentCluster.length > 1) clusters.push(currentCluster);

			// start new cluster
			currentCluster = [e];
			clusterEnd = e.endTime;
		}
	}

	// push last cluster
	if (currentCluster.length > 1) clusters.push(currentCluster);

	return clusters;
}


/**
 * Main function to get overlap fixes for a user
 */
export async function getOverlapFixes(userId) {
	try {
		console.log(`🔍 Fetching events for user ${userId}...`);

		const events = await prisma.event.findMany({
			where: {
				userId
			},
			orderBy: {
				startTime: 'asc'
			}
		});

		console.log(`📅 Found ${events.length} events`);

		if (events.length === 0) {
			return [];
		}

		// Find overlapping event clusters
		const overlapClusters = getOverlapClusters(events);


		console.log(`⚠️ Found ${overlapClusters.length} overlap clusters`);

		if (overlapClusters.length === 0) {
			return [];
		}

		// Generate AI-powered conflict resolutions
		const conflicts = await Promise.all(
			overlapClusters.map(async (cluster, clusterIdx) => {
				console.log(`\n🔧 Processing cluster ${clusterIdx + 1}/${overlapClusters.length}...`);

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

					// Validate dates
					if (isNaN(proposalStart.getTime()) || isNaN(proposalEnd.getTime())) {
						console.error(`❌ Invalid date for ${p.title}: ${p.startTime} - ${p.endTime}`);
						throw new Error(`AI returned invalid date for "${p.title}"`);
					}

					const startHHMM = dateToHHMM(proposalStart);
					const endHHMM = dateToHHMM(proposalEnd);

					return {
						id: p.id,
						title: p.title,
						start: hhmmToMinutes(startHHMM) - earliestMinutes,
						end: hhmmToMinutes(endHHMM) - earliestMinutes,
						displayStart: startHHMM,
						displayEnd: endHHMM,
						// Store ISO strings for database update
						isoStart: p.startTime,
						isoEnd: p.endTime,
						type: p.id === sortedCluster[0].id ? 'static' : 'conflict',
						reasoning: p.reasoning
					};
				});

				// Create analysis message using AI reasoning
				const aiReasonings = proposals
					.filter((p) => p.id !== sortedCluster[0].id)
					.map((p) => p.reasoning)
					.join('. ');

				const overlapCount = sortedCluster.length - 1;
				const analysis =
					proposals.length > 1 && proposals[1].reasoning
						? aiReasonings
						: `Detected ${overlapCount} event${overlapCount > 1 ? 's' : ''} overlapping with '${sortedCluster[0].title}'. Suggesting optimal rescheduling.`;

				console.log(`✅ Cluster ${clusterIdx + 1} processed`);

				return {
					id: generateErrorId(),
					summary: `${sortedCluster.length} Tasks Collision`,
					tasks,
					proposals,
					analysis
				};
			})
		);

		console.log(`\n🎉 Generated ${conflicts.length} conflict resolutions`);

		return conflicts;
	} catch (error) {
		console.error('💥 Error in getOverlapFixes:', error);
		throw error;
	}
}

/**
 * Apply the fix by updating events in the database
 */
export async function applyOverlapFix(proposals) {
	try {
		console.log(`💾 Applying fixes for ${proposals.length} events...`);

		const updates = await Promise.all(
			proposals.map((proposal) => {
				// Use isoStart/isoEnd if available, fallback to startTime/endTime
				const startStr = proposal.isoStart || proposal.startTime;
				const endStr = proposal.isoEnd || proposal.endTime;

				const startTime = new Date(startStr);
				const endTime = new Date(endStr);

				// Validate dates
				if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
					console.error('❌ Invalid date string received:', { startStr, endStr, proposal });
					throw new Error(
						`Invalid date format for "${proposal.title}": start=${startStr}, end=${endStr}`
					);
				}

				console.log(
					`  ✏️ Updating ${proposal.title}: ${startTime.toISOString()} - ${endTime.toISOString()}`
				);

				return prisma.event.update({
					where: { id: proposal.id },
					data: {
						startTime,
						endTime
					}
				});
			})
		);

		console.log('✅ All events updated successfully');

		return { success: true, updatedEvents: updates };
	} catch (error) {
		console.error('💥 Error applying overlap fix:', error);
		throw error;
	}
}
