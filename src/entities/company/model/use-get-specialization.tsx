import { Specialization } from '@/entities/employee';
import { UseQueryConfig } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { keySpecializationGet } from './_consts';
import { getSpecialization } from './api';

export const useGetSpecialization = (
	userId: string,
	config?: UseQueryConfig<Specialization[]>
) =>
	useQuery({
		queryFn: () => getSpecialization(userId),
		queryKey: keySpecializationGet,
		...config,
	});
