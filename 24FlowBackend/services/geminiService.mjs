import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY
});

const colors = [
	// Original Palette
	{ bg: '#f7ff5c', text: '#000000', name: 'secondary-yellow' },
	{ bg: '#00f57a', text: '#000000', name: 'secondary-green' },
	{ bg: '#af52de', text: '#ffffff', name: 'secondary-purple' },
	{ bg: '#3d7bff', text: '#ffffff', name: 'primary-accent' },

	// Extended High-Contrast Vivids
	{ bg: '#ff5c5c', text: '#000000', name: 'neo-red' },
	{ bg: '#ff90e8', text: '#000000', name: 'neo-pink' },
	{ bg: '#05d9e8', text: '#000000', name: 'neo-cyan' },
	{ bg: '#ffbd12', text: '#000000', name: 'neo-orange' },

	// Deep Neutrals (For Heavy Borders & Shadows)
	{ bg: '#000000', text: '#ffffff', name: 'ink-black' },
	{ bg: '#ffffff', text: '#000000', name: 'stark-white' },
	{ bg: '#bebebe', text: '#000000', name: 'concrete-gray' },

	// Muted Accents (For secondary UI elements)
	{ bg: '#d6ff00', text: '#000000', name: 'acid-lime' },
	{ bg: '#8a2be2', text: '#ffffff', name: 'royal-purple' },
	{ bg: '#171717', text: '#00f57a', name: 'dark-mode-bg' }
];

// 3. SHUFFLE COLORS
const shuffle = (arr) => {
	const a = arr.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
};

const palette = shuffle(colors);

/**
 * Safe JSON parser that extracts JSON from markdown or raw text
 */
