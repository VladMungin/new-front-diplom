'use client';
import { useGetEmployeeById } from '@/entities/employee';
import { Button, ButtonGroup } from '@mantine/core';
import { useParams } from 'next/navigation';
import {TaskLog, useGetTaskLogAll} from "@/entities/task";
import {useEffect, useState} from "react";
import {formatMillisecondsToHHMM, groupAndSortByMonth} from "@/shared/lib";


export const UserPage = () => {
	const params = useParams();
	const employeeId = params.slug;

	const { data: userData } = useGetEmployeeById(employeeId as string);

	const {data} = useGetTaskLogAll()

	const [taskLog, setTaskLog] = useState<Record<string, TaskLog[]> | null>(null)

	useEffect(() => {
		if(data?.length){
			setTaskLog(groupAndSortByMonth(data.filter((item) => item.action === 'change_time' && item.employee.id === employeeId) as TaskLog[]))
		}
	}, [data]);

	return (
		<div className='min-h-screen bg-gray-800 font-sans'>
			<div className='bg-gray-700 border-b border-gray-400 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 py-4'>
					<h1 className='text-2xl font-bold text-white'>
						Сотрудник: {userData?.fullName}
					</h1>
					<h3>{userData?.specialization.name}</h3>
				</div>
			</div>
			<div className='max-w-7xl mx-auto  py-6'>
				<div className='bg-gray-700 border-x-0 border-y border-gray-400 shadow-sm p-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className=''>
							<h2 className='text-lg font-semibold text-white border-b  pb-2 mb-4'>
								Информация о сотруднике
							</h2>
							<div className='flex flex-col gap-y-2'>
								<p>
									<span className='font-bold'>Телефон:</span> {userData?.phone}
								</p>
								<p>
									<span className='font-bold'>Почта:</span> {userData?.email}
								</p>
								<p>
									<span className='font-bold'>Специальность:</span>{' '}
									{userData?.specialization.name}
								</p>
								<p>
									<span className='font-bold'>Роль:</span> {userData?.role.name}
								</p>
							</div>
						</div>
						<div className=''>
							<h2 className='text-lg font-semibold text-white border-b  pb-2 mb-4'>
								Получение статистике по сотруднику
							</h2>
							
							{Object.entries(taskLog || {}).map(([key, value]) => {
								return (
									<div key={key}>
										<h3 className='text-lg font-semibold text-white border-b  pb-2 mb-4'>
											{key} {formatMillisecondsToHHMM(value.reduce((acc, item) => {
												console.log(item)
												return acc+=item.hoursWorked
										}, 0))}
										</h3>

									</div>)
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
