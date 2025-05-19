import { Specialization } from '@/entities/employee';
import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { updateSpecialization } from './api';

export const useUpdateSpecialization = (
	config?: UseMutationConfig<Specialization>
) =>
	useMutation({
		mutationFn: (data: Specialization) => updateSpecialization(data),
		...config,
	});
