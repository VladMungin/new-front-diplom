import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { adminStore, userStore } from './_store';
import { Auth } from './_types';
import { login, loginToken, register } from './api';

export const useAuth = () => {
	const [cookies, setCookie] = useCookies(['access_token']);
	const setUser = useSetAtom(userStore);
	const setAdminId = useSetAtom(adminStore);
	const router = useRouter();

	const isAuth = !!cookies.access_token;

	const registerData = useMutation({
		mutationFn: (data: Auth) => {
			return register(data);
		},
		onSuccess: data => {
			setCookie('access_token', data.accessToken, {
				expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
			});
			setUser(data.user);
			setAdminId(data.user.company.user[0].id);
			router.push('/company/edit');
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
			setAdminId(data.user.company.user[0].id);

			router.push('/company/edit');
		},
	});

	const loginTokenData = useMutation({
		mutationFn: () => {
			return loginToken();
		},
		onSuccess: data => {
			setCookie('access_token', data.data.accessToken, {
				expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
			});
			setUser(data.data.user);
			setAdminId(data.data.user.company.user[0].id);
		},
	});

	return {
		isAuth,
		registerData,
		loginData,
		loginTokenData,
	};
};
