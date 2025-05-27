import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { CreateTaskLogDto, Task } from './_types';
import { createTask, createTaskLog } from './api';

export const useCreateTask = (config?: UseMutationConfig<Task>) => {
	return useMutation({
		mutationFn: (data: Task) => createTask(data),
		...config,
	});
};

export const useCreateTaskLog = (
	config?: UseMutationConfig<CreateTaskLogDto>
) => {
	return useMutation({
		mutationFn: (data: CreateTaskLogDto) => createTaskLog(data),
		...config,
	});
};
