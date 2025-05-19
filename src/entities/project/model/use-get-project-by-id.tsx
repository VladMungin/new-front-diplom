import { UseQueryConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keyProjectGet } from './_constants';
import { Project } from './_types';
import { getProjectById } from './api';

export const useGetProjectById = (
	id: string,
	config?: UseQueryConfig<Project>
) =>
	useQuery({
		queryFn: () => getProjectById(id),
		queryKey: keyProjectGet,
		...config,
	});
