import prisma from '../db.mjs';
import { generateAutoFill } from '../services/autoFillService.mjs';
import { getOverlapFixes, applyOverlapFix } from '../services/overlapFixerService.mjs';
import { GoogleGenAI } from '@google/genai';
import { generateWithGemini } from '../services/geminiService.mjs';
import { processAndSaveNLPEvent } from '../services/languageService.mjs';
import { performOCR } from '../services/OCRService.mjs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const handleAiTool = async (req, res, next) => {
	try {
		const { toolType, payload } = req.body;
		let aiResponse;

		switch (toolType) {
			case 'AUTO_FILL': {
				aiResponse = await generateAutoFill(payload, req.user.id);
				break;
			}

			case 'NATURAL_LANGUAGE': {
				aiResponse = await processAndSaveNLPEvent(payload, req.user.id);
				break;
			}

			case 'GENERATE_TAG': {
				const { title } = payload;

				const response = await ai.models.generateContent({
					model: 'gemini-3-flash-preview',
					contents: `Generate a one-word category tag for this task: "${title}". Return ONLY the word.`
				});

				const generatedTag = response.text.trim().split(/\s+/)[0] || 'General';

				aiResponse = { tag: generatedTag };
				break;
			}

			case 'DIGITIZE_OCR': {
				// payload: { image: "base64...", mimeType: "image/jpeg" }
				aiResponse = await performOCR(payload);
				break;
			}

			case 'BULK_SAVE_TASKS': {
				const { tasks } = payload || {};

				if (!Array.isArray(tasks) || tasks.length === 0) {
					aiResponse = { status: 'success', count: 0, message: 'No tasks provided' };
					break;
				}

				// Validate tasks items minimally
				const validTasks = tasks.filter((t) => t && t.title && typeof t.title === 'string');
				if (validTasks.length === 0) {
					return res
						.status(400)
						.json({ status: 'fail', message: 'Tasks must be an array of objects with a title' });
				}

				// Using Prisma createMany for efficiency
				const savedTasks = await prisma.task.createMany({
					data: validTasks.map((task) => ({
						userId: req.user.id,
						title: task.title,
						description: task.description || '',
						completed: false
					}))
				});

				aiResponse = {
					status: 'success',
					count: savedTasks.count
				};
				break;
			}

			case 'LOG_MOOD': {
				// payload: { mood: "PRODUCTIVE" }
				aiResponse = await prisma.moodLog.create({
					data: {
						userId: req.user.id,
						mood: payload.mood
					}
				});
				break;
			}

			case 'GET_INTELLIGENCE_REPORT': {
				// 1. Find the report the Cron Job already made for today
				const behaviorReport = await prisma.behaviorSummary.findUnique({
					where: { userId: req.user.id }
				});

				if (!behaviorReport) {
					return res.status(200).json({
						status: 'success',
						data: null,
						message: 'No report generated yet'
					});
				}

				// 2. Return the stored summary
				aiResponse = behaviorReport.summary;
				break;
			}

			default:
				return res.status(400).json({
					status: 'fail',
					message: `Unknown tool type: ${toolType}. Supported types: AUTO_FILL, GET_CONFLICTS, APPLY_FIX, STUDY_GEN, NATURAL_LANGUAGE, GENERATE_TAG`
				});
		}

		// Log the action for the user's history
		try {
			await prisma.aITools.create({
				data: {
					userId: req.user.id,
					toolType,
					inputData: payload || {},
					outputData: aiResponse || {}
				}
			});
		} catch (logError) {
			// Don't fail the request if logging fails
			console.error('Failed to log AI tool usage:', logError);
		}

		res.status(200).json({
			status: 'success',
			data: aiResponse
		});
	} catch (error) {
		console.error('Error in AI controller:', error);

		// Send detailed error in development, generic in production
		res.status(500).json({
			status: 'error',
			message: error.message || 'An error occurred processing your request',
			...(process.env.NODE_ENV === 'development' && { stack: error.stack })
		});
	}
};

export const getAiStatus = async (req, res, next) => {
	try {
		const active = !!process.env.GEMINI_API_KEY;
		res.json({ status: 'success', data: { active } });
	} catch (err) {
		next(err);
	}
};

export const getInsights = async (req, res, next) => {
	try {
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ status: 'error', message: 'Not authenticated' });

		const prompt = 'Provide 3 actionable study insights for this user as a JSON array of strings.';

		const result = await ai.models.generateContent({
			model: 'gemini-3-flash-preview',
			contents: prompt
		});

		const responseText =
			result.text ||
			result.response?.text?.() ||
			result.text.trim().split(/\s+/)[0] ||
			'No Insights';

		console.log('--- RAW INSIGHTS ---');
		console.log(responseText);

		// Regex to find the array [ "insight1", "insight2" ]
		const jsonMatch = responseText.match(/\[[\s\S]*\]/);
		const insights = jsonMatch ? JSON.parse(jsonMatch[0]) : ['Stay focused!'];

		res.json({ status: 'success', data: { insights } });
	} catch (err) {
		console.error('[aiToolsController] getInsights error:', err);
		// Ensure you don't use 'title' here unless it's defined!
		next(err);
	}
};
