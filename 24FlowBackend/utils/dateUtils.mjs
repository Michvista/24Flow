export const getNextDateForDay = (day) => {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const target = days.indexOf(day);
	if (target === -1) throw new Error('Invalid day: ' + day);

	const today = new Date();
	const diff = (target + 7 - today.getDay()) % 7 || 7;

	const result = new Date(today);
	result.setDate(today.getDate() + diff);
	return result;
};
