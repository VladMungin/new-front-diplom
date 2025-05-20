import { UseQueryConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keyTasksGet } from './_constants';
import { Task } from './_types';
import { getTasks } from './api';

export const useGetTasks = (config?: UseQueryConfig<Task[]>) =>
	useQuery({
		queryFn: getTasks,
		queryKey: keyTasksGet,
		...config,
	});
