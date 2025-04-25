import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import { useCookies } from 'react-cookie';
import { userStore } from './_store';
import { Auth } from './_types';
import { login, register } from './api';

export const useAuth = () => {
	const [cookies, setCookie] = useCookies(['access_token']);
	const setUser = useSetAtom(userStore);

	const isAuth = !!cookies.access_token;

	const registerData = useMutation({
		mutationFn: (data: Auth) => {
			return register(data);
		},
		onSuccess: data => {
			setCookie('access_token', data.accessToken, {
				expires: dayjs(2 * 7 * 24 * 60 * 60 * 60).toDate(),
			});
			setUser(data.user);
		},
	});

	const loginData = useMutation({
		mutationFn: (data: Auth) => {
			return login(data, cookies.access_token);
		},
		onSuccess: data => {
			setCookie('access_token', data.accessToken, {
				expires: dayjs(2 * 7 * 24 * 60 * 60 * 60).toDate(),
			});
			setUser(data.user);
		},
	});

	return {
		isAuth,
		registerData,
		loginData,
	};
};
