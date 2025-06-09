'use client';

import { useGetSpecialization, useGetTypeOfTasks } from '@/entities/company';
import { useGetEmployees, useGetNotBusyEmployee } from '@/entities/employee';
import { useGetProjects } from '@/entities/project';
import { Task, useCreateTask } from '@/entities/task';
import { adminStore, userStore } from '@/entities/user';
import { timeToMilliseconds } from '@/shared/lib';
import {
	Box,
	Button,
	Card,
	Checkbox,
	CheckIcon,
	Input,
	LoadingOverlay,
	Notification,
	Select,
	Textarea,
	Tooltip,
} from '@mantine/core';
import { TimePicker } from '@mantine/dates';
import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, Form, SubmitHandler, useForm } from 'react-hook-form';

interface CreateTask extends Partial<Task> {
	'should-get-not-busy-employee'?: boolean;
}

export const CreateTask = () => {
	const user = useAtomValue(userStore);
	const adminId = useAtomValue(adminStore);
	const searchParams = useSearchParams();
	const { control, handleSubmit, watch, setValue, reset } = useForm<CreateTask>(
		{
			defaultValues: {
				title: '',
				description: '',
				projectId: undefined,
				specializationId: undefined,
				typeOfTaskId: undefined,
				timeToCompleat: 0,
				employeeId: undefined,
				'should-get-not-busy-employee': false,
			},
		}
	);
	const projectId = searchParams.get('projectId');

	const watchProjectId = watch('projectId');

	const [showNotify, setShowNotify] = useState(false);

	const { mutateAsync: createTask, isPending } = useCreateTask();

	const checkIcon = <CheckIcon size={15} />;

	const specializationId = watch('specializationId');

	const { data: specializations, isLoading: isLoadingSpecialization } =
		useGetSpecialization(adminId as string, {
			enabled: !!adminId,
		});

	const { data: typeOfTasks, isLoading: isLoadingTypeOfTask } =
		useGetTypeOfTasks(adminId as string, {
			enabled: !!adminId,
		});

	const { data: employees, isLoading: isLoadingEmployees } = useGetEmployees(
		adminId as string,
		{
			enabled: !!adminId,
		}
	);

	const { data: projects, isLoading: isLoadingProjects } = useGetProjects(
		adminId as string,
		{
			enabled: !!adminId,
		}
	);

	const specializationsForMultiSelect = specializations?.map(
		specialization => ({
			label: specialization.name,
			value: specialization.id as string,
		})
	);

	const typeOfTaskForMultiSelect = typeOfTasks?.map(typeOfTask => ({
		label: typeOfTask.name,
		value: typeOfTask.id as string,
	}));

	const employeesForMultiSelect = useMemo(() => {
		if (specializationId) {
			return employees
				?.filter(employee => {
					if (employee.specializationId === specializationId) {
						return employee;
					}
				})
				?.map(employee => ({
					label: employee.fullName,
					value: employee.id,
				}));
		}
		return employees?.map(employee => ({
			label: employee.fullName,
			value: employee.id,
		}));
	}, [employees, specializationId]);

	const projectsForMultiSelect = projects?.map(project => ({
		label: project.name,
		value: project.id,
	}));

	const onSubmit: SubmitHandler<CreateTask> = async data => {
		console.log(data);

		delete data['should-get-not-busy-employee'];

		await createTask(
			{
				...data,
				currentTime: 0,
				timeToCompleat: timeToMilliseconds(String(data.timeToCompleat)),
				createdById: user!.id,
				projectId: projectId || watchProjectId,
			} as Task,
			{
				onSuccess: () => {
					setShowNotify(true);
					reset({
						title: '',
						description: '',
						projectId: undefined,
						specializationId: undefined,
						typeOfTaskId: undefined,
						timeToCompleat: 0,
						employeeId: undefined,
						'should-get-not-busy-employee': false,
					});
				},
			}
		);
	};

	const shouldGetNotBusyEmployee = watch('should-get-not-busy-employee');
	const { data: notBusyEmployee, refetch: refetchNotBusyEmployee } =
		useGetNotBusyEmployee(specializationId as string, {
			enabled: !!shouldGetNotBusyEmployee,
		});

	useEffect(() => {
		if (shouldGetNotBusyEmployee) refetchNotBusyEmployee();
	}, [specializationId]);

	useEffect(() => {
		if (notBusyEmployee) setValue('employeeId', notBusyEmployee.id);
	}, [notBusyEmployee]);

	const visible =
		isLoadingEmployees ||
		isLoadingProjects ||
		isLoadingSpecialization ||
		isLoadingTypeOfTask;

	return (
		<>
			<Form
				control={control}
				className='w-full flex items-center justify-center'
			>
				<Box pos='relative' className='w-full'>
					<LoadingOverlay
						visible={visible}
						zIndex={1000}
						overlayProps={{ radius: 'sm', blur: 2 }}
					/>
					<Card
						className='mx-auto max-w-[860px] w-full mb-[150px]'
						shadow='sm'
						radius='md'
						withBorder
					>
						<h2 className='text-2xl font-bold text-center'>Создание Задачи</h2>
						<div className='flex flex-col gap-y-3'>
							<Input.Wrapper label='Название *'>
								<Controller
									name='title'
									control={control}
									render={({ field }) => {
										return <Input {...field} />;
									}}
								/>
							</Input.Wrapper>
							<Controller
								name='description'
								control={control}
								render={({ field }) => {
									return <Textarea size='lg' label='Описание *' {...field} />;
								}}
							/>
							{!projectId && (
								<Controller
									control={control}
									name='projectId'
									render={({ field }) => {
										return (
											<Select
												data={projectsForMultiSelect}
												{...field}
												label='Проект *'
											/>
										);
									}}
								/>
							)}
							<Controller
								control={control}
								name='specializationId'
								render={({ field }) => {
									return (
										<Select
											data={specializationsForMultiSelect}
											{...field}
											label='Специализация *'
										/>
									);
								}}
							/>
							<Controller
								control={control}
								name='typeOfTaskId'
								render={({ field }) => {
									return (
										<Select
											data={typeOfTaskForMultiSelect}
											{...field}
											label='Тип задачи *'
										/>
									);
								}}
							/>
							<Controller
								control={control}
								name='timeToCompleat'
								render={({ field }) => {
									return (
										<TimePicker
											label='Время на выполнение задачи'
											withDropdown
											{...field}
											value={String(field.value || '')}
										/>
									);
								}}
							/>

							<Controller
								control={control}
								name='employeeId'
								render={({ field }) => {
									return (
										<Select
											data={employeesForMultiSelect}
											{...field}
											label='Исполнитель *'
										/>
									);
								}}
							/>
							<Controller
								name='should-get-not-busy-employee'
								control={control}
								render={({ field: { value, ...field } }) => {
									return (
										<Tooltip
											arrowSize={4}
											withArrow
											label={<p>Сначала выберите специализацию</p>}
											events={{
												hover: !specializationId,
												focus: !specializationId,
												touch: !specializationId,
											}}
										>
											<Checkbox
												{...field}
												checked={value as boolean}
												label='Автоматически выставить задачу на самого не занятого сотрудника'
												disabled={!specializationId}
												classNames={{
													input:
														'disabled:!border-[var(--mantine-color-dark-4)]',
												}}
											/>
										</Tooltip>
									);
								}}
							/>
						</div>
						<Button
							loading={isPending}
							className='mt-5'
							onClick={() => {
								handleSubmit(onSubmit)();
							}}
						>
							Создать задачу
						</Button>
					</Card>
				</Box>
			</Form>
			{showNotify && (
				<Notification
					icon={checkIcon}
					onClose={() => {
						setShowNotify(false);
					}}
					color='teal'
					title='Все готово!'
					mt='md'
					pos='absolute'
					top={0}
					right={0}
					className='z-[5000]'
				>
					Задача успешно создана
				</Notification>
			)}
		</>
	);
};
