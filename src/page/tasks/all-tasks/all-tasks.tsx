'use client';

import { Task, TASK_STATUS, useGetTasks } from '@/entities/task';
import { adminStore } from '@/entities/user';
import { useAtomValue } from 'jotai';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import {MRT_Localization_RU} from 'mantine-react-table/locales/ru/index.cjs';

import Link from 'next/link';
import { useMemo } from 'react';

export const AllTasks = () => {
	const adminId = useAtomValue(adminStore);

	const { data: tasksData, isFetched } = useGetTasks(adminId as string, {
		enabled: !!adminId,
	});

	const columns = useMemo<MRT_ColumnDef<Task>[]>(
		() => [
			{
				accessorKey: 'id',
				header: '№',
	// @ts-expect-error
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
				accessorKey: 'project.name',
				header: 'Проект',
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
				Cell: ({ row }) => {
					return (
						<Link
							href={`/user/${row.original.employeeId}`}
							className='underline text-(--mantine-color-blue-2)'
						>
							{row.original.employee?.fullName}
						</Link>
					);
				},
			},
			{
				accessorKey: 'createdBy.name',
				header: 'Автор задачи',
			},
		],
		[]
	);

	if (!tasksData?.length && isFetched) {
		return <div>Задач нет, отдыхай :)</div>;
	}
	return (
		<div>
			<MantineReactTable
				data={tasksData || []}
				columns={columns}
				state={{
					isLoading: !isFetched,
				}}
				localization={MRT_Localization_RU}
			/>
		</div>
	);
};
