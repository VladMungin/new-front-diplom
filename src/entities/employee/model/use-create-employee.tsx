import { CreateEmployee } from '@/page/employees';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createEmployee } from './api';

export const useCreateEmployee = (
	config?: UseMutationOptions<CreateEmployee, Error, CreateEmployee, unknown>
) =>
	useMutation({
		mutationFn: data => createEmployee(data),
		...config,
	});
