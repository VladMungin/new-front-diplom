import { Role } from '@/entities/task';
import { UseMutationConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keyRolesGet } from './_consts';
import { getRoles } from './api';

export const useGetRoles = (
	userId: string,
	config?: UseMutationConfig<Role[]>
) =>
	useQuery({
		queryFn: () => getRoles(userId),
		queryKey: keyRolesGet,
		...config,
	});
