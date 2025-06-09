'use client';

import { Task, TaskCard, useGetTasks } from '@/entities/task';
import { adminStore, userStore } from '@/entities/user';
import {
	Accordion,
	AccordionControl,
	AccordionItem,
	AccordionPanel,
	Box,
	LoadingOverlay,
} from '@mantine/core';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

export const TasksPage = () => {
	const adminId = useAtomValue(adminStore);
	const user = useAtomValue(userStore);
	const { data: tasks, isFetched } = useGetTasks(adminId as string, {
		enabled: !!adminId,
	});

	const tasksByProject = useMemo(() => {
		if (tasks?.length) {
			return tasks
				.filter(task => task.employeeId === user?.id)
				.reduce(
					(acc, task) => {
						const projectName = task.project?.name;
						if (!acc[projectName as string]) {
							acc[projectName as string] = [];
						}
						acc[projectName as string].push(task);
						return acc;
					},
					{} as Record<string, Task[]>
				);
		} else {
			return {};
		}
	}, [tasks]);

	const defaultValue = useMemo(() => {
		if (Object.keys(tasksByProject).length !== 0) {
			return Object.entries(tasksByProject)[0][0];
		}
		return null;
	}, [tasksByProject]);

	return (
		<Box pos='relative' mih='100vh'>
			<LoadingOverlay
				visible={!isFetched}
				zIndex={1000}
				overlayProps={{ radius: 'sm', blur: 2 }}
			/>
			{Object.keys(tasksByProject).length === 0 && isFetched && (
				<p>Задач нет, отдыхай :)</p>
			)}
			<div className='space-y-6 '>
				{isFetched && Object.keys(tasksByProject).length > 0 && (
					<div className='overflow-x-auto'>
						<div className='grid grid-cols-7 gap-1 min-w-[900px] px-2'>
							<p className='ml-4'># Номер</p>
							<p className='ml-2'>Проект</p>
							<p>Тип задачи</p>
							<p className='ml-3'>Статус</p>
							<p>Тема</p>
							<p className='-ml-4 w-[80px]'>Затраченное время</p>
							<p className='-ml-4 w-[80px]'>Запланированное время</p>
						</div>
						<Accordion
							classNames={{
								content: 'flex flex-col min-w-[900px]',
								item: 'min-w-[900px]',
							}}
							defaultValue={defaultValue}
						>
							{Object.entries(tasksByProject || {}).map(
								([projectName, projectTasks]) => (
									<AccordionItem key={projectName} value={projectName}>
										<AccordionControl>
											<h2 className='text-xl font-bold '>{projectName}</h2>
										</AccordionControl>
										<AccordionPanel className=''>
											{projectTasks.map((task, index) => (
												<>
													<TaskCard
														task={task}
														index={index}
														key={`${task.id}-${task?.project?.name}`}
													/>
													<TaskCard
														index={index + 1}
														task={task}
														key={`${task.id}-${task?.project?.name}`}
													/>
												</>
											))}
										</AccordionPanel>
									</AccordionItem>
								)
							)}
						</Accordion>
					</div>
				)}
			</div>
		</Box>
	);
};
