import {roleStore, userStore} from '@/entities/user';
import { Button, ButtonGroup } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';
import { getNextStatus, getTextByStatus } from '../../lib';
import { Task, useUpdateTaskEmployee, useUpdateTaskStatus } from '../../model';
import { ReassignTaskModal } from '../reassign-task-modal/reassign-task-modal';

export function TaskHeader({
	taskData,
	refetch,
}: {
	taskData: Task;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<Task, Error>>;
}) {
	const user = useAtomValue(userStore);
	const params = useParams();
	const taskId = params.slug;

	const role = useAtomValue(roleStore);

	const { mutateAsync: updateTaskStatus, isPending: isPendingStatus } =
		useUpdateTaskStatus(taskId as string);
	const { mutateAsync: updateTaskEmployee, isPending } = useUpdateTaskEmployee(
		taskId as string
	);

	const [opened, { open, close }] = useDisclosure(false);

	console.log(taskData.status !== 'DONE' && !role?.canEditTask)
	if (!taskData) return <>task undefined</>;
	return (
		<div className='bg-gray-700 border-b border-gray-400 shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 py-4'>
				<h1 className='text-2xl font-bold text-white'>
					#{taskData.id} {taskData.title}
				</h1>
				<div className='flex gap-2 text-sm text-white'>
					<span>
						Создана от {new Date(taskData.createdAt).toLocaleDateString()}
					</span>
					<span>Создал {taskData?.createdBy?.name || ''}</span>
				</div>
				<ButtonGroup className='mt-2'>
					<Button
						variant='default'
						loading={isPendingStatus}
						onClick={async () => {
							await updateTaskStatus({
								data: {
									status: getNextStatus(taskData.status),
								},
							});
							await refetch();
						}}
						disabled={taskData.employeeId !== user?.id}
					>
						{getTextByStatus(taskData.status)}
					</Button>
					<Button
						variant='default'
						onClick={open}
						disabled={taskData.status !== 'DONE' && !role?.canEditTask}
					>
						Перевести задачу
					</Button>
				</ButtonGroup>
			</div>
			<ReassignTaskModal
				close={close}
				opened={opened}
				mutateAsync={updateTaskEmployee}
				taskData={taskData}
				isLoading={isPending}
				refetch={refetch}
			/>
		</div>
	);
}
