import { TypeOfTask } from '@/entities/task';
import { UseMutationConfig } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { updateTypeOfTask } from './api';

export const useUpdateTypeOfTask = (config?: UseMutationConfig<TypeOfTask>) =>
	useMutation({
		mutationFn: (data: TypeOfTask) => updateTypeOfTask(data),
		...config,
	});
