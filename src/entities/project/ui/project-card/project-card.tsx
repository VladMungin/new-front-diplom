import { Card, CardSection } from '@mantine/core';
import { Project } from '../../model';

export const ProjectCard = ({ project }: { project: Project }) => {
	return (
		<Card
			shadow='sm'
			radius='md'
			withBorder
			padding={0}
			className='max-w-[380px] min-h-52'
			component='a'
			href={`/project?id=${project.id}`}
		>
			<CardSection withBorder className='!flex !flex-col !items-center !py-1'>
				<h3 className='text-2xl font-bold text-center'>{project.name}</h3>
			</CardSection>
			<p className='mx-4 py-2 hyphens-manual'>{project.description}</p>
		</Card>
	);
};
