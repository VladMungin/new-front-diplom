import { Task } from '../model';

export const groupTaskByType = (tasks: Task[]) => {
	return tasks.reduce<Record<string, Task[]>>((grouped, task) => {
		const {
			type: { name },
		} = task;

		if (!grouped[name]) {
			grouped[name] = [];
		}
		grouped[name].push(task);
		return grouped;
	}, {});
};
