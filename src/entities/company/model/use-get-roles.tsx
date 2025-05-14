import { Role } from '@/entities/task';
import { UseQueryConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keyRolesGet } from './_consts';
import { getRoles } from './api';

export const useGetRoles = (
	userId: string | undefined,
	config?: UseQueryConfig<Role[]>
) =>
	useQuery({
		queryFn: () => getRoles(userId),
		queryKey: keyRolesGet,
		...config,
	});
