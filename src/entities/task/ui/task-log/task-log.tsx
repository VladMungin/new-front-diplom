import type { TaskLog } from '../../model';
import { TASK_ACTION } from '../../model';

export function TaskLog({ taskLogs }: { taskLogs: TaskLog[] }) {
	const formatHoursMinutes = (milliseconds: number) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const totalMinutes = Math.floor(totalSeconds / 60);
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} часа`;
	};
	if (taskLogs.length === 0)
		return (
			<div className='bg-gray-700 border-x-0 border-y border-gray-400 shadow-sm p-6'>
				TASK LOG ПУСТ
			</div>
		);

	const sortTaskLogs = taskLogs.sort(
		(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
	);

	const getLogText = (taskLog: TaskLog) => {
		switch (taskLog.action) {
			case TASK_ACTION.CREATE:
				return `Задача была создана на ${taskLog.employee.fullName}`;
			case TASK_ACTION.CHANGE_TIME:
				return `Время выполнения задачи было обновлено на ${formatHoursMinutes(taskLog.hoursWorked || 0)}`;
			case TASK_ACTION.CHANGE_STATUS:
				return `Был обновлен статус задачи`;
			case TASK_ACTION.CHANGE_EMPLOYEE:
				return `Был назначен сотрудник ${taskLog.employee.fullName}`;
			case TASK_ACTION.DELETE:
				return `Задача удалена`;
			default:
				return 'not';
		}
	};
	console.log(sortTaskLogs);
	return (
		<div className='bg-gray-700 border-x-0 border-y border-gray-400 shadow-sm p-6'>
			<div className='grid grid-cols-1 gap-2 text-lg'>
				{taskLogs.map((taskLog, index) => (
					<div key={index}>
						<h2 className='text-lg font-semibold text-white border-b  pb-2 mb-4'>
							<div className='grid grid-cols-1'>
								<p>{getLogText(taskLog)}</p>
								<p></p>
							</div>
						</h2>
					</div>
				))}
			</div>
		</div>
	);
}
