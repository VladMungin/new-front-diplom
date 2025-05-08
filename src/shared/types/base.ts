import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

// T - Тип данных, возвращаемых queryFn
export type UseQueryConfig<T> = Omit<UseQueryOptions<T, Error, T>, 'queryKey'>;

// T - Возврат mutate функции, U - тип который функция принимает
export type UseMutationConfig<T, U = T> = UseMutationOptions<
	T,
	Error,
	U,
	unknown
>;
