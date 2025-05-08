'use client';

import { useGetEmployees } from '@/entities/employee';
import { userStore } from '@/entities/user';
import { useAtomValue } from 'jotai';

export const AllEmployeesProjects = () => {
	const user = useAtomValue(userStore);
	const {} = useGetEmployees(user?.id as string, {
		enabled: !!user?.id,
	});
	return <div></div>;
};
