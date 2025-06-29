import { UseQueryConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keyTasksGet, keyTasksLogGet, targetTaskLog } from './_constants';
import { Task, TaskLog } from './_types';
import { getTaskById, getTaskLogAll, getTaskLogById, getTasks } from './api';

export const useGetTasks = (userid: string, config?: UseQueryConfig<Task[]>) =>
	useQuery({
		queryFn: () => getTasks(userid),
		queryKey: keyTasksGet,
		...config,
	});

export const useGetTaskById = (id: string, config?: UseQueryConfig<Task>) =>
	useQuery({
		queryFn: () => getTaskById(id),
		queryKey: keyTasksGet,
		...config,
	});

export const useGetTaskLogAll = (config?: UseQueryConfig<TaskLog[]>) =>
	useQuery({
		queryFn: () => getTaskLogAll(),
		queryKey: keyTasksLogGet,
		...config,

	});

export const useGetTaskLogById = (
	id: number,
	config?: UseQueryConfig<TaskLog>
) =>
	useQuery({
		queryFn: () => getTaskLogById(id),
		queryKey: [targetTaskLog, 'log-by-id'],
		...config,
	});
