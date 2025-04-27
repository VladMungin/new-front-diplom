import { Specialization } from '@/entities/employee';
import { Role, TypeOfTask } from '@/entities/task';
import { baseApi } from '@/shared/api';

export const createRole = async (data: Role): Promise<Role> =>
	(await baseApi.post('/role', data)).data;

export const createSpecialization = async (
	data: Specialization
): Promise<Specialization> =>
	(await baseApi.post('/specialization', data)).data;

export const createTypeOfTask = async (data: TypeOfTask): Promise<TypeOfTask> =>
	(await baseApi.post('/type-of-task', data)).data;
