import { Specialization } from '@/entities/employee';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createSpecialization } from './api';

export const useCreateSpecialization = (
	config?: UseMutationOptions<Specialization, Error, Specialization, unknown>
) => {
	return useMutation({
		mutationFn: (data: Specialization) => createSpecialization(data),
		...config,
	});
};
