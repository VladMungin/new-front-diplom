import { baseApi } from '@/shared/api';
import { targetTask } from './_constants';
import { Task } from './_types';

export const createTask = async (data: Task): Promise<Task> =>
	(
		await baseApi.post(targetTask, {
			data,
		})
	).data;
