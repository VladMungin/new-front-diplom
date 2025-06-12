import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { Employee } from './_types';
import { deleteEmployee } from './api';

export const useGetDeleteEmployee = (
	config?: UseMutationConfig<Employee, string>
) =>
	useMutation({
		mutationFn: (id: string) => deleteEmployee(id),
		...config,
	});
