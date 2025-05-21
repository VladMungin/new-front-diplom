'use client';

import { useGetTaskById } from '@/entities/task';
import { useParams } from 'next/navigation';

export const TaskPage = () => {
	const params = useParams();
	const taskId = params.slug;
	const { data: taskData } = useGetTaskById(taskId as string, {
		enabled: !!taskId,
	});
	if (!taskData?.id) {
		return <div>Задача не найдена</div>;
	}

	const timeToCompleat = taskData.timeToCompleat / 1000 / 60 / 60;
	const currentTime = taskData.currentTime || 0 / 1000 / 60 / 60;

	return (
		<div className='min-h-screen bg-gray-800 font-sans'>
			<div className='bg-gray-700 border-b border-gray-400 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 py-4'>
					<h1 className='text-2xl font-bold text-white'>
						#{taskData.id} {taskData.title}
					</h1>
					<div className='text-sm text-white'>
						<span>
							Создана от {new Date(taskData.createdAt).toLocaleDateString()}
						</span>
					</div>
				</div>
			</div>
			<div className='max-w-7xl mx-auto  py-6'>
				<div className='bg-gray-700 border-x-0 border-y border-gray-400 shadow-sm p-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<h2 className='text-lg font-semibold text-white border-b  pb-2 mb-4'>
								О задаче
							</h2>
							<div className='space-y-3 text-sm text-white'>
								<div className='flex'>
									<span className='font-medium w-1/3'>Статус:</span>
									<span>{taskData.status || 'N/A'}</span>
								</div>
								<div className='flex'>
									<span className='font-medium w-1/3'>Проект:</span>
									<span>{taskData.project?.name || 'N/A'}</span>
								</div>
								<div className='flex'>
									<span className='font-medium w-1/3'>Тип:</span>
									<span>{taskData.type.name}</span>
								</div>
								<div className='flex'>
									<span className='font-medium w-1/3'>Специализация:</span>
									<span>{taskData.specialization?.name || 'N/A'}</span>
								</div>
								<div className='flex'>
									<span className='font-medium w-1/3'>
										Время на выполнение:
									</span>
									<span>{timeToCompleat} часа</span>
								</div>
								<div className='flex'>
									<span className='font-medium w-1/3'>Затраченное время:</span>
									<span>{currentTime} часа</span>
								</div>
							</div>
						</div>
						<div>
							<h2 className='text-lg font-semibold text-white border-b border-gray-400 pb-2 mb-4'>
								Описание
							</h2>
							<div className='text-sm text-white whitespace-pre-wrap'>
								{taskData.description || 'No description provided.'}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
