import { useMutation } from '@tanstack/react-query';
import { ProjectRequest } from './_types';
import { createProject } from './api';

export const useCreateProject = () => {
	return useMutation({
		mutationFn: (data: ProjectRequest) => createProject(data),
	});
};
