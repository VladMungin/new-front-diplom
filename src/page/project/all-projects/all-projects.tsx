'use client';

import { ProjectCard, useGetProjects } from '@/entities/project';
import { adminStore } from '@/entities/user';
import { Box, LoadingOverlay } from '@mantine/core';
import { useAtomValue } from 'jotai';

export const AllProjectsPage = () => {
	// const user = useAtomValue(userStore);
	const adminId = useAtomValue(adminStore);
	const { data: projects, isLoading } = useGetProjects(adminId || '', {
		enabled: !!adminId,
	});

	console.log(projects);

	return (
		<Box pos='relative' mih='80vh'>
			<LoadingOverlay
				visible={isLoading}
				zIndex={1000}
				overlayProps={{ radius: 'sm', blur: 2 }}
			/>
			<div className='!grid sm:!grid-cols-1 md:!grid-cols-3 lg:!grid-cols-4 !gap-5'>
				{projects?.map(project => (
					<ProjectCard project={project} key={project?.id} />
				))}
			</div>
		</Box>
	);
};
