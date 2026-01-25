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

			case 'STUDY_GEN': {
				// Placeholder for future implementation
				aiResponse = { message: 'Study plan generation coming soon' };
				break;
			}

			case 'NATURAL_LANGUAGE': {
				// Placeholder for future implementation
				aiResponse = { message: 'Natural language parsing coming soon' };
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
