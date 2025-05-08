import { CreateEmployee } from '@/page/employees';
import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { Employee } from './_types';
import { createEmployee } from './api';

export const useCreateEmployee = (
	config?: UseMutationConfig<Employee, CreateEmployee>
) =>
	useMutation({
		mutationFn: data => createEmployee(data),
		...config,
	});
