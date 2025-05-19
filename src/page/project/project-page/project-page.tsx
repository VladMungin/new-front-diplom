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

	const {
		data: project,
		isLoading,
		refetch,
	} = useGetProjectById(projectId || '', {
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
				<div className='grid w-full gap-5 mt-5 md:grid-cols-2 sm:grid-cols-1'>
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
			</Box>
			<Modal opened={opened} onClose={close} title='Участники' centered>
				<Form control={control} className='min-h-[12vh] flex flex-col'>
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
