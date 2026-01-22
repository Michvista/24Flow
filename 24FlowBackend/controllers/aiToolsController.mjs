import prisma from '../db.mjs';
import { generateAutoFill } from '../services/autoFillService.mjs';
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const handleAiTool = async (req, res, next) => {
	try {
		const { toolType, payload } = req.body;
		let aiResponse;

		switch (toolType) {
			case 'AUTO_FILL':
				aiResponse = await generateAutoFill(payload, req.user.id);
				aiResponse = { message: 'Simulated Auto-Fill Success', tasks: payload.tasks };
				break;

			case 'STUDY_GEN':
				// aiResponse = await generateStudyPlan(payload);
				break;

			case 'NATURAL_LANGUAGE':
				// aiResponse = await parseNaturalLanguage(payload.text);
				break;

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
				return res.status(400).json({ status: 'fail', message: 'Unknown tool type' });
		}

		// Log the action for the user's history
		await prisma.aITools.create({
			data: {
				userId: req.user.id,
				toolType,
				inputData: payload,
				outputData: aiResponse
			}
		});

		res.status(200).json({ status: 'success', data: aiResponse });
	} catch (error) {
		console.error('CRASH IN AI CONTROLLER:', error); // Check your terminal for this!
		res.status(500).json({
			status: 'error',
			message: error.message,
			stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
		});
	}
};
