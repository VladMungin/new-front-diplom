import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import {usePathname, useRouter} from 'next/navigation';
import { useCookies } from 'react-cookie';
import {adminStore, companyStore, roleStore, userStore} from './_store';
import { Auth } from './_types';
import { deleteToken, login, loginToken, register } from './api';
import {getRoles} from "@/entities/company";
import {Role} from "@/entities/task";

export const useAuth = () => {

	const [cookies, setCookie] = useCookies(['access_token']);
	const setUser = useSetAtom(userStore);
	const setAdminId = useSetAtom(adminStore);
	const setCompanyId = useSetAtom(companyStore);
	const setRoles = useSetAtom(roleStore)
	const router = useRouter();
	const pathname = usePathname()


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
			setAdminId(data.user.company?.user[0].id || data.user.id);
			setCompanyId(data.user.companyId);
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
			console.log(data);
			setUser(data.user);
			setAdminId(data.user.company?.user[0].id || data.user.id);
			setCompanyId(data.user.companyId);

			router.push('/');
		},
	});

	const loginTokenData = useMutation({
		mutationFn: () => {
			return loginToken();
		},
		onSuccess: async data => {
			setCookie('access_token', data.data.accessToken, {
				expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
			});
			setUser(data.data.user);
			setAdminId(data.data.user.company?.user[0].id || data.data.user.id);
			setCompanyId(data.data.user.companyId);
			const roles = await getRoles(data.data.user.company?.user[0].id || data.data.user.id)
			setRoles(roles.find(role => role.id === data.data.user.roleId) as Role);
		},
		onError: () => {
			if(pathname !== '/auth/login' && pathname !== '/auth/register'){

			router.push('/auth/login');
			}
		},
	});

	const logoutData = useMutation({
		mutationFn: () => {
			return deleteToken();
		},
		onSuccess: () => {
			router.push('/auth/login');
		},
	});

	return {
		isAuth,
		registerData,
		loginData,
		loginTokenData,
		logoutData,
	};
};
