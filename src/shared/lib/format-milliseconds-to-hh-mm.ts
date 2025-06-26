export function formatMillisecondsToHHMM(ms: number) {
	// 1. Переводим миллисекунды в секунды, затем в минуты и часы
	const totalSeconds = Math.floor(ms / 1000);
	const totalMinutes = Math.floor(totalSeconds / 60);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	// 2. Форматируем в "HH:MM" с ведущими нулями
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
