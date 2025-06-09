'use client';

import { useGetProjectById } from '@/entities/project';
import { TaskCard } from '@/entities/task';
import { useSearchParams } from 'next/navigation';

export const ProjectTasksPage = () => {
	const searchParams = useSearchParams();

	const projectId = searchParams.get('projectId');

	const { data } = useGetProjectById(projectId as string);

	return (
		<div className='grid grid-cols-3 gap-5'>
			{data?.tasks.map(task => <TaskCard task={task} key={task.id} />)}
		</div>
	);
};
