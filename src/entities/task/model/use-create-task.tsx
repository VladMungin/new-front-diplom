import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { Task } from './_types';
import { createTask } from './api';

export const useCreateTask = (config?: UseMutationConfig<Task>) => {
	return useMutation({
		mutationFn: (data: Task) => createTask(data),
		...config,
	});
};
