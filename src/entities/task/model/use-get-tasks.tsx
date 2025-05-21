import { UseQueryConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keyTasksGet } from './_constants';
import { Task } from './_types';
import { getTasks } from './api';

export const useGetTasks = (userId: string, config?: UseQueryConfig<Task[]>) =>
	useQuery({
		queryFn: () => getTasks(userId),
		queryKey: keyTasksGet,
		...config,
	});
