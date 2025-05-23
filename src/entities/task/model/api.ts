import { baseApi } from '@/shared/api';
import { targetTask } from './_constants';
import { Task } from './_types';

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
