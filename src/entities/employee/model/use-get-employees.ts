import { userStore } from '@/entities/user';
import { UseMutationOptions, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { keyEmployeesGet } from './_constants';
import { Employee } from './_types';
import { getEmployees } from './api';

export const useGetEmployees = (
	config?: UseMutationOptions<Employee, Error, Employee, unknown>
) => {
	const user = useAtomValue(userStore);
	return useQuery({
		queryFn: () => getEmployees(user!.id),
		queryKey: keyEmployeesGet,
		...config,
	});
};
