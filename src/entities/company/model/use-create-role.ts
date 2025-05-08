import { Role } from '@/entities/task';
import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { createRole } from './api';

export const useCreateRole = (config?: UseMutationConfig<Role>) => {
	return useMutation({
		mutationFn: (data: Role) => createRole(data),
		...config,
	});
};
