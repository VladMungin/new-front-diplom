export function timeToMilliseconds(timeStr: string) {
	const [hours, minutes, seconds] = timeStr.split(':').map(Number);
	return (hours * 3600 + minutes * 60 + seconds) * 1000;
}
