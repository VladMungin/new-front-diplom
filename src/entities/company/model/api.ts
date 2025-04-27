import { Role } from '@/entities/task';
import { baseApi } from '@/shared/api';

export const createRole = async (data: Role): Promise<Role> =>
	(await baseApi.post('/role', data)).data;
