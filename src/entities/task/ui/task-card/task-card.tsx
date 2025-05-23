import { Card, CardSection } from '@mantine/core';
import dayjs from 'dayjs';
import { Task, TASK_STATUS } from '../../model';
interface TaskCardProps {
	task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
	return (
		<Card
			shadow='sm'
			radius='md'
			withBorder
			padding={0}
			className='max-w-[380px]'
			component='a'
			href={`/tasks/task/${task?.id}`}
		>
			<CardSection withBorder className='!flex !flex-col !items-center !py-1'>
				<h3 className='text-2xl font-bold'>{task?.title}</h3>
				<p className='mt-2'>{task?.type?.name}</p>
			</CardSection>
			<p className='mx-2 pt-2'>{task?.description}</p>
			<div className='flex justify-between mt-3 mx-2'>
				<p>
					Исполнитель:{' '}
					<span className='font-bold'>{task?.employee?.fullName}</span>
				</p>
				<p>
					Время:{' '}
					<span className='font-bold'>
						{dayjs(task?.timeToCompleat).format('HH:MM')}
					</span>
				</p>
			</div>
			<CardSection
				withBorder
				className='!flex !justify-between !mt-auto !py-3 !px-2'
			>
				<p>
					Статус:{' '}
					<span className='font-bold'>
						{TASK_STATUS[task?.status as unknown as keyof typeof TASK_STATUS]}
					</span>
				</p>
				<p>
					Номер: <span className='font-bold'>{task?.id}</span>
				</p>
			</CardSection>
		</Card>
	);
};
