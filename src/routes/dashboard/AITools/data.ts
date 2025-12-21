export interface Post {
	slug: string;
	title: string;
	description: string;
}

export const posts: Post[] = [
	{
		slug: 'AutoFill',
		title: 'AI Auto-fill My Day',
		description:
			'Intelligently fills your empty slots based on priorities, deadlines, and energy levels.'
	},
	{
		slug: 'StudyTimetable',
		title: 'Study Timetable Gen',
		description:
			'Generates a balanced study plan for exams, ensuring proper breaks and topic rotation.'
	},
	{
		slug: 'Optimizer',
		title: 'Hour Block Optimizer',
		description:
			'Re-organizes fragmented meetings into solid deep work hour blocks for maximum focus.'
	},
	{
		slug: 'OverlapFixer',
		title: 'Smart Overlap Fixer',
		description:
			'Detects and resolves scheduling conflicts instantly by proposing optimal alternatives.'
	},
	{
		slug: 'LanguageTranscriber',
		title: 'Natural Language',
		description:
			"'Meeting with Bob next Tuesday at 2pm.' Type your plans in plain English to schedule."
	},
	{
		slug: 'SchoolTimetableGen',
		title: 'School Timetable Gen',
		description: 'Create complex class and activity timetables for students or teachers in seconds.'
	}
];
