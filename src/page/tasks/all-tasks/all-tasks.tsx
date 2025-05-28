'use client';

import { Task, TASK_STATUS, useGetTasks } from '@/entities/task';
import { adminStore, userStore } from '@/entities/user';
import { useAtomValue } from 'jotai';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { MRT_Localization_RU } from 'mantine-react-table/locales/ru';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export const AllTasks = () => {
	const user = useAtomValue(userStore);
	const adminId = useAtomValue(adminStore);
	const router = useRouter();

	const { data: tasksData, isLoading } = useGetTasks(adminId as string, {
		enabled: !!adminId,
	});

	const columns = useMemo<MRT_ColumnDef<Task>[]>(
		() => [
			{
				accessorKey: 'id',
				header: '№',
				mantineEditTextFieldProps: ({ row }) => console.log(row),
				Cell: ({ row }) => {
					return (
						<Link
							href={`/tasks/task/${row.original.id}`}
							className='underline text-(--mantine-color-blue-2) text-lg mx-auto pl-4'
						>
							{row.original.id}
						</Link>
					);
				},
				size: 10,
				maxSize: 10,
				minSize: 10,
			},
			{
				accessorKey: 'type.name',
				header: 'Тип',
			},
			{
				accessorKey: 'title',
				header: 'Название',
			},
			{
				accessorKey: 'status',
				header: 'Статус',
				Cell: ({ row }) => {
					console.log(row);
					return (
						<p>
							{
								TASK_STATUS[
									row.original?.status as unknown as keyof typeof TASK_STATUS
								]
							}
						</p>
					);
				},
			},

			{
				accessorKey: 'employee.fullName',
				header: 'Исполнитель',
			},
			{
				accessorKey: 'createdBy.name',
				header: 'Автор задачи',
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
				// mantineTableBodyRowProps={({ row }) => ({
				// 	onClick: () => {
				// 		router.push(`/tasks/task/${row.original.id}`);
				// 	},
				// })}
			/>
		</div>
	);
};
