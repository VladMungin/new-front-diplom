import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { Employee } from './_types';
import { updateEmployee } from './api';

export const useUpdateEmployee = (config?: UseMutationConfig<Employee>) => {
	return useMutation({
		mutationFn: (data: Employee) => updateEmployee(data),
		...config,
	});
};
