import { UseQueryConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keyEmployeeGetById } from './_constants';
import { Employee } from './_types';
import { getEmployeeById } from './api';

export const useGetEmployeeById = (
	id: string,
	config?: UseQueryConfig<Employee>
) => {
	return useQuery({
		queryFn: () => getEmployeeById(id),
		queryKey: keyEmployeeGetById,
		...config,
	});
};
