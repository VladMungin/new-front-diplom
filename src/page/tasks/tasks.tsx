import { Task, TaskCard } from '@/entities/task';
import {
	Accordion,
	AccordionControl,
	AccordionItem,
	AccordionPanel,
} from '@mantine/core';

export const TasksPage = () => {
	const tasks: Task[] = [
		{
			createdAt: new Date(Date.now()),
			currentTime: 500,
			id: 120,
			status: 'В работе',
			title: 'Сделать карточку',
			description: 'Придумать дизайн, сверстать, адаптировать',
			employeeId: '',
			projectId: '',
			timeToCompleat: 60000,
			typeOfTaskId: '',
			specializationId: '',
			employee: {
				fullName: 'Иван И. И.',
			},
			project: {
				name: 'ТМК',
			},
			specialization: undefined,
			type: {
				name: 'Разработка',
			},
		},
		{
			createdAt: new Date(Date.now()),
			currentTime: 500,
			id: 120,
			status: 'В работе',
			title: 'Сделать карточку',
			description: 'Придумать дизайн, сверстать, адаптировать',
			employeeId: '',
			projectId: '',
			timeToCompleat: 60000,
			typeOfTaskId: '',
			specializationId: '',
			employee: {
				fullName: 'Иван И. И.',
			},
			project: {
				name: 'Донбилет',
			},
			specialization: undefined,
			type: {
				name: 'Разработка',
			},
		},
		{
			createdAt: new Date(Date.now()),
			currentTime: 500,
			id: 120,
			status: 'В работе',
			title: 'Сделать карточку',
			description: 'Придумать дизайн, сверстать, адаптировать',
			employeeId: '',
			projectId: '',
			timeToCompleat: 60000,
			typeOfTaskId: '',
			specializationId: '',
			employee: {
				fullName: 'Иван И. И.',
			},
			project: {
				name: 'Донбилет',
			},
			specialization: undefined,
			type: {
				name: 'Разработка',
			},
		},
		{
			createdAt: new Date(Date.now()),
			currentTime: 500,
			id: 120,
			status: 'В работе',
			title: 'Сделать карточку',
			description: 'Придумать дизайн, сверстать, адаптировать',
			employeeId: '',
			projectId: '',
			timeToCompleat: 60000,
			typeOfTaskId: '',
			specializationId: '',
			employee: {
				fullName: 'Иван И. И.',
			},
			project: {
				name: 'Анткар',
			},
			specialization: undefined,
			type: {
				name: 'Разработка',
			},
		},
		{
			createdAt: new Date(Date.now()),
			currentTime: 500,
			id: 120,
			status: 'В работе',
			title: 'Сделать карточку',
			description: 'Придумать дизайн, сверстать, адаптировать',
			employeeId: '',
			projectId: '',
			timeToCompleat: 60000,
			typeOfTaskId: '',
			specializationId: '',
			employee: {
				fullName: 'Иван И. И.',
			},
			project: {
				name: 'Донбилет',
			},
			specialization: undefined,
			type: {
				name: 'Разработка',
			},
		},
		{
			createdAt: new Date(Date.now()),
			currentTime: 500,
			id: 120,
			status: 'В работе',
			title: 'Сделать карточку',
			description: 'Придумать дизайн, сверстать, адаптировать',
			employeeId: '',
			projectId: '',
			timeToCompleat: 60000,
			typeOfTaskId: '',
			specializationId: '',
			employee: {
				fullName: 'Иван И. И.',
			},
			project: {
				name: 'Донбилет',
			},
			specialization: undefined,
			type: {
				name: 'Разработка',
			},
		},
		{
			createdAt: new Date(Date.now()),
			currentTime: 500,
			id: 120,
			status: 'В работе',
			title: 'Сделать карточку',
			description: 'Придумать дизайн, сверстать, адаптировать',
			employeeId: '',
			projectId: '',
			timeToCompleat: 60000,
			typeOfTaskId: '',
			specializationId: '',
			employee: {
				fullName: 'Иван И. И.',
			},
			project: {
				name: 'Донбилет',
			},
			specialization: undefined,
			type: {
				name: 'Разработка',
			},
		},
		{
			createdAt: new Date(Date.now()),
			currentTime: 500,
			id: 120,
			status: 'В работе',
			title: 'Сделать карточку',
			description: 'Придумать дизайн, сверстать, адаптировать',
			employeeId: '',
			projectId: '',
			timeToCompleat: 60000,
			typeOfTaskId: '',
			specializationId: '',
			employee: {
				fullName: 'Иван И. И.',
			},
			project: {
				name: 'Донбилет',
			},
			specialization: undefined,
			type: {
				name: 'Разработка',
			},
		},
	];

	const tasksByProject = tasks.reduce(
		(acc, task) => {
			const projectName = task.project.name;
			if (!acc[projectName]) {
				acc[projectName] = [];
			}
			acc[projectName].push(task);
			return acc;
		},
		{} as Record<string, Task[]>
	);

	return (
		<div className='space-y-6'>
			<Accordion
				classNames={{
					content:
						'!grid sm:!grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 !gap-5',
				}}
			>
				{Object.entries(tasksByProject).map(([projectName, projectTasks]) => (
					<AccordionItem key={projectName} value={projectName}>
						<AccordionControl>
							<h2 className='text-xl font-bold '>{projectName}</h2>
						</AccordionControl>
						<AccordionPanel className=''>
							{projectTasks.map(task => (
								<TaskCard task={task} key={`${task.id}-${task.project.name}`} />
							))}
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};
