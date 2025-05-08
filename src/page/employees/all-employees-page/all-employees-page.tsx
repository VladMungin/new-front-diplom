'use client';

import { useGetEmployees } from '@/entities/employee';
import { userStore } from '@/entities/user';
import { useAtomValue } from 'jotai';

export const AllEmployeesProjects = () => {
	const user = useAtomValue(userStore);
	const { data: employees } = useGetEmployees(user?.id as string, {
		enabled: !!user?.id,
	});

	console.log(employees);
	return <div></div>;
};
