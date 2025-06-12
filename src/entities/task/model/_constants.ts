export const targetTask = '/task';
export const keyTasksGet = [targetTask, 'all-tasks'];

export const targetTaskLog = '/task-log';
export const keyTasksLogGet = [targetTaskLog, 'all-tasks-log'];

export enum TASK_STATUS {
	'PENDING' = 'Ожидает',
	'IN_WORK' = 'В работе',
	'DONE' = 'Выполнено',
}

export enum TASK_ACTION {
	CREATE = 'create',
	CHANGE_EMPLOYEE = 'change_employee',
	CHANGE_STATUS = 'change_status',
	CHANGE_TIME = 'change_time',
	DELETE = 'delete',
}
