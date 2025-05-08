import { useQuery } from '@tanstack/react-query';
import { keySpecializationGet } from './_consts';
import { getSpecialization } from './api';

export const useGetSpecialization = (userId: string) =>
	useQuery({
		queryFn: () => getSpecialization(userId),
		queryKey: keySpecializationGet,
	});
