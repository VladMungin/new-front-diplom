import { useGetSpecialization, useGetTypeOfTasks } from '@/entities/company';
import { useGetEmployees } from '@/entities/employee';
import { adminStore } from '@/entities/user';
import { Button, Modal, Select } from '@mantine/core';
import {
	QueryObserverResult,
	RefetchOptions,
	UseMutateAsyncFunction,
} from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Controller, Form, SubmitHandler, useForm } from 'react-hook-form';
import { Task } from '../../model';

interface ReassignTaskModalProps {
	opened: boolean;
	close: () => void;
	mutateAsync: UseMutateAsyncFunction<Task, Error, Task, unknown>;
	taskData: Task;
	isLoading: boolean;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<Task, Error>>;
}

export const ReassignTaskModal = ({
	opened,
	close,
	mutateAsync,
	taskData,
	isLoading,
	refetch,
}: ReassignTaskModalProps) => {
	const { control, handleSubmit } = useForm<{
		employeeId: string;
		type: string;
		specialization: string;
	}>();
	const adminId = useAtomValue(adminStore);

	const { data: employees } = useGetEmployees(adminId || '', {
		enabled: !!adminId,
	});

	const { data: specializations } = useGetSpecialization(adminId || '', {
		enabled: !!adminId,
	});

	const { data: typeOfTasks } = useGetTypeOfTasks(adminId || '', {
		enabled: !!adminId,
	});

	const employeesForSelect = employees?.map(employee => ({
		value: employee.id,
		label: employee.fullName,
	}));

	const specializationsForSelect = specializations?.map(specialization => ({
		value: specialization.id as string,
		label: specialization.name,
	}));

	const typeOfTasksForSelect = typeOfTasks?.map(type => ({
		value: type.id as string,
		label: type.name,
	}));

	const onSubmit: SubmitHandler<{
		employeeId: string;
		type: string;
		specialization: string;
	}> = async data => {
		console.log(data);
		await mutateAsync({
			...taskData,
			specializationId: data.specialization,
			employeeId: data.employeeId,
			typeOfTaskId: data.type,
			status: 'PENDING',
		});
		refetch();
	};

	return (
		<Modal opened={opened} onClose={close} title='Перевод задачи' centered>
			<Form control={control} className='min-h-[12vh] flex flex-col gap-5'>
				<Controller
					name='employeeId'
					control={control}
					render={({ field }) => {
						return (
							<Select {...field} data={employeesForSelect} label='Сотрудник' />
						);
					}}
				/>
				<Controller
					name='specialization'
					control={control}
					render={({ field }) => {
						return (
							<Select
								{...field}
								data={specializationsForSelect}
								label='Специализация'
							/>
						);
					}}
				/>
				<Controller
					name='type'
					control={control}
					render={({ field }) => {
						return (
							<Select
								{...field}
								data={typeOfTasksForSelect}
								label='Тип задачи'
							/>
						);
					}}
				/>
				<Button
					className='mt-auto'
					fullWidth
					color='green'
					onClick={() => {
						handleSubmit(onSubmit)();
					}}
					loading={isLoading}
				>
					Сохранить
				</Button>
			</Form>
		</Modal>
	);
};
