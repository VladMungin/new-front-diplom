import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { Task } from './_types';
import { updateTask } from './api';

export const useUpdateTask = (config?: UseMutationConfig<Task>) => {
	return useMutation({
		mutationFn: (data: Task) => updateTask(data),
		...config,
	});
};
