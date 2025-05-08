'use client';

import { ProjectCard, useGetProjects } from '@/entities/project';
import { userStore } from '@/entities/user';
import { useAtomValue } from 'jotai';

export const AllProjectsPage = () => {
	const user = useAtomValue(userStore);
	const { data: projects } = useGetProjects(user?.id || '');

	console.log(projects);

	return (
		<div className='!grid sm:!grid-cols-1 md:!grid-cols-3 lg:!grid-cols-4 !gap-5'>
			{projects?.map(project => (
				<ProjectCard project={project} key={project?.id} />
			))}
		</div>
	);
};
