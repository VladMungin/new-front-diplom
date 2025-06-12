import { Task, TASK_STATUS } from '../../model';

export const TaskDescription = ({ taskData }: { taskData: Task }) => {
	const formatHoursMinutes = (milliseconds: number) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const totalMinutes = Math.floor(totalSeconds / 60);
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} часа`;
	};

	const timeToCompleatFormatted = formatHoursMinutes(taskData.timeToCompleat);
	const currentTimeFormatted = formatHoursMinutes(taskData.currentTime);

	return (
		<div className='bg-gray-700 border-x-0 border-y border-gray-400 shadow-sm p-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<h2 className='text-lg font-semibold text-white border-b  pb-2 mb-4'>
						О задаче
					</h2>
					<div className='space-y-3 text-sm text-white'>
						<div className='flex'>
							<span className='font-medium w-1/3'>Исполнитель:</span>
							<span>{taskData.employee?.fullName}</span>
						</div>
						<div className='flex'>
							<span className='font-medium w-1/3'>Статус:</span>
							<span>
								{TASK_STATUS[
									taskData?.status as unknown as keyof typeof TASK_STATUS
								] || 'N/A'}
							</span>
						</div>
						<div className='flex'>
							<span className='font-medium w-1/3'>Проект:</span>
							<span>{taskData.project?.name || 'N/A'}</span>
						</div>
						<div className='flex'>
							<span className='font-medium w-1/3'>Тип:</span>
							<span>{taskData.type?.name}</span>
						</div>
						<div className='flex'>
							<span className='font-medium w-1/3'>Специализация:</span>
							<span>{taskData.specialization?.name || 'N/A'}</span>
						</div>
						<div className='flex'>
							<span className='font-medium w-1/3'>Время на выполнение:</span>
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
	);
};
