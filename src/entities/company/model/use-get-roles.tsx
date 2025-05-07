import { useQuery } from '@tanstack/react-query';
import { keyRolesGet } from './_consts';
import { getRoles } from './api';

export const useGetRoles = (userId: string) =>
	useQuery({
		queryFn: () => getRoles(userId),
		queryKey: keyRolesGet,
	});
