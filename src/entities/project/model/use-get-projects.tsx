import { UseMutationConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keyProjectsGet } from './_constants';
import { Project } from './_types';
import { getProjects } from './api';

export const useGetProjects = (
	userId: string,
	config?: UseMutationConfig<Project[]>
) =>
	useQuery({
		queryFn: () => getProjects(userId),
		queryKey: keyProjectsGet,
		...config,
	});
