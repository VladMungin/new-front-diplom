export const targetTask = '/task';
export const keyTasksGet = [targetTask, 'all-tasks'];

export const targetTaskLog = '/task-log';
export const keyTasksLogGet = [targetTaskLog, 'all-tasks-log'];

export enum TASK_STATUS {
	'PENDING' = 'Ожидает',
	'IN_WORK' = 'В работе',
	'DONE' = 'Выполнено',
}