function safeJsonParse(text) {
	try {
		// Remove markdown code blocks
		let cleaned = text.trim();
		if (cleaned.startsWith('```json')) {
			cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?/g, '');
		} else if (cleaned.startsWith('```')) {
			cleaned = cleaned.replace(/```\n?/g, '');
		}

		// Find JSON object boundaries
		const start = cleaned.indexOf('{');
		const end = cleaned.lastIndexOf('}');

		if (start === -1 || end === -1) return null;

		const jsonStr = cleaned.slice(start, end + 1);
		return JSON.parse(jsonStr);
	} catch (err) {
		console.error('JSON parse error:', err);
		return null;
	}
}

/**
 * Calculate number of weeks until deadline
 */
function calculateWeeksUntilDeadline(deadline) {
	if (!deadline) return 4; // Default 4 weeks

	const now = new Date();
	const deadlineDate = new Date(deadline);
	const diffTime = Math.abs(deadlineDate - now);
	const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));

	// Clamp between 1 and 12 weeks
	return Math.min(Math.max(diffWeeks, 1), 12);
}

/**
 * Parse duration string to minutes
 */
function parseDurationToMinutes(duration) {
	if (!duration) return 60;
	const hMatch = duration.match(/(\d+)h/);
	const mMatch = duration.match(/(\d+)m/);
	const hours = hMatch ? parseInt(hMatch[1]) : 0;
	const minutes = mMatch ? parseInt(mMatch[1]) : 0;
	return hours * 60 + minutes;
}

/**
 * Convert minutes to time string HH:mm
 */
function minutesToTimeStr(totalMinutes) {
	const mins = totalMinutes % 1440; // Wrap at 24 hours
	const hh = Math.floor(mins / 60);
	const mm = mins % 60;
	return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function createSubjectColorMap(subjects) {
	const map = {};
	subjects.forEach((subject, index) => {
		map[subject.name] = colors[index % colors.length];
	});
	return map;
}

/**
 * Generate study plan with Gemini AI - MULTI-WEEK VERSION
 */
export const generateWithGemini = async (preferences) => {
	try {
		const { subjects, deadline, dailyHours, includeBreaks, spacedRepetition } = preferences;

		// Calculate how many weeks to generate
		const totalWeeks = calculateWeeksUntilDeadline(deadline);
		console.log(`[Gemini] Generating ${totalWeeks} weeks until deadline: ${deadline}`);

		// Calculate tasks per week based on daily hours
		const tasksPerWeek = Math.max(15, dailyHours * 5); // At least 15 tasks per week

		const subjectsList = subjects.map((s) => `"${s.name}"`).join(', ');
		const subjectsDetails = subjects
			.map((s) => `  - ${s.name} (${s.topics} topics, ${s.priority} priority)`)
			.join('\n');

		const prompt = `You are an expert AI study scheduler. Generate a COMPLETE ${totalWeeks}-week study plan with 24-hour intelligent scheduling.

**REQUIREMENTS:**
- Subjects: ${subjectsList}
- Total Weeks: ${totalWeeks} (week 0 to week ${totalWeeks - 1})
- Daily Study Hours: ${dailyHours} hours (NOT including breaks)
- Include Breaks: ${includeBreaks ? 'Yes (10-15min, NOT counted in study hours)' : 'No'}
- Spaced Repetition: ${spacedRepetition ? 'Yes' : 'No'}

**SUBJECTS:**
${subjectsDetails}

**CRITICAL RULES - FOLLOW EXACTLY:**

1. **COMPLETE COVERAGE - ABSOLUTE REQUIREMENT**: 
   - Generate tasks for EVERY SINGLE day of ALL ${totalWeeks} weeks
   - Week range: 0 to ${totalWeeks - 1} (ALL weeks must be included)
   - Day range: 0 (Monday) to 6 (Sunday) for EACH week
   - DO NOT skip ANY weeks or days - this is CRITICAL
   - Weeks 0 through ${totalWeeks - 1} must ALL have detailed, specific tasks
   - If you generate fewer than ${totalWeeks} weeks, the output is INVALID
   
2. **TASK QUALITY - NO GENERIC CONTENT**:
   - Every task MUST have a SPECIFIC, descriptive title
   - ✅ GOOD: "Anatomy: Gluteal Muscles - Maximus, Medius, Minimus"
   - ✅ GOOD: "Biochemistry: TCA Cycle - Entry and Reactions"
   - ❌ BAD: "Anatomy: Week 3 Study" 
   - ❌ BAD: "Continue studying biochemistry"
   - Include detailed descriptions explaining WHAT to study
   - Add clinical correlations where relevant for anatomy
   - Specify pathways/mechanisms for biochemistry
   
3. **QUANTITY**: Minimum ${tasksPerWeek * totalWeeks} total study tasks
   - Distribute evenly: ~${Math.ceil(tasksPerWeek / 7)} tasks per day
   - Every week should have similar task counts
   
4. **TIME ALLOCATION**:
   - Each day MUST have EXACTLY ${dailyHours} hours of STUDY time (excluding breaks)
   - Spread across 2-5 study blocks per day
   - Use full 24-hour range (00:00-23:59)
   - Peak hours (08:00-12:00, 15:00-17:00) for complex subjects
   - Evening (19:00-22:00) for review/creative subjects
   
5. **STUDY BLOCKS**:
   - Complex topics: 1h-2h blocks
   - Medium topics: 1h 30m-2h 30m blocks
   - Reviews: 45m-1h 30m blocks
   
6. **BREAKS** (if enabled):
   - 10-15 minutes BETWEEN study blocks
   - NOT counted toward ${dailyHours} hours
   - Example: 2h study + 15m break + 2h study = 4h study total
   
7. **WEEKENDS** (Saturday=day 5, Sunday=day 6):
   - Reduce to 60-70% of weekday study hours
   - Focus on review and practice

8. **PROGRESSION ACROSS ALL ${totalWeeks} WEEKS**:
   - Weeks 0-${Math.floor(totalWeeks / 3)}: Fundamentals and basic concepts
   - Weeks ${Math.floor(totalWeeks / 3)}-${Math.floor((2 * totalWeeks) / 3)}: Intermediate concepts and applications
   - Weeks ${Math.floor((2 * totalWeeks) / 3)}-${totalWeeks - 1}: Advanced topics, integration, and comprehensive review

**JSON FORMAT (return ONLY valid JSON, NO markdown):**

{
  "tasks": [
    {"week": 0, "day": 0, "time": "08:00", "title": "Anatomy: Specific Topic Name", "type": "Subject Name", "duration": "2h 00m", "description": "Detailed description of what to study", "color": "bg-primary", "subColor": "text-blue-200", "isBreak": false},
    {"week": 0, "day": 0, "time": "10:00", "title": "Break", "type": "Rest", "duration": "15m", "description": "", "color": "bg-[#232f48]", "subColor": "text-blue-200", "isBreak": true},
    ... (continue for ALL ${totalWeeks} weeks, ALL 7 days)
  ],
  "backlog": [
    {"title": "Extra: Specific Topic", "type": "Subject", "duration": "1h", "color": "bg-primary", "subColor": "text-blue-200"}
  ],
  "suggestions": [
    {"type": "OPTIMIZATION", "title": "...", "message": "...", "priority": "HIGH"}
  ],
  "weeklyGoals": [
    {"week": 0, "goal": "...", "focus": "..."}
  ]
}

**MANDATORY CHECKLIST BEFORE RESPONDING:**
☐ Generated tasks for week 0 through week ${totalWeeks - 1}? 
☐ Each week has all 7 days (0-6)?
☐ The Suggestions are present and relevant?
☐ Each weekday has ${dailyHours} hours of study (excluding breaks)?
☐ Tasks use times from 00:00-23:59 based on subject complexity?
☐ Total task count > ${tasksPerWeek * totalWeeks}?
☐ NO generic titles like "Week X Study"?
☐ ALL tasks have specific, detailed descriptions?

Generate NOW:`;

		console.log('[Gemini] Sending prompt for', totalWeeks, 'weeks with 24-hour scheduling...');

		const result = await ai.models.generateContent({
			model: 'gemini-3-flash-preview',
			contents: [{ role: 'user', parts: [{ text: prompt }] }],
			generationConfig: {
				temperature: 0.7,
				topK: 40,
				topP: 0.95,
				maxOutputTokens: 50000
			}
		});

		// Extract response text
		let responseText = '';
		try {
			if (typeof result === 'string') {
				responseText = result;
			} else if (result?.text) {
				responseText = result.text;
			} else if (typeof result?.response?.text === 'function') {
				responseText = await result.response.text();
			} else if (Array.isArray(result?.candidates) && result.candidates.length) {
				const candidate = result.candidates[0];
				const parts = candidate?.content?.parts;
				if (Array.isArray(parts)) {
					responseText = parts.map((p) => p.text || '').join('\n');
				}
			}
		} catch (ex) {
			console.error('[Gemini] Text extraction error:', ex);
		}

		console.log('[Gemini] Response length:', responseText.length);

		const parsed = safeJsonParse(responseText);

		if (!parsed || !parsed.tasks) {
			console.error('[Gemini] Failed to parse response');
			return getFallbackPlan(subjects, totalWeeks, dailyHours, includeBreaks);
		}

		const subjectColorMap = {};
		subjects.forEach((subject, index) => {
			// Pick a color from the palette, looping back to start if subjects > colors
			subjectColorMap[subject.name] = colors[index % colors.length];
		});

		// Validate and enrich tasks
		const enrichedTasks = (parsed.tasks || []).map((task, idx) => {
			// Ensure week is within range
			const week = Math.max(0, Math.min(task.week ?? 0, totalWeeks - 1));
			const randomColor = colors[Math.floor(Math.random() * colors.length)];

			const isBreak = task.isBreak || task.title.toLowerCase().includes('break');

			// Logic: If it's a break, use the dark neutral.
			// Otherwise, look up the color for the subject type.
			let taskColor;
			if (isBreak) {
				taskColor = { bg: '#171717', text: '#00f57a', name: 'dark-mode-bg' };
			} else {
				// Fallback to a random color if the AI returns a subject type not in your list
				taskColor = subjectColorMap[task.type] || colors[idx % colors.length];
			}

			return {
				id: `task-${Date.now()}-${idx}`,
				week,
				day: Math.max(0, Math.min(task.day ?? 0, 6)),
				time: task.time || '09:00',
				title: task.title || 'Study Session',
				type: task.type || subjects[0]?.name || 'Study',
				duration: task.duration || '1h',
				description: task.description || '',
				color: taskColor.bg,
				subColor: taskColor.text,
				icon: task.icon || null,
				isBreak: task.isBreak || false
			};
		});

		// POST-PROCESS: Validate daily study hours (excluding breaks)
		const targetDailyMinutes = Math.max(0, Number(preferences.dailyHours || dailyHours) * 60);

		// Group tasks by week+day
		const tasksByDay = new Map();
		for (const t of enrichedTasks) {
			const key = `${t.week}::${t.day}`;
			if (!tasksByDay.has(key)) tasksByDay.set(key, []);
			tasksByDay.get(key).push(t);
		}

		const movedToBacklog = [];

		for (const [key, dayTasks] of tasksByDay.entries()) {
			// Compute total STUDY minutes for this day (excluding breaks)
			let totalStudyMinutes = 0;
			for (const tk of dayTasks) {
				tk._durationMinutes = parseDurationToMinutes(tk.duration);
				if (!tk.isBreak) {
					totalStudyMinutes += tk._durationMinutes;
				}
			}

			// If AI overscheduled beyond dailyHours, move least-important tasks to backlog
			if (targetDailyMinutes > 0 && totalStudyMinutes > targetDailyMinutes) {
				console.log(
					`[Gemini] Day ${key} has ${totalStudyMinutes}min study time, target is ${targetDailyMinutes}min. Moving tasks to backlog...`
				);

				// Sort: keep breaks, move tasks with less priority
				dayTasks.sort((a, b) => {
					// Always keep breaks in schedule
					if (a.isBreak !== b.isBreak) return a.isBreak ? -1 : 1;
					// Keep tasks with descriptions
					if ((a.description ? 1 : 0) !== (b.description ? 1 : 0)) {
						return (b.description ? 1 : 0) - (a.description ? 1 : 0);
					}
					return 0;
				});

				// Remove study tasks (not breaks) until we hit target
				for (let i = dayTasks.length - 1; i >= 0 && totalStudyMinutes > targetDailyMinutes; i--) {
					const task = dayTasks[i];
					if (!task.isBreak) {
						dayTasks.splice(i, 1);
						totalStudyMinutes -= task._durationMinutes || 0;
						movedToBacklog.push({
							id: `moved-${task.id}`,
							title: task.title,
							type: task.type,
							duration: task.duration,
							color: task.color || '#3d7bff',
							subColor: task.subColor || '#ffffff'
						});
					}
				}
			}

			// Validate time spread across 24 hours
			const times = dayTasks
				.filter((t) => !t.isBreak) // Only check study tasks
				.map((d) => {
					const t = d.time || '09:00';
					const [hh, mm] = t.split(':').map(Number);
					return hh * 60 + (mm || 0);
				})
				.sort((a, b) => a - b);

			// If all tasks are clustered in small time window, spread them intelligently
			if (times.length > 1) {
				const span = times[times.length - 1] - times[0];
				if (span < 180) {
					// Less than 3 hours spread
					console.log(`[Gemini] Tasks on day ${key} are clustered. Spreading across day...`);

					// Intelligently spread based on dailyHours
					const studyTasks = dayTasks.filter((t) => !t.isBreak);
					const breaks = dayTasks.filter((t) => t.isBreak);

					let cursor = 8 * 60; // Start at 08:00
					const scheduledTasks = [];

					for (let i = 0; i < studyTasks.length; i++) {
						const task = studyTasks[i];
						task.time = minutesToTimeStr(cursor);
						scheduledTasks.push(task);
						cursor += task._durationMinutes;

						// Add break after study block if available and not last task
						if (breaks.length > 0 && i < studyTasks.length - 1) {
							const breakTask = breaks.shift();
							breakTask.time = minutesToTimeStr(cursor);
							scheduledTasks.push(breakTask);
							cursor += parseDurationToMinutes(breakTask.duration);
						}

						// Add gap before next session
						cursor += 30; // 30 min buffer

						// Wrap to next reasonable time if going too late
						if (cursor > 22 * 60 && i < studyTasks.length - 1) {
							cursor = 8 * 60; // Reset to morning
						}
					}

					// Update dayTasks with rescheduled tasks
					tasksByDay.set(key, [...scheduledTasks, ...breaks]);
				}
			}
		}

		// Rebuild enrichedTasks from tasksByDay
		const finalTasks = [];
		for (const dayTasks of tasksByDay.values()) {
			finalTasks.push(...dayTasks);
		}

		// ✅ ENHANCED VALIDATION: Check coverage and quality
		const weeksWithTasks = new Set(finalTasks.map((t) => t.week));
		console.log('[Gemini] Generated tasks for weeks:', Array.from(weeksWithTasks).sort());

		// Check for generic titles (indicator of poor AI generation)
		const genericTasks = finalTasks.filter(
			(task) =>
				!task.isBreak &&
				((task.title.includes('Week') && task.title.includes('Study')) ||
					task.title.includes('Continue') ||
					task.description.includes('Continue') ||
					!task.description ||
					task.description.length < 20)
		);

		if (genericTasks.length > finalTasks.length * 0.1) {
			console.warn(
				`[Gemini] WARNING: ${genericTasks.length} generic tasks detected (${Math.round((genericTasks.length / finalTasks.length) * 100)}% of total)`
			);
		}

		// Check if all days in each week are covered
		const daysByWeek = new Map();
		for (const task of finalTasks) {
			const key = task.week;
			if (!daysByWeek.has(key)) daysByWeek.set(key, new Set());
			daysByWeek.get(key).add(task.day);
		}

		// Log and fill missing days ONLY if AI truly missed them
		const missingDayTasks = [];
		for (let week = 0; week < totalWeeks; week++) {
			const days = daysByWeek.get(week) || new Set();
			const missingDays = [];
			for (let day = 0; day < 7; day++) {
				if (!days.has(day)) missingDays.push(day);
			}
			if (missingDays.length > 0) {
				console.log(
					`[Gemini] Week ${week} missing days ${missingDays.join(', ')} - AI failed to generate these`
				);
				// Fill missing days as last resort
				const filled = fillMissingDays(week, missingDays, subjects, dailyHours, includeBreaks);
				missingDayTasks.push(...filled);
			}
		}

		// Add filled tasks
		if (missingDayTasks.length > 0) {
			console.log(`[Gemini] Added ${missingDayTasks.length} fallback tasks to fill missing days`);
			finalTasks.push(...missingDayTasks);
		}

		// If entire weeks are missing, fill them as last resort
		if (weeksWithTasks.size < totalWeeks) {
			console.log('[Gemini] WARNING: Some weeks missing completely, using fallback generation...');
			const filledTasks = fillMissingWeeks(
				finalTasks,
				subjects,
				totalWeeks,
				dailyHours,
				includeBreaks
			);
			finalTasks.push(...filledTasks);
		}

		// Enrich backlog (include any moved items)
		const enrichedBacklog = [
			...(parsed.backlog || []).map((item, idx) => ({
				id: `backlog-${Date.now()}-${idx}`,
				title: item.title || 'Study Task',
				type: item.type || subjects[0]?.name || 'Study',
				duration: item.duration || '1h',
				color: item.isBreak ? '#171717' : subjectColorMap[item.type]?.bg || '#3d7bff',
				subColor: item.isBreak ? '#00f57a' : subjectColorMap[item.type]?.text || '#ffffff'
			})),
			...movedToBacklog
		];

		const weeklyGoals = parsed.weeklyGoals || generateWeeklyGoals(subjects, totalWeeks);

		console.log(`[Gemini] Final: ${finalTasks.length} tasks across ${totalWeeks} weeks`);
		console.log(
			`[Gemini] Moved ${movedToBacklog.length} tasks to backlog due to dailyHours constraints`
		);

		return {
			tasks: finalTasks,
			backlog: enrichedBacklog,
			suggestions: parsed.suggestions || [
				{
					type: 'OPTIMIZATION',
					title: 'Intelligent Scheduling',
					message: `Tasks scheduled across 24 hours based on cognitive demands. Complex subjects during peak hours (8-12am, 3-5pm).`,
					priority: 'MEDIUM'
				}
			],
			tips: parsed.tips || [],
			weeklyGoals
		};
	} catch (err) {
		console.error('[Gemini] Generation error:', err);
		const weeks = calculateWeeksUntilDeadline(preferences.deadline);
		return getFallbackPlan(
			preferences.subjects,
			weeks,
			preferences.dailyHours,
			preferences.includeBreaks
		);
	}
};

/**
 * Fill specific missing days within a week
 */
function fillMissingDays(week, missingDays, subjects, dailyHours, includeBreaks) {
	const filledTasks = [];

	// Calculate sessions per day
	const sessionsPerDay = Math.ceil(dailyHours / 2);
	const studyBlockMinutes = Math.floor((dailyHours * 60) / sessionsPerDay);

	// Create a local color map for subjects
	const localColorMap = {};
	subjects.forEach((subject, index) => {
		localColorMap[subject.name] = colors[index % colors.length];
	});

	for (const day of missingDays) {
		const isWeekend = day === 5 || day === 6;
		const adjustedSessions = isWeekend ? Math.ceil(sessionsPerDay * 0.6) : sessionsPerDay;

		// Rotate through subjects
		for (let session = 0; session < adjustedSessions; session++) {
			const subjectIndex = (week * 7 + day + session) % subjects.length;
			const subject = subjects[subjectIndex];
			const subjectColor = localColorMap[subject.name] || colors[0];

			// Intelligent time based on session
			let baseHour = 8;
			if (session === 1) baseHour = 11;
			if (session === 2) baseHour = 14;
			if (session === 3) baseHour = 16;
			if (session === 4) baseHour = 19;

			const time = minutesToTimeStr(baseHour * 60);
			const durationStr = `${Math.floor(studyBlockMinutes / 60)}h ${studyBlockMinutes % 60}m`;

			filledTasks.push({
				id: `filled-day-${week}-${day}-${session}`,
				week,
				day,
				time,
				title: `${subject.name}: Week ${week + 1} Study`,
				type: subject.name,
				duration: durationStr,
				description: `Continuing ${subject.name} studies`,
				color: subjectColor.bg,
				subColor: subjectColor.text,
				isBreak: false
			});

			// Add break
			if (includeBreaks && session < adjustedSessions - 1) {
				const breakColor = colors.find((c) => c.name === 'dark-mode-bg') || {
					bg: '#171717',
					text: '#00f57a'
				};
				filledTasks.push({
					id: `filled-day-break-${week}-${day}-${session}`,
					week,
					day,
					time: minutesToTimeStr(baseHour * 60 + studyBlockMinutes),
					title: 'Break',
					type: 'Rest',
					duration: '15m',
					description: '',
					color: breakColor.bg,
					subColor: breakColor.text,
					isBreak: true
				});
			}
		}
	}

	return filledTasks;
}

/**
 * Fill missing weeks with continuation tasks
 */
function fillMissingWeeks(existingTasks, subjects, totalWeeks, dailyHours, includeBreaks) {
	const weeksWithTasks = new Set(existingTasks.map((t) => t.week));
	const filledTasks = [];

	// Create a local color map for subjects
	const localColorMap = {};
	subjects.forEach((subject, index) => {
		localColorMap[subject.name] = colors[index % colors.length];
	});

	const breakColor = colors.find((c) => c.name === 'dark-mode-bg') || {
		bg: '#171717',
		text: '#00f57a'
	};

	for (let week = 0; week < totalWeeks; week++) {
		if (!weeksWithTasks.has(week)) {
			console.log(`[Gemini] Filling week ${week} with intelligent scheduling for ALL 7 days`);

			// Calculate how many sessions needed per day based on dailyHours
			const sessionsPerDay = Math.ceil(dailyHours / 2); // 2-hour blocks
			const studyBlockDuration = Math.floor((dailyHours * 60) / sessionsPerDay);

			// Generate tasks for ALL 7 days of the week
			for (let day = 0; day < 7; day++) {
				// Weekend adjustment: reduce study hours to 50-70% of weekday hours
				const isWeekend = day === 5 || day === 6; // Saturday or Sunday
				const adjustedSessions = isWeekend ? Math.ceil(sessionsPerDay * 0.6) : sessionsPerDay;

				subjects.forEach((subject, subIdx) => {
					// Only add subject if it fits in the day's session count
					if (subIdx >= adjustedSessions) return;

					const subjectColor = localColorMap[subject.name] || colors[0];

					// Intelligent time selection based on subject
					let startTime = '09:00';
					if (subject.name.match(/math|physics|programming|calculus|algebra/i)) {
						startTime = '08:00'; // Morning for complex subjects
					} else if (subject.name.match(/literature|history|art|creative/i)) {
						startTime = '19:00'; // Evening for creative subjects
					} else {
						startTime = '14:00'; // Afternoon for others
					}

					const durationStr = `${Math.floor(studyBlockDuration / 60)}h ${studyBlockDuration % 60}m`;

					filledTasks.push({
						id: `filled-${week}-${day}-${subIdx}`,
						week,
						day,
						time: startTime,
						title: `${subject.name}: Week ${week + 1} ${isWeekend ? 'Weekend' : ''} Study Session`,
						type: subject.name,
						duration: durationStr,
						description: `Continue studying ${subject.name} concepts`,
						color: subjectColor.bg,
						subColor: subjectColor.text,
						isBreak: false
					});

					// Add break if enabled
					if (includeBreaks) {
						const [hh, mm] = startTime.split(':').map(Number);
						const breakTime = minutesToTimeStr(hh * 60 + mm + studyBlockDuration);

						filledTasks.push({
							id: `filled-break-${week}-${day}-${subIdx}`,
							week,
							day,
							time: breakTime,
							title: 'Break',
							type: 'Rest',
							duration: '15m',
							description: '',
							color: breakColor.bg,
							subColor: breakColor.text,
							isBreak: true
						});
					}
				});
			}
		}
	}

	return filledTasks;
}

/**
 * Generate weekly goals if AI didn't provide them
 */
function generateWeeklyGoals(subjects, totalWeeks) {
	const goals = [];

	for (let week = 0; week < totalWeeks; week++) {
		let goal, focus;

		if (week === 0) {
			goal = 'Establish foundations';
			focus = 'Core concepts and definitions';
		} else if (week < totalWeeks / 2) {
			goal = 'Deepen understanding';
			focus = 'Intermediate topics and practice';
		} else if (week < totalWeeks - 1) {
			goal = 'Advanced applications';
			focus = 'Complex problems and integration';
		} else {
			goal = 'Final review and exam prep';
			focus = 'Mock tests and weak point reinforcement';
		}

		goals.push({ week, goal, focus });
	}

	return goals;
}

/**
 * Fallback plan if AI fails - generates multiple weeks with 24-hour scheduling
 */
function getFallbackPlan(subjects, totalWeeks, dailyHours, includeBreaks) {
	const tasks = [];
	const subjectNames = subjects.map((s) => s.name);

	console.log(
		`[Gemini] Using fallback plan for ${totalWeeks} weeks with ${dailyHours}h daily study`
	);

	// Create a local color map for subjects
	const localColorMap = {};
	subjects.forEach((subject, index) => {
		localColorMap[subject.name] = colors[index % colors.length];
	});

	const breakColor = colors.find((c) => c.name === 'dark-mode-bg') || {
		bg: '#171717',
		text: '#00f57a'
	};

	// Calculate session distribution
	const sessionsPerDay = Math.ceil(dailyHours / 2); // 2-hour blocks
	const studyBlockMinutes = Math.floor((dailyHours * 60) / sessionsPerDay);

	// Generate tasks for each week
	for (let week = 0; week < totalWeeks; week++) {
		// Generate 5 days per week (weekdays)
		for (let day = 0; day < 5; day++) {
			const subjectIndex = (week * 5 + day) % subjectNames.length;
			const subject = subjectNames[subjectIndex];
			const subjectColor = localColorMap[subject] || colors[0];

			// Create study sessions spread throughout the day
			for (let session = 0; session < sessionsPerDay; session++) {
				// Intelligent time selection
				let baseTime = 8; // 8am start
				if (session === 1) baseTime = 14; // 2pm
				if (session === 2) baseTime = 19; // 7pm

				const startMinutes = baseTime * 60 + session * 30;
				const timeStr = minutesToTimeStr(startMinutes);
				const durationStr = `${Math.floor(studyBlockMinutes / 60)}h ${studyBlockMinutes % 60}m`;

				tasks.push({
					id: `fallback-${week}-${day}-${session}`,
					week,
					day,
					time: timeStr,
					title: `${subject}: Week ${week + 1} Session ${session + 1}`,
					type: subject,
					duration: durationStr,
					description: `Study ${subject} concepts for week ${week + 1}`,
					color: subjectColor.bg,
					subColor: subjectColor.text,
					isBreak: false
				});

				// Add break after study block if not last session
				if (includeBreaks && session < sessionsPerDay - 1) {
					const breakTime = minutesToTimeStr(startMinutes + studyBlockMinutes);

					tasks.push({
						id: `fallback-break-${week}-${day}-${session}`,
						week,
						day,
						time: breakTime,
						title: 'Break',
						type: 'Rest',
						duration: '15m',
						description: '',
						color: breakColor.bg,
						subColor: breakColor.text,
						isBreak: true
					});
				}
			}
		}
	}

	return {
		tasks,
		backlog: [],
		suggestions: [
			{
				type: 'WARNING',
				title: 'AI Generation Failed',
				message:
					'Using fallback schedule with 24-hour intelligent scheduling. Try regenerating for better results.',
				priority: 'HIGH'
			}
		],
		tips: ['AI connection failed. Check your API key.'],
		weeklyGoals: generateWeeklyGoals(subjects, totalWeeks)
	};
}
