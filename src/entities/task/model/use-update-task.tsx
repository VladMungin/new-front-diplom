import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { Task, TaskLog, UpdateTaskLogDto } from './_types';
import { updateTask, updateTaskLog } from './api';

export const useUpdateTask = (config?: UseMutationConfig<Task>) => {
	return useMutation({
		mutationFn: (data: Task) => updateTask(data),
		...config,
	});
};

export const useUpdateTaskLog = (config?: UseMutationConfig<TaskLog>) => {
	return useMutation({
		mutationFn: (data: UpdateTaskLogDto) => updateTaskLog(data),
		...config,
	});
};
