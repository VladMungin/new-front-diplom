import { baseApi } from '@/shared/api';
import { Auth, AuthRequest } from './_types';

export const register = async (data: Auth): Promise<AuthRequest> =>
	(await baseApi.post('/auth/register', data)).data;

export const login = async (data: Auth, token: string): Promise<AuthRequest> =>
	(
		await baseApi.post('/auth/login', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	).data;
