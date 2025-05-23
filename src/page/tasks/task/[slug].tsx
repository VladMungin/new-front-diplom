'use client';

import {
	getTextByStatus,
	useGetTaskById,
	useUpdateTask,
} from '@/entities/task';
import { Button, ButtonGroup, Title } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

export const TaskPage = () => {
	const params = useParams();
	const taskId = params.slug;
	const { data: taskData, refetch } = useGetTaskById(taskId as string, {
		enabled: !!taskId,
	});

	const {
		seconds,
		minutes,
		hours,
		isRunning,
		start,
		pause,
		totalMilliseconds,
	} = useStopwatch({ autoStart: false, interval: 20 });

	const { mutateAsync } = useUpdateTask();

	useEffect(() => {
		if (minutes && minutes % 15 === 0 && taskData) {
			mutateAsync({
				...taskData,
				currentTime: totalMilliseconds + taskData.currentTime,
			});
		}
	}, [minutes]);

	if (!taskData) {
		return <div>Задача не найдена</div>;
	}

	// Функция для преобразования миллисекунд в формат HH:MM
	const formatHoursMinutes = (milliseconds: number) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const totalMinutes = Math.floor(totalSeconds / 60);
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} часа`;
	};

	const timeToCompleatFormatted = formatHoursMinutes(taskData.timeToCompleat);
	const currentTimeFormatted = formatHoursMinutes(taskData.currentTime);

	// Форматируем время в 00:00:00
	const formatTime = (time: number) => {
		return time.toString().padStart(2, '0');
	};

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
					<ButtonGroup className='mt-2'>
						<Button variant='default'>
							{getTextByStatus(taskData.status)}
						</Button>
						<Button variant='default'>Перевести задачу</Button>
					</ButtonGroup>
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
									<span>{timeToCompleatFormatted}</span>
								</div>
								<div className='flex'>
									<span className='font-medium w-1/3'>Затраченное время:</span>
									<span>{currentTimeFormatted}</span>
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
				{taskData.status === 'IN_WORK' ||
					(true && (
						<div className='mt-5 flex flex-col items-center bg-gray-700 border-y border-gray-400 shadow-sm py-2'>
							<h1>Таймер</h1>
							<div style={{ fontSize: '100px' }}>
								<span>{formatTime(hours)}</span>:
								<span>{formatTime(minutes)}</span>:
								<span>{formatTime(seconds)}</span>
							</div>
							<Button
								variant='filled'
								onClick={() => {
									if (isRunning) {
										pause();
										mutateAsync(
											{
												...taskData,
												currentTime: totalMilliseconds + taskData.currentTime,
											},
											{
												onSuccess: () => {
													refetch();
												},
											}
										);
									} else start();
								}}
								className='duration-300 !rounded-3xl'
								size='lg'
							>
								<Title order={3} className='!my-5'>
									{isRunning ? 'Пауза' : 'Начать'}
								</Title>
							</Button>
						</div>
					))}
			</div>
		</div>
	);
};
