import { baseApi } from '@/shared/api';
import { AxiosResponse } from 'axios';
import { targetTask, targetTaskLog } from './_constants';
import {
	CreateTaskLogDto,
	Task,
	TaskLog,
	UpdateTaskEmployeeDto,
	UpdateTaskLogDto,
	UpdateTaskStatusDto,
	UpdateTaskTimeDto,
} from './_types';

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

export const updateTaskStatus = async (
	id: string,
	data: UpdateTaskStatusDto
): Promise<Task> => {
	const response: AxiosResponse<Task> = await baseApi.patch(
		`${targetTask}/${id}/status`,
		data
	);
	return response.data;
};

export const updateTaskTime = async (
	id: string,
	data: UpdateTaskTimeDto
): Promise<Task> => {
	const response: AxiosResponse<Task> = await baseApi.patch(
		`${targetTask}/${id}/time`,
		data
	);
	return response.data;
};

export const updateTaskEmployee = async (
	id: string,
	data: UpdateTaskEmployeeDto
): Promise<Task> => {
	const response: AxiosResponse<Task> = await baseApi.patch(
		`${targetTask}/${id}/employee`,
		data
	);
	return response.data;
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
