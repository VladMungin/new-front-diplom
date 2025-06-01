'use client';

import {
	Employee,
	groupEmployeesBySpecialization,
	useGetEmployees,
} from '@/entities/employee';
import {
	Project,
	useGetProjectById,
	useUpdateProject,
} from '@/entities/project';
import { groupTaskByType, Task, transformTasksByStatus } from '@/entities/task';
import { userStore } from '@/entities/user';
import { chooseWordByNumber } from '@/shared/helpers';
import { PieChart } from '@mantine/charts';
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardSection,
	Divider,
	Input,
	List,
	ListItem,
	LoadingOverlay,
	Modal,
	MultiSelect,
	Text,
	Textarea,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, Form, SubmitHandler, useForm } from 'react-hook-form';
import { IoIosSave } from 'react-icons/io';
import { MdOutlineModeEdit } from 'react-icons/md';

interface GroupedEmployee {
	group: string;
	items: string[];
}

export const ProjectPage = () => {
	const user = useAtomValue(userStore);

	const searchParams = useSearchParams();
	const projectId = searchParams.get('id');

	const {
		data: project,
		isLoading,
		refetch,
	} = useGetProjectById(projectId || '', {
		enabled: !!projectId,
	});

	const groupedEmployees = useMemo(() => {
		if (project?.employees.length) {
			return groupEmployeesBySpecialization(project.employees as Employee[]);
		} else return null;
	}, [project]);

	const groupedTask = useMemo(() => {
		if (project?.tasks.length) {
			return groupTaskByType(project.tasks);
		} else return null;
	}, [project]);

	const { data: employees } = useGetEmployees(user?.id || '', {
		enabled: !!user?.id,
	});

	const employeesForMultiSelect: GroupedEmployee[] | undefined =
		employees?.reduce<GroupedEmployee[]>((acc, employee) => {
			console.log(employee);
			const existingGroup = acc.find(
				g => g.group === employee.specialization.name
			);
			if (existingGroup) {
				existingGroup.items.push(employee.fullName);
			} else {
				acc.push({
					group: employee.specialization.name,
					items: [employee.fullName],
				});
			}
			return acc;
		}, []);

	const [opened, { open, close }] = useDisclosure(false);

	const {
		control,
		handleSubmit,
		formState: { isDirty },
	} = useForm<{ employees: string[] }>();

	const { mutateAsync: updateProject, isPending } = useUpdateProject();

	const onSubmit: SubmitHandler<{ employees: string[] }> = async data => {
		const employeeIds = employees
			?.map(employee => {
				if (data.employees.includes(employee.fullName)) {
					return employee.id;
				}
				return undefined;
			})
			.filter(item => item !== undefined);

		await updateProject(
			{
				id: projectId,
				employeeIds,
			} as Project,
			{
				onSuccess: () => {
					refetch();
					close();
				},
			}
		);
	};

	const {
		control: editProjectControl,
		reset,
		getValues,
	} = useForm<{
		name: string;
		description: string;
	}>();

	const [isEditable, setIsEditable] = useState(false);
	useEffect(() => {
		reset({
			name: project?.name,
			description: project?.description,
		});
	}, [isEditable]);

	const tasksStatusForStatistic = useMemo(() => {
		if (project?.tasks) {
			return transformTasksByStatus(project?.tasks as Task[]);
		}
		return [];
	}, [project]);

	console.log(tasksStatusForStatistic);

	return (
		<>
			<Box pos='relative' mih='80vh'>
				<LoadingOverlay
					visible={isLoading}
					zIndex={1000}
					overlayProps={{ radius: 'sm', blur: 2 }}
				/>
				<div className='flex items-center justify-between'>
					{!isEditable && <Title order={1}>{project?.name}</Title>}
					{isEditable && (
						<Controller
							control={editProjectControl}
							name='name'
							render={({ field }) => <Input {...field} size='lg' />}
						/>
					)}
					<Button
						variant='transparent'
						loading={isPending}
						onClick={async () => {
							if (isEditable) {
								await updateProject(
									{
										name: getValues('name'),
										description: getValues('description'),
										id: projectId,
									} as Project,
									{
										onSuccess: () => {
											refetch();
											setIsEditable(prev => !prev);
										},
									}
								);
							} else {
								setIsEditable(prev => !prev);
							}
						}}
					>
						{!isEditable ? (
							<MdOutlineModeEdit size={25} />
						) : (
							<IoIosSave size={25} />
						)}
					</Button>
				</div>
				{!isEditable && (
					<Text className='!mt-5 break-all'>{project?.description}</Text>
				)}
				{isEditable && (
					<Controller
						control={editProjectControl}
						name='description'
						render={({ field }) => <Textarea className='mt-5' {...field} />}
					/>
				)}
				<div className='grid w-full gap-5 mt-5 md:grid-cols-2 sm:grid-cols-1'>
					<Card className='w-full' withBorder>
						<CardSection withBorder className='!px-4 py-2'>
							<Title order={3}>Задачи</Title>
						</CardSection>
						<div className='my-5'>
							{groupedTask ? (
								<List listStyleType='disc'>
									{Object.entries(groupedTask || {}).map(([type, tasks]) => (
										<ListItem
											key={type}
											classNames={{
												itemLabel: '!flex',
											}}
										>
											<Title order={6}>
												{type}: {tasks.length}{' '}
												{chooseWordByNumber(tasks.length, [
													'задача',
													'задачи',
													'задач',
												])}
											</Title>
										</ListItem>
									))}
								</List>
							) : (
								<p>Участников на проекте еще нет</p>
							)}
						</div>
						<CardSection withBorder className='!px-4 py-2 mt-auto'>
							<ButtonGroup className='gap-2'>
								<Link
									href={`/project/all-task?projectId=${projectId}`}
									className='underline text-(--mantine-color-blue-2)'
								>
									Все задачи
								</Link>
								<Divider orientation='vertical' size='sm' />

								<Link
									href={`/tasks/create?projectId=${projectId}`}
									className='underline text-(--mantine-color-blue-2)'
								>
									Создать задачу
								</Link>
							</ButtonGroup>
						</CardSection>
					</Card>
					<Card className='w-full' withBorder>
						<CardSection withBorder className='!px-4 py-2'>
							<Title order={3}>Участники</Title>
						</CardSection>
						<div className='my-5'>
							{groupedEmployees ? (
								<List listStyleType='disc'>
									{Object.entries(groupedEmployees || {}).map(
										([specializationId, employees]) => (
											<ListItem key={specializationId}>
												{specializationId}
												<List listStyleType='revert'>
													{employees.map(employee => (
														<ListItem key={employee.id}>
															<Link
																href={`/employee?id=${employee.id}`}
																className='underline text-(--mantine-color-blue-2)'
															>
																{employee.fullName}
															</Link>
														</ListItem>
													))}
												</List>
											</ListItem>
										)
									)}
								</List>
							) : (
								<p>Участников на проекте еще нет</p>
							)}
						</div>
						<CardSection withBorder className='!px-4 py-2 mt-auto'>
							<ButtonGroup className='gap-2'>
								<Button
									onClick={open}
									unstyled
									className='underline text-(--mantine-color-blue-2) cursor-pointer'
								>
									Редактировать
								</Button>
							</ButtonGroup>
						</CardSection>
					</Card>
				</div>
				<Card className='mt-5 '>
					<CardSection>
						<Title order={2} className='text-center'>
							Статистика
						</Title>
					</CardSection>
					<div className='flex'>
						<div className=''>
							<Title order={4} className='text-center'>
								Статистика по статусам
							</Title>
							<PieChart
								withLabelsLine
								labelsPosition='outside'
								labelsType='value'
								withLabels
								withTooltip
								tooltipDataSource='segment'
								mx='auto'
								data={tasksStatusForStatistic}
							/>
						</div>
					</div>
				</Card>
			</Box>
			<Modal opened={opened} onClose={close} title='Участники' centered>
				<Form control={control} className='min-h-[12vh] flex flex-col'>
					<Controller
						name='employees'
						control={control}
						render={({ field }) => {
							return (
								<MultiSelect
									searchable
									label='Сотрудники'
									{...field}
									defaultValue={project?.employees.map(
										employee => employee.fullName
									)}
									data={employeesForMultiSelect}
									nothingFoundMessage='У вас еще нет сотрудников'
									hidePickedOptions
									withScrollArea={false}
									styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
									comboboxProps={{
										transitionProps: { duration: 200 },
									}}
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
						loading={isPending}
						disabled={!isDirty}
					>
						Сохранить
					</Button>
				</Form>
			</Modal>
		</>
	);
};
