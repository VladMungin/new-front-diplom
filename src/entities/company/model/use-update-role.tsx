import { Role } from '@/entities/task';
import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { updateRoles } from './api';

export const useUpdateRole = (config?: UseMutationConfig<Role>) =>
	useMutation({
		mutationFn: (data: Role) => updateRoles(data),
		...config,
	});
