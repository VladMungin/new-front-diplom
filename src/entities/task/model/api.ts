import { baseApi } from '@/shared/api';
import { targetTask, targetTaskLog } from './_constants';
import { CreateTaskLogDto, Task, TaskLog, UpdateTaskLogDto } from './_types';

export const createTask = async (data: Task): Promise<Task> =>
	(await baseApi.post(targetTask, data)).data;

export const getTasks = async (userId: string): Promise<Task[]> =>
	(await baseApi(`${targetTask}/user/${userId}`)).data;

export const getTaskById = async (id: string): Promise<Task> =>
	(await baseApi(`${targetTask}/${id}`)).data;

export const updateTask = async (data: Task): Promise<Task> => {
	const { id, ...dataWithoutId } = data;
	return (await baseApi.patch(`${targetTask}/${id}`, dataWithoutId)).data;
};

// TASK LOG

export const createTaskLog = async (
	data: CreateTaskLogDto
): Promise<CreateTaskLogDto> => (await baseApi.post(targetTaskLog, data)).data;

export const getTaskLogAll = async () => {
	return (await baseApi(targetTaskLog)).data;
};

export const getTaskLogById = async (id: string): Promise<TaskLog> => {
	return (await baseApi(`${targetTaskLog}/${id}`)).data;
};

export const updateTaskLog = async (data: UpdateTaskLogDto) => {
	const { taskId, ...dataWithoutId } = data;
	return (
		await baseApi.patch<TaskLog>(`${targetTaskLog}/${taskId}`, dataWithoutId)
	).data;
};
