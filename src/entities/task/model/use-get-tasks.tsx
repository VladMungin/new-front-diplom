import { UseQueryConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keyTasksGet } from './_constants';
import { Task } from './_types';
import { getTaskById, getTasks } from './api';

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
