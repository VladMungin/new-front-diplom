import { TypeOfTask } from '@/entities/task';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createTypeOfTask } from './api';

export const useCreateTypeOfTask = (
	config?: UseMutationOptions<TypeOfTask, Error, TypeOfTask, unknown>
) => {
	return useMutation({
		mutationFn: (data: TypeOfTask) => createTypeOfTask(data),
		...config,
	});
};
