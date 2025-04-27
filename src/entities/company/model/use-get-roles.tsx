import { useQuery } from '@tanstack/react-query';
import { keyRolesGet } from './_consts';
import { getRoles } from './api';

export const useGetRoles = () =>
	useQuery({
		queryFn: getRoles,
		queryKey: keyRolesGet,
	});
