import { Task, TASK_STATUS } from '../model';

export function transformTasksByStatus(tasks: Task[]) {
	// Подсчитываем количество задач по статусам
	const statusCount = tasks.reduce(
		(acc: { [key in TASK_STATUS]?: number }, task) => {
			const status = TASK_STATUS[task.status];
			acc[status] = (acc[status] || 0) + 1;
			return acc;
		},
		{}
	);

	// Определяем цвета для статусов
	const colors: { [key in TASK_STATUS]: string } = {
		[TASK_STATUS.PENDING]: 'blue',
		[TASK_STATUS.IN_WORK]: 'orange',
		[TASK_STATUS.DONE]: 'green',
	};

	// Преобразуем в требуемый формат
	return Object.entries(statusCount).map(([status, count]) => ({
		name: status as TASK_STATUS,
		value: count as number,
		color: colors[status as TASK_STATUS] || 'gray.6',
	}));
}
