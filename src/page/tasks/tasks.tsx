'use client';

import { Task, TaskCard, useGetTasks } from '@/entities/task';
import { userStore } from '@/entities/user';
import {
	Accordion,
	AccordionControl,
	AccordionItem,
	AccordionPanel,
} from '@mantine/core';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

export const TasksPage = () => {
	const user = useAtomValue(userStore);
	const { data: tasks } = useGetTasks(user?.id as string, {
		enabled: !!user?.id,
	});

	const tasksByProject = useMemo(() => {
		if (tasks?.length) {
			return tasks.reduce(
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
			return null;
		}
	}, [tasks]);

	return (
		<div className='space-y-6'>
			<Accordion
				classNames={{
					content:
						'!grid sm:!grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 !gap-5',
				}}
			>
				{Object.entries(tasksByProject || {}).map(
					([projectName, projectTasks]) => (
						<AccordionItem key={projectName} value={projectName}>
							<AccordionControl>
								<h2 className='text-xl font-bold '>{projectName}</h2>
							</AccordionControl>
							<AccordionPanel className=''>
								{projectTasks.map(task => (
									<TaskCard
										task={task}
										key={`${task.id}-${task?.project?.name}`}
									/>
								))}
							</AccordionPanel>
						</AccordionItem>
					)
				)}
			</Accordion>
		</div>
	);
};
