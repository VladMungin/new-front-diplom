import { Specialization } from '@/entities/employee';
import { Role, TypeOfTask } from '@/entities/task';
import { baseApi } from '@/shared/api';
import { targetRole, targetSpecialization, targetTypeOfTask } from './_consts';

export const createRole = async (data: Role): Promise<Role> =>
	(await baseApi.post(targetRole, data)).data;

export const getRoles = async (): Promise<Role[]> =>
	(await baseApi(targetRole)).data;

export const createSpecialization = async (
	data: Specialization
): Promise<Specialization> =>
	(await baseApi.post(targetSpecialization, data)).data;

export const createTypeOfTask = async (data: TypeOfTask): Promise<TypeOfTask> =>
	(await baseApi.post(targetTypeOfTask, data)).data;
