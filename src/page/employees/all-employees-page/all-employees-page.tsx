'use client';

import { Employee, useGetEmployees } from '@/entities/employee';
import { userStore } from '@/entities/user';
import { useAtomValue } from 'jotai';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
export const AllEmployeesProjects = () => {
	const user = useAtomValue(userStore);
	const { data: employees, isLoading } = useGetEmployees(user?.id as string, {
		enabled: !!user?.id,
	});

	const columns = useMemo<MRT_ColumnDef<Employee>[]>(
		() => [
			{
				accessorKey: 'fullName',
				header: 'Имя',
			},
			{
				accessorKey: 'email',
				header: 'Почта',
			},
			{
				accessorKey: 'phone',
				header: 'Телефон',
			},
		],
		[]
	);

	// const table = useMantineReactTable({
	// 	columns,
	// 	data: employees || [],
	// 	enableEditing: true,
	// });

	return (
		<div>
			<MantineReactTable
				data={employees || []}
				columns={columns}
				editDisplayMode='table'
				enableEditing
				state={{
					isLoading,
				}}
				getRowId={row => row.id}
				mantineEditTextInputProps={{
					onBlur: ({ target }) => {
						console.log(target?.value); // получение нового значения
						console.log(target.name.split('_')[0]); // получение id employee
					},
				}}
			/>
		</div>
	);
};
