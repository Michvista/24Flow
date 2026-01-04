export interface Task {
	id: number;
	week: number;
	day: number; // 0 = Mon, 6 = Sun
	time: string; // "09:00"
	title: string;
	type: string;
	duration: string;
	color: string;
	subColor?: string;
	isBreak?: boolean;
	description?: string;
	icon?: string; // For specific icons like 'functions', 'science'
}

export interface BacklogItem {
	id: number;
	title: string;
	type: string;
	duration: string;
	color: string;
	subColor?: string;
}
