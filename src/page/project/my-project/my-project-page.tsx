'use client';
import { useGetEmployeeById } from '@/entities/employee';
import { ProjectCard } from '@/entities/project';
import { adminStore, userStore } from '@/entities/user';
import { useAtomValue } from 'jotai';

export const MyProjectPage = () => {
	const user = useAtomValue(userStore);
	const adminId = useAtomValue(adminStore);

	const { data: userData } = useGetEmployeeById(user?.id || '', {
		enabled: !!user?.id,
	});

	console.log(userData);

	return (
		<div className=''>
			{userData?.projects.map(project => {
				return <ProjectCard project={project} key={project.id} />;
			})}
		</div>
	);
};
