// controllers/aiController.mjs
import prisma from '../db.mjs';
import { generateAutoFill } from '../services/autoFillService.mjs';
import { getOverlapFixes, applyOverlapFix } from '../services/overlapFixerService.mjs';
import { GoogleGenAI } from '@google/genai';

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

			case 'GET_CONFLICTS': {
				const conflicts = await getOverlapFixes(req.user.id);
				aiResponse = conflicts;
				break;
			}

			case 'APPLY_FIX': {
				const { proposals } = payload;

				if (!proposals || !Array.isArray(proposals)) {
					return res.status(400).json({
						status: 'fail',
						message: 'Invalid proposals format'
					});
				}

				// Apply the fixes
				const result = await applyOverlapFix(proposals);

				// Fetch updated conflicts to show current state
				const updatedConflicts = await getOverlapFixes(req.user.id);

				aiResponse = {
					applied: true,
					updatedEvents: result.updatedEvents,
					remainingConflicts: updatedConflicts
				};
				break;
			}

			case 'STUDY_GEN': {
				// aiResponse = await generateStudyPlan(payload);
				aiResponse = { message: 'Study plan generation coming soon' };
				break;
			}

			case 'NATURAL_LANGUAGE': {
				// aiResponse = await parseNaturalLanguage(payload.text);
				aiResponse = { message: 'Natural language parsing coming soon' };
				break;
			}

			case 'GENERATE_TAG': {
				const { title } = payload;

				if (!title) {
					return res.status(400).json({
						status: 'fail',
						message: 'Title is required for tag generation'
					});
				}

				const response = await ai.models.generateContent({
					model: 'gemini-3-flash-preview',
					contents: `Generate a one-word category tag for this task: "${title}". Return ONLY the word.`
				});

				const generatedTag = response.text.trim().split(/\s+/)[0] || 'General';

				aiResponse = { tag: generatedTag };
				break;
			}

			default:
				return res.status(400).json({
					status: 'fail',
					message: `Unknown tool type: ${toolType}`
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
		console.error('CRASH IN AI CONTROLLER:', error);

		// Send detailed error in development, generic in production
		res.status(500).json({
			status: 'error',
			message: error.message || 'An error occurred processing your request',
			stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
		});
	}
};
