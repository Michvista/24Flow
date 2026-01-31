// ============================================================================
// FIXED GEMINI SERVICE - Outputs Flat Array for Calendar
// ============================================================================
// File: src/lib/services/geminiService.mjs

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY
});

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
 * Generate study plan with Gemini AI
 * Returns a FLAT structure that matches your calendar component expectations
 */
export const generateWithGemini = async (preferences) => {
	try {
		const { subjects, deadline, dailyHours, includeBreaks, spacedRepetition } = preferences;

		const prompt = `You are an expert study schedule AI. Create a detailed weekly study plan.

**INPUT:**
- Deadline: ${deadline || '1 month from now'}
- Subjects: ${JSON.stringify(subjects)}
- Daily Hours: ${dailyHours} hours
- Include Breaks: ${includeBreaks ? 'Yes' : 'No'}
- Spaced Repetition: ${spacedRepetition ? 'Yes' : 'No'}

**CRITICAL INSTRUCTIONS:**
1. Create a "tasks" array with 20-30 study blocks for the FIRST WEEK
2. Each task MUST have: time, title, type, duration, description
3. Distribute tasks across Monday (day=0) to Sunday (day=6)
4. Start times between 08:00 and 20:00
5. Each task 1-2 hours max
6. Add 15-min breaks if includeBreaks is true
7. Task titles MUST be specific: "Linear Algebra: Eigenvalues" NOT "Study Math"
8. Task type MUST match one of the subject names EXACTLY

**OUTPUT FORMAT (RETURN ONLY THIS JSON):**
{
  "tasks": [
    {
      "week": 0,
      "day": 0,
      "time": "09:00",
      "title": "Linear Algebra: Matrix Multiplication",
      "type": "Linear Algebra",
      "duration": "1h 30m",
      "description": "Practice matrix operations and properties",
      "color": "bg-primary",
      "subColor": "text-blue-200",
      "isBreak": false
    },
    {
      "week": 0,
      "day": 0,
      "time": "11:00",
      "title": "Morning Break",
      "type": "Rest",
      "duration": "15m",
      "color": "bg-[#232f48]",
      "isBreak": true
    }
  ],
  "backlog": [
    {
      "title": "Linear Algebra: Practice Quiz",
      "type": "Linear Algebra",
      "duration": "45m",
      "color": "bg-primary"
    }
  ],
  "suggestions": [
    {
      "type": "OPTIMIZATION",
      "title": "Peak Study Hours",
      "message": "Schedule high-priority subjects during 9-11 AM",
      "priority": "HIGH"
    }
  ]
}

IMPORTANT:
- "week" is always 0 for current week
- "day" is 0-6 (0=Monday, 6=Sunday)
- "time" format: "HH:mm" (24-hour)
- Include 20-30 tasks minimum
- NO markdown, NO code blocks, ONLY JSON`;

		console.log('[Gemini] Sending prompt...');

		const result = await ai.models.generateContent({
			model: 'gemini-3-flash-preview',
			contents: [{ role: 'user', parts: [{ text: prompt }] }]
		});

		// Extract response text (handles different SDK versions)
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
			} else {
				responseText = JSON.stringify(result || '');
			}
		} catch (ex) {
			console.error('[Gemini] Text extraction error:', ex);
			responseText = '';
		}

		console.log('[Gemini] Raw response length:', responseText.length);
		console.log('[Gemini] First 500 chars:', responseText.slice(0, 500));

		const parsed = safeJsonParse(responseText);

		if (!parsed || !parsed.tasks) {
			console.error('[Gemini] Failed to parse response');
			return getFallbackPlan(subjects);
		}

		// Ensure all tasks have required fields and proper IDs
		const enrichedTasks = (parsed.tasks || []).map((task, idx) => ({
			id: `task-${Date.now()}-${idx}`,
			week: task.week ?? 0,
			day: task.day ?? 0,
			time: task.time || '09:00',
			title: task.title || 'Study Session',
			type: task.type || subjects[0]?.name || 'Study',
			duration: task.duration || '1h',
			description: task.description || '',
			color: task.color || 'bg-primary',
			subColor: task.subColor || 'text-blue-200',
			icon: task.icon || null,
			isBreak: task.isBreak || false
		}));

		// Enrich backlog items
		const enrichedBacklog = (parsed.backlog || []).map((item, idx) => ({
			id: `backlog-${Date.now()}-${idx}`,
			title: item.title || 'Study Task',
			type: item.type || subjects[0]?.name || 'Study',
			duration: item.duration || '1h',
			color: item.color || 'bg-primary',
			subColor: item.subColor || 'text-blue-200'
		}));

		console.log(
			`[Gemini] Generated ${enrichedTasks.length} tasks, ${enrichedBacklog.length} backlog items`
		);

		return {
			tasks: enrichedTasks,
			backlog: enrichedBacklog,
			suggestions: parsed.suggestions || [],
			tips: parsed.tips || []
		};
	} catch (err) {
		console.error('[Gemini] Generation error:', err);
		return getFallbackPlan(subjects);
	}
};

/**
 * Fallback plan if AI fails
 */
function getFallbackPlan(subjects) {
	const tasks = [];
	const subjectNames = subjects.map((s) => s.name);

	// Generate basic 5-day schedule
	for (let day = 0; day < 5; day++) {
		const subjectIndex = day % subjectNames.length;
		const subject = subjectNames[subjectIndex];

		tasks.push({
			id: `fallback-${day}-0`,
			week: 0,
			day,
			time: '09:00',
			title: `${subject}: Study Session`,
			type: subject,
			duration: '2h',
			description: 'Review key concepts and practice problems',
			color: 'bg-primary',
			subColor: 'text-blue-200',
			isBreak: false
		});

		tasks.push({
			id: `fallback-${day}-1`,
			week: 0,
			day,
			time: '11:00',
			title: 'Break',
			type: 'Rest',
			duration: '15m',
			color: 'bg-[#232f48]',
			isBreak: true
		});
	}

	return {
		tasks,
		backlog: [],
		suggestions: [
			{
				type: 'WARNING',
				title: 'AI Generation Failed',
				message: 'Using fallback schedule. Try regenerating.',
				priority: 'HIGH'
			}
		],
		tips: ['AI connection failed. Check your API key.']
	};
}
