import { baseApi } from '@/shared/api';
import { targetProject } from './_constants';
import { Project, ProjectRequest } from './_types';

export const createProject = async (data: ProjectRequest): Promise<Project> => {
	return (await baseApi.post(targetProject, data)).data;
};

export const getProjects = async (userId: string): Promise<Project[]> => {
	return (await baseApi(`${targetProject}/user/${userId}`)).data;
};

export const getProjectById = async (id: string): Promise<Project> =>
	(await baseApi(`${targetProject}/${id}`)).data;

export const updateProject = async (data: Project): Promise<Project> =>
	await baseApi.patch(`${targetProject}/${data.id}`, {
		...data,
	});
