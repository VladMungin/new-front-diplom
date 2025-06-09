'use client';

import { useGetProjectById } from '@/entities/project';
import { TaskCard } from '@/entities/task';
import { useSearchParams } from 'next/navigation';

export const ProjectTasksPage = () => {
	const searchParams = useSearchParams();

	const projectId = searchParams.get('projectId');

	const { data } = useGetProjectById(projectId as string);

	return (
		<div className='overflow-x-auto'>
			<div className='grid grid-cols-7 gap-1 px-2 min-w-[900px]'>
				<p className=''># Номер</p>
				<p>Тип задачи</p>
				<p className='ml-3'>Статус</p>
				<p>Тема</p>
				<p className='w-[80px]'>Затраченное время</p>
				<p className='w-[80px]'>Запланированное время</p>
				<p className='ml-4 w-[80px]'>Исполнитель</p>
			</div>
			<div className='min-w-[900px]'>
				{data?.tasks.map((task, index) => (
					<TaskCard
						index={index}
						task={{
							...task,
							employee: data.employees.find(
								employee => task.employeeId === employee.id
							),
						}}
						needWorker
						key={task.id}
					/>
				))}
			</div>
		</div>
	);
};
