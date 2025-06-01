import { UseMutationConfig } from '@/shared/types';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
	Task,
	UpdateTaskEmployeeDto,
	UpdateTaskStatusDto,
	UpdateTaskTimeDto,
} from './_types';
import {
	updateTask,
	updateTaskEmployee,
	updateTaskStatus,
	updateTaskTime,
} from './api';

export const useUpdateTask = (config?: UseMutationConfig<Task>) => {
	return useMutation({
		mutationFn: (data: Task) => updateTask(data),
		...config,
	});
};

export const useUpdateTaskStatus = (
	id: string
): UseMutationResult<Task, Error, { data: UpdateTaskStatusDto }> => {
	return useMutation({
		mutationFn: ({ data }) => updateTaskStatus(id, data),
		onError: error => {
			console.error('Failed to update task status:', error);
		},
	});
};
export const useUpdateTaskTime = (
	id: string
): UseMutationResult<Task, Error, { data: UpdateTaskTimeDto }> => {
	return useMutation({
		mutationFn: ({ data }) => updateTaskTime(id, data),
		onError: error => {
			console.error('Failed to update task time:', error);
		},
	});
};

export const useUpdateTaskEmployee = (
	id: string
): UseMutationResult<Task, Error, { data: UpdateTaskEmployeeDto }> => {
	return useMutation({
		mutationFn: ({ data }) => updateTaskEmployee(id, data),
		onError: error => {
			console.error('Failed to update task employee:', error);
		},
	});
};
