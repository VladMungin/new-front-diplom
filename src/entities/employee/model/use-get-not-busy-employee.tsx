import { UseQueryConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keyNotBusyEmployee } from './_constants';
import { Employee } from './_types';
import { getNotBusyEmployee } from './api';

export const useGetNotBusyEmployee = (
	specializationId: string,
	config?: UseQueryConfig<Employee>
) =>
	useQuery({
		queryFn: () => getNotBusyEmployee(specializationId),
		queryKey: keyNotBusyEmployee,
		...config,
	});
