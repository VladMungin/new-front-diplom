import { Button, Title } from '@mantine/core';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Task, useUpdateTaskTime } from '../../model';

export const TaskTimer = ({
	taskData,
	refetch,
}: {
	taskData: Task;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<Task, Error>>;
}) => {
	const formatTime = (time: number) => {
		return time.toString().padStart(2, '0');
	};

	const {
		seconds,
		minutes,
		hours,
		isRunning,
		start,
		pause,
		totalMilliseconds,
	} = useStopwatch({ autoStart: false, interval: 20 });

	const { mutateAsync: updateTaskTime } = useUpdateTaskTime(taskData.id + '');

	useEffect(() => {
		if (minutes && minutes % 15 === 0 && taskData) {
			updateTaskTime({
				data: { currentTime: totalMilliseconds + taskData.currentTime },
			});
		}
	}, [minutes]);

	return (
		<>
			{taskData.status === 'IN_WORK' && (
				<div className=' flex flex-col items-center bg-gray-700 border-y border-gray-400 shadow-sm py-2'>
					<h1>Таймер</h1>
					<div style={{ fontSize: '100px' }}>
						<span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:
						<span>{formatTime(seconds)}</span>
					</div>
					<Button
						variant='filled'
						onClick={() => {
							if (isRunning) {
								pause();
								updateTaskTime(
									{
										data: {
											currentTime: totalMilliseconds + taskData.currentTime,
										},
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
			)}
		</>
	);
};
