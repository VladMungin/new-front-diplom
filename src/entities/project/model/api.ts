import { baseApi } from '@/shared/api';
import { targetProject } from './_constants';
import { Project, ProjectRequest } from './_types';

export const createProject = async (data: ProjectRequest): Promise<Project> => {
	console.log(data);
	return (await baseApi.post(targetProject, data)).data;
};
