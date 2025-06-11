import { Kbd } from '@mantine/core';
import cn from 'classnames';
import Link from 'next/link';
import { Task, TASK_STATUS } from '../../model';
interface TaskCardProps {
	task: Task;
	index: number;
	needWorker?: boolean;
}

export const TaskCard = ({
	task,
	index,
	needWorker = false,
}: TaskCardProps) => {
	const formatHoursMinutes = (milliseconds: number) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const totalMinutes = Math.floor(totalSeconds / 60);
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	};

	return (
		<div
			className={cn('grid grid-cols-7 gap-4 items-center p-2', {
				'bg-[var(--mantine-color-dark-6)]': index % 2 === 0,
			})}
		>
			<Kbd className='max-w-max'>
				<Link href={`/tasks/task/${task?.id}`}># {task.id}</Link>
			</Kbd>
			{task.project?.name && (
				<Link className='underline' href={`/project?id=${task.projectId}`}>
					{task.project?.name}
				</Link>
			)}
			<p>{task.type.name}</p>
			<p>{TASK_STATUS[task?.status as unknown as keyof typeof TASK_STATUS]}</p>
			<p>{task.title}</p>
			<p>{formatHoursMinutes(task.currentTime)}</p>
			<p>{formatHoursMinutes(task.timeToCompleat)}</p>
			{needWorker && (
				<Link
					className='underline text-(--mantine-color-blue-2)'
					href={`/user/${task.employee?.id}`}
				>
					{task.employee?.fullName}
				</Link>
			)}
		</div>
		// <Card
		// 	shadow='sm'
		// 	radius='md'
		// 	withBorder
		// 	padding={0}
		// 	className='max-w-[380px]'
		// 	component='a'
		// 	href={`/tasks/task/${task?.id}`}
		// >
		// 	<CardSection withBorder className='!flex !flex-col !items-center !py-1'>
		// 		<h3 className='text-2xl font-bold'>{task?.title}</h3>
		// 		<p className='mt-2'>{task?.type?.name}</p>
		// 	</CardSection>
		// 	<p className='mx-2 pt-2'>{task?.description}</p>
		// 	<div className='flex justify-between mt-3 mx-2'>
		// 		<p>
		// 			Исполнитель:{' '}
		// 			<span className='font-bold'>{task?.employee?.fullName}</span>
		// 		</p>
		// 		<p>
		// 			Время:{' '}
		// 			<span className='font-bold'>
		// 				{dayjs(task?.timeToCompleat).format('HH:MM')}
		// 			</span>
		// 		</p>
		// 	</div>
		// 	<CardSection
		// 		withBorder
		// 		className='!flex !justify-between !mt-auto !py-3 !px-2'
		// 	>
		// 		<p>
		// 			Статус:{' '}
		// 			<span className='font-bold'>
		// 				{TASK_STATUS[task?.status as unknown as keyof typeof TASK_STATUS]}
		// 			</span>
		// 		</p>
		// 		<p>
		// 			Номер: <span className='font-bold'>{task?.id}</span>
		// 		</p>
		// 	</CardSection>
		// </Card>
	);
};
