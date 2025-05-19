import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { Project } from './_types';
import { updateProject } from './api';

export const useUpdateProject = (config?: UseMutationConfig<Project>) =>
	useMutation({
		mutationFn: (data: Project) => updateProject(data),
		...config,
	});
