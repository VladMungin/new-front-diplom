import { userStore } from '@/entities/user';
import { UseMutationOptions, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { keyEmployeesGet } from './_constants';
import { Employee } from './_types';
import { getEmployees } from './api';

export const useGetEmployees = (
	config?: UseMutationOptions<Employee, Error, Employee, unknown>
) => {
	const user = useAtomValue(userStore);
	return useQuery({
		queryFn: () => getEmployees(user!.id),
		queryKey: keyEmployeesGet,
		...config,
		// initialData: [
		// 	{
		// 		companyId: '123',
		// 		email: 'qweqew@qwe',
		// 		fullName: 'GHJGh',
		// 		id: '1',
		// 		phone: '895246',
		// 	},
		// 	{
		// 		companyId: '123',
		// 		email: 'qweqew@qwe',
		// 		fullName: 'GHJGfghjklh',
		// 		id: '2',
		// 		phone: '895246',
		// 	},
		// 	{
		// 		companyId: '123',
		// 		email: 'qweqew@qwe',
		// 		fullName: 'GHJGqweqweqweh',
		// 		id: '3',
		// 		phone: '895246',
		// 	},
		// 	{
		// 		companyId: '123',
		// 		email: 'qweqew@qwe',
		// 		fullName: 'GHJGasdh',
		// 		id: '4',
		// 		phone: '895246',
		// 	},
		// ],
	});
};
