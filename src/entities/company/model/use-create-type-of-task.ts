import { TypeOfTask } from '@/entities/task';
import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { createTypeOfTask } from './api';

export const useCreateTypeOfTask = (config?: UseMutationConfig<TypeOfTask>) => {
	return useMutation({
		mutationFn: (data: TypeOfTask) => createTypeOfTask(data),
		...config,
	});
};
