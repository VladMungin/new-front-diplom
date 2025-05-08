import { baseApi } from '@/shared/api';
import { AxiosResponse } from 'axios';
import { Auth, AuthRequest } from './_types';

export const register = async (data: Auth): Promise<AuthRequest> =>
	(
		await baseApi.post('/auth/register', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
	).data;

export const login = async (data: Auth, token: string): Promise<AuthRequest> =>
	(
		await baseApi.post('/auth/login', data, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
	).data;

export const loginToken = async (): Promise<AxiosResponse<AuthRequest>> =>
	await baseApi.post('/auth/login/access_token', undefined, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
