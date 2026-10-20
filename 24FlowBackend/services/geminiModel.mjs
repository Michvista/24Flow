const DEFAULT_MODEL = 'gemini-flash-latest';
const DEFAULT_FALLBACK_MODELS = ['gemini-3.8-flash', 'gemini-3.6-flash'];

function configuredModels() {
	const primary = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
	const fallbacks = (process.env.GEMINI_FALLBACK_MODELS || DEFAULT_FALLBACK_MODELS.join(','))
		.split(',')
		.map((model) => model.trim())
		.filter(Boolean);
	return [...new Set([primary, ...fallbacks])];
}

export async function generateContentWithFallback(ai, request) {
	const models = configuredModels();
	let lastError;

	for (const [index, model] of models.entries()) {
		try {
			return await ai.models.generateContent({ ...request, model });
		} catch (error) {
			lastError = error;
			if (index < models.length - 1) {
				console.warn(`[Gemini] ${model} failed; trying ${models[index + 1]}.`, error?.message || error);
			}
		}
	}

	throw lastError;
}
