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
