'use client';

import { Task, useGetTasks } from '@/entities/task';
import { userStore } from '@/entities/user';
import { useAtomValue } from 'jotai';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { MRT_Localization_RU } from 'mantine-react-table/locales/ru';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export const AllTasks = () => {
	const user = useAtomValue(userStore);
	const router = useRouter();

	const { data: tasksData, isLoading } = useGetTasks(user?.id as string, {
		enabled: !!user?.id,
	});

	const columns = useMemo<MRT_ColumnDef<Task>[]>(
		() => [
			{
				accessorKey: 'id',
				header: '№',
				mantineEditTextFieldProps: ({ row }) => console.log(row),
			},
			{
				accessorKey: 'type.name',
				header: 'Тип',
			},
			{
				accessorKey: 'title',
				header: 'Заголовок',
				mantineEditTextInputProps: {},
			},
			{
				accessorKey: 'status',
				header: 'Статус',
			},

			{
				accessorKey: 'employee.fullName',
				header: 'Исполнитель',
			},
		],
		[]
	);

	if (!tasksData?.length) {
		return <div>Задач нет, отдыхай :)</div>;
	}
	return (
		<div>
			<MantineReactTable
				data={tasksData || []}
				columns={columns}
				state={{
					isLoading,
				}}
				localization={MRT_Localization_RU}
				mantineTableBodyRowProps={({ row }) => ({
					onClick: () => {
						router.push(`/tasks/task/${row.original.id}`);
					},
				})}
			/>
		</div>
	);
};
