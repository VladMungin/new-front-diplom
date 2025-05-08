import { UseQueryConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keyEmployeesGet } from './_constants';
import { Employee } from './_types';
import { getEmployees } from './api';

export const useGetEmployees = (
	userId: string,
	config?: UseQueryConfig<Employee[]>
) => {
	return useQuery({
		queryFn: () => getEmployees(userId),
		queryKey: keyEmployeesGet,
		...config,
	});
};
