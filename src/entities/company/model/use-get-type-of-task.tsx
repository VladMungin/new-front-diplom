import { TypeOfTask } from '@/entities/task'
import { UseQueryConfig } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'
import { getTypeOfTask } from './api'
import { keyTypeOfTaskGet } from './_consts'

export const useGetTypeOfTasks = (
	userId: string | undefined,
	config?: UseQueryConfig<TypeOfTask[]>
) =>
	useQuery({
		queryFn: () => getTypeOfTask(userId),
		queryKey: keyTypeOfTaskGet,
		...config,
	});
