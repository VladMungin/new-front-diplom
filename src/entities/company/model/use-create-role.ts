import { Role } from '@/entities/task';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createRole } from './api';

export const useCreateRole = (
	config?: UseMutationOptions<Role, Error, Role, unknown>
) => {
	return useMutation({
		mutationFn: (data: Role) => createRole(data),
		...config,
	});
};
