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
import { userStore } from '@/entities/user';
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardSection,
	Divider,
	List,
	ListItem,
	LoadingOverlay,
	Modal,
	MultiSelect,
	Text,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Controller, Form, SubmitHandler, useForm } from 'react-hook-form';

export const ProjectPage = () => {
	const user = useAtomValue(userStore);

	const searchParams = useSearchParams();
	const projectId = searchParams.get('id');

	const { data: project, isLoading } = useGetProjectById(projectId || '', {
		enabled: !!projectId,
	});

	const groupedEmployees = useMemo(() => {
		if (project?.employees) {
			return groupEmployeesBySpecialization(project?.employees as Employee[]);
		}
	}, [project]);

	const { data: employees } = useGetEmployees(user?.id || '', {
		enabled: !!user?.id,
	});

	const employeesForMultiSelect = employees?.map(employee => employee.fullName);

	const [opened, { open, close }] = useDisclosure(false);

	const { control, handleSubmit } = useForm<{ employees: string[] }>();

	const { mutateAsync: updateProject } = useUpdateProject();

	const onSubmit: SubmitHandler<{ employees: string[] }> = async data => {
		const employeeIds = employees
			?.map(employee => {
				if (data.employees.includes(employee.fullName)) {
					return employee.id;
				}
				return undefined;
			})
			.filter(item => item !== undefined);

		await updateProject({
			...project,
			employeeIds,
		} as Project);
	};

	return (
		<>
			<Box pos='relative' mih='80vh'>
				<LoadingOverlay
					visible={isLoading}
					zIndex={1000}
					overlayProps={{ radius: 'sm', blur: 2 }}
				/>
				<Title order={1}>{project?.name}</Title>
				<Text className='!mt-5 break-all'>{project?.description}</Text>
				<div className='flex w-full gap-5'>
					<Card className='w-full ' withBorder>
						<CardSection withBorder className='!px-4 py-2'>
							<Title order={3}>Задачи</Title>
						</CardSection>
						<div className='my-5'>Тут будут задачи</div>
						<CardSection withBorder className='!px-4 py-2 mt-auto'>
							<ButtonGroup className='gap-2'>
								<Link
									href=''
									className='underline text-(--mantine-color-blue-2)'
								>
									Все задачи
								</Link>
								<Divider orientation='vertical' size='sm' />

								<Link
									href=''
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
							<List listStyleType='disc'>
								{Object.entries(groupedEmployees || {}).map(
									([specializationId, employees]) => (
										<ListItem key={specializationId}>
											Специализация: {specializationId}
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
						</div>
						<CardSection withBorder className='!px-4 py-2 mt-auto'>
							<ButtonGroup className='gap-2'>
								<Link
									href=''
									className='underline text-(--mantine-color-blue-2)'
								>
									Все Участники
								</Link>
								<Divider orientation='vertical' size='sm' />

								<Button
									onClick={open}
									unstyled
									className='underline text-(--mantine-color-blue-2) cursor-pointer'
								>
									Добавить участника
								</Button>
							</ButtonGroup>
						</CardSection>
					</Card>
				</div>
			</Box>
			<Modal opened={opened} onClose={close} title='Участники' centered>
				<Form control={control}>
					<Controller
						name='employees'
						control={control}
						render={({ field }) => {
							return (
								<MultiSelect
									label='Сотрудники'
									{...field}
									defaultValue={project?.employees.map(
										employee => employee.fullName
									)}
									data={employeesForMultiSelect}
									nothingFoundMessage='У вас еще нет сотрудников'
									hidePickedOptions
								/>
							);
						}}
					/>
					<Button
						className='mt-2'
						fullWidth
						color='green'
						onClick={() => {
							handleSubmit(onSubmit)();
						}}
					>
						Сохранить
					</Button>
				</Form>
			</Modal>
		</>
	);
};
