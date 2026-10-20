# 24Flow

24Flow is an AI-powered 24-hour timetable that helps you plan your entire day from 12AM to 12AM. It converts natural language tasks into hourly blocks, auto-fills your schedule, optimizes focus and breaks, and intelligently resolves overlaps so every hour works for you.

## Gemini model configuration

The backend uses `gemini-3.8-flash` by default. Set `GEMINI_MODEL` and the
comma-separated `GEMINI_FALLBACK_MODELS` in the backend deployment environment
to change model order or add newer supported models without editing individual
AI features. The fallback defaults are listed in `24FlowBackend/.env.example`.
