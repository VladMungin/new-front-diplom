import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useCookies } from 'react-cookie';
import { userStore } from './_store';
import { Auth } from './_types';
import { login, loginToken, register } from './api';

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
				expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
			});
			console.log(data.user);
			setUser(data.user);
		},
	});

	const loginData = useMutation({
		mutationFn: (data: Auth) => {
			return login(data, cookies.access_token);
		},
		onSuccess: data => {
			setCookie('access_token', data.accessToken, {
				expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
			});
			setUser(data.user);
		},
	});

	const loginTokenData = useMutation({
		mutationFn: () => {
			return loginToken(cookies.access_token);
		},
		onSuccess: data => {
			setCookie('access_token', data.accessToken, {
				expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
			});
			setUser(data.user);
		},
	});

	return {
		isAuth,
		registerData,
		loginData,
		loginTokenData,
	};
};
