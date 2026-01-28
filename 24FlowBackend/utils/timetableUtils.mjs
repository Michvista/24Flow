export const getNextDateForDay = (day) => {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const target = days.indexOf(day);
	const today = new Date();
	// If today is the day, this returns 7 (next week) to avoid conflicting with
	// a class that might have already started today.
	const diff = (target + 7 - today.getDay()) % 7 || 7;
	today.setDate(today.getDate() + diff);
	today.setHours(0, 0, 0, 0);
	return today;
};

export const buildClassDateRange = (tClass) => {
	const baseDate = getNextDateForDay(tClass.day);

	const [sh, sm] = tClass.startTime.split(':');
	const [eh, em] = tClass.endTime.split(':');

	const start = new Date(baseDate);
	start.setHours(parseInt(sh), parseInt(sm), 0, 0);

	const end = new Date(baseDate);
	end.setHours(parseInt(eh), parseInt(em), 0, 0);

	return { start, end };
};

export const hasOverlap = (classRange, event) => {
	// Standard interval overlap formula
	return classRange.start < event.endTime && classRange.end > event.startTime;
};
