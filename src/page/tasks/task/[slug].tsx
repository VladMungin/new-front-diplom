'use client';

import {
	TaskDescription,
	TaskHeader,
	TaskLogBlock,
	TaskTimer,
	useGetTaskById,
} from '@/entities/task';
import { Box, LoadingOverlay } from '@mantine/core';
import { useParams } from 'next/navigation';

export const TaskPage = () => {
	const params = useParams();
	const taskId = params.slug;
	const {
		data: taskData,
		refetch,
		isFetched,
	} = useGetTaskById(taskId as string, {
		enabled: !!taskId,
	});

	if (!taskData && isFetched) {
		return <div>Задача не найдена</div>;
	}

	if (!isFetched) {
		return (
			<Box pos='relative' mih='100vh'>
				<LoadingOverlay
					visible={!isFetched}
					zIndex={1000}
					overlayProps={{ radius: 'sm', blur: 2 }}
				/>
			</Box>
		);
	}

	if (!!taskData) {
		return (
			<>
				<div className='min-h-screen bg-gray-800 font-sans'>
					<TaskHeader taskData={taskData} refetch={refetch} />
					<div className='max-w-7xl mx-auto flex flex-col gap-10 py-6'>
						<TaskDescription taskData={taskData} />
						<TaskTimer taskData={taskData} refetch={refetch} />
						<TaskLogBlock taskLogs={taskData.taskLogs || []} />
					</div>
				</div>
			</>
		);
	}
};
