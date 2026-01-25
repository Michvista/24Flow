import prisma from '../db.mjs';
import { generateAutoFill } from '../services/autoFillService.mjs';
import { getOverlapFixes, applyOverlapFix } from '../services/overlapFixerService.mjs';
import { GoogleGenAI } from '@google/genai';
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

			case 'BULK_SAVE_EVENTS': {
				// payload: { events: [...] }
				const { events } = payload;

				// Use a transaction so it's all-or-nothing
				aiResponse = await prisma.$transaction(
					events.map((event) =>
						prisma.event.create({
							data: {
								title: event.text,
								startTime: new Date(event.time || new Date()),
								endTime: new Date(new Date(event.time || new Date()).getTime() + 60 * 60 * 1000), // Default 1hr
								userId: req.user.id,
								color: '#3d7bff', // Default color
								colorName: 'primary-accent',
								textColor: '#ffffff',
								desc: `Digitized via OCR | Tag: ${event.tag || 'None'}`
							}
						})
					)
				);
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
