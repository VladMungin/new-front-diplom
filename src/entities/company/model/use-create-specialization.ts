import { Specialization } from '@/entities/employee';
import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { createSpecialization } from './api';

export const useCreateSpecialization = (
	config?: UseMutationConfig<Specialization>
) => {
	return useMutation({
		mutationFn: (data: Specialization) => createSpecialization(data),
		...config,
	});
};
