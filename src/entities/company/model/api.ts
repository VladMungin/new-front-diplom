import { Specialization } from '@/entities/employee';
import { Role, TypeOfTask } from '@/entities/task';
import { baseApi } from '@/shared/api';
import { targetRole, targetSpecialization, targetTypeOfTask } from './_consts';

// roles
export const createRole = async (data: Role): Promise<Role> =>
	(await baseApi.post(targetRole, data)).data;

export const getRoles = async (userId: string | undefined): Promise<Role[]> =>
	(await baseApi(`${targetRole}/${userId}`)).data;

export const updateRoles = async (data: Role): Promise<Role> =>
	(
		await baseApi.patch(`${targetRole}/${data.id}`, {
			...data,
		})
	).data;
// specializations
export const createSpecialization = async (
	data: Specialization
): Promise<Specialization> =>
	(await baseApi.post(targetSpecialization, data)).data;

export const getSpecialization = async (userId: string): Promise<Role[]> =>
	(await baseApi(`${targetSpecialization}/${userId}`)).data;

// typ of task
export const createTypeOfTask = async (data: TypeOfTask): Promise<TypeOfTask> =>
	(await baseApi.post(targetTypeOfTask, data)).data;

export const getTypeOfTask = async (userId: string | undefined): Promise<Role[]> =>
	(await baseApi(`${targetTypeOfTask}/${userId}`)).data;

export const updateTypeOfTask = async (data: TypeOfTask): Promise<TypeOfTask> =>
	(
		await baseApi.patch(`${targetTypeOfTask}/${data.id}`, {
			...data,
		})
	).data;
