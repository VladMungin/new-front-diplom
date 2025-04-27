'use client';

import {
	useCreateRole,
	useCreateSpecialization,
	useCreateTypeOfTask,
} from '@/entities/company';
import { Specialization } from '@/entities/employee';
import { Role, TypeOfTask } from '@/entities/task';
import {
	Button,
	Card,
	CardSection,
	Checkbox,
	Input,
	Tooltip,
} from '@mantine/core';
import { useEffect } from 'react';
import {
	Controller,
	Form,
	FormSubmitHandler,
	useFieldArray,
	useForm,
} from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';
import { CgTrash } from 'react-icons/cg';
import { IoIosInformationCircleOutline } from 'react-icons/io';

interface EditCompany {
	roles: Role[];
	specializations: Specialization[];
	'type-of-tasks': TypeOfTask[];
}

export const CompanyEditPage = () => {
	const { control } = useForm<EditCompany>();

	const { mutateAsync: createRole, isPending: isLoadingRole } = useCreateRole();
	const {
		mutateAsync: createSpecialization,
		isPending: isLoadingSpecialization,
	} = useCreateSpecialization();
	const { mutateAsync: createTypeOfTask, isPending: isLoadingTypeOfTask } =
		useCreateTypeOfTask();

	const isLoading =
		isLoadingRole || isLoadingSpecialization || isLoadingTypeOfTask;

	const {
		fields: roles,
		append: addRole,
		remove: removeRole,
	} = useFieldArray({
		control,
		name: 'roles',
	});

	const {
		fields: specializations,
		append: addSpecialization,
		remove: removeSpecialization,
	} = useFieldArray({
		control,
		name: 'specializations',
	});

	const {
		fields: typeOfTasks,
		append: addTypeOfTask,
		remove: removeTypeOfTask,
	} = useFieldArray({
		control,
		name: 'type-of-tasks',
	});

	useEffect(() => {
		addRole({} as Role);
		addSpecialization({} as Specialization);
		addTypeOfTask({} as TypeOfTask);
	}, []);

	const onSubmit: FormSubmitHandler<EditCompany> = async ({ data }) => {
		const requestRoles = data.roles.map(async role => {
			const response = await createRole(role);

			return response;
		});

		const requestSpecializations = data.specializations.map(
			async specialization => {
				const response = await createSpecialization(specialization);

				return response;
			}
		);

		const requestTypeOfTasks = data['type-of-tasks'].map(async typeOfTask => {
			const response = await createTypeOfTask(typeOfTask);

			return response;
		});

		await Promise.all([
			...requestRoles,
			...requestSpecializations,
			...requestTypeOfTasks,
		]);
	};

	return (
		<Form
			control={control}
			className='w-full flex items-center justify-center'
			onSubmit={onSubmit}
		>
			<Card
				className='mx-auto max-w-[860px] w-full mb-[150px]'
				shadow='sm'
				radius='md'
				withBorder
			>
				<CardSection withBorder className='!flex !flex-col !items-center !py-1'>
					<h2 className='text-2xl font-bold my-3 flex items-center gap-2'>
						Добавьте Роли для своей компании
						<Tooltip
							label='Роль назначается сотруднику и ограничивает его возможности пользования функционалом приложения'
							color='gray'
							withArrow
							arrowSize={8}
							multiline
							w={220}
							transitionProps={{ transition: 'scale-x', duration: 300 }}
							position='right'
						>
							<IoIosInformationCircleOutline />
						</Tooltip>
					</h2>
				</CardSection>
				{roles.map((field, index) => {
					return (
						<div className='flex flex-col gap-2 my-2' key={field.id}>
							<Input.Wrapper label='Название'>
								<Controller
									name={`roles.${index}.name`}
									control={control}
									render={({ field }) => {
										return (
											<div className='flex gap-2'>
												<Input {...field} className='w-full' />
												<Button color='red' onClick={() => removeRole(index)}>
													<CgTrash />
												</Button>
											</div>
										);
									}}
								/>
							</Input.Wrapper>
							<div className='grid grid-cols-2 gap-2'>
								<Controller
									key={field.id}
									name={`roles.${index}.canEditEmployee`}
									control={control}
									render={({ field: { value, ...field } }) => {
										return (
											<Checkbox
												{...field}
												checked={value as boolean}
												label='Возможность редактировать сотрудников'
											/>
										);
									}}
								/>
								<Controller
									key={field.id}
									name={`roles.${index}.canEditProject`}
									control={control}
									render={({ field: { value, ...field } }) => {
										return (
											<Checkbox
												{...field}
												checked={value as boolean}
												label='Возможность редактировать проекты'
											/>
										);
									}}
								/>
								<Controller
									key={field.id}
									name={`roles.${index}.canEditRole`}
									control={control}
									render={({ field: { value, ...field } }) => {
										return (
											<Checkbox
												{...field}
												checked={value as boolean}
												label='Возможность редактировать роли'
											/>
										);
									}}
								/>
								<Controller
									key={field.id}
									name={`roles.${index}.canEditSpecialization`}
									control={control}
									render={({ field: { value, ...field } }) => {
										return (
											<Checkbox
												{...field}
												checked={value as boolean}
												label='Возможность редактировать специальности'
											/>
										);
									}}
								/>
								<Controller
									key={field.id}
									name={`roles.${index}.canEditTask`}
									control={control}
									render={({ field: { value, ...field } }) => {
										return (
											<Checkbox
												{...field}
												checked={value as boolean}
												label='Возможность редактировать задачи'
											/>
										);
									}}
								/>
							</div>
						</div>
					);
				})}
				<Button
					fullWidth
					className='mb-2'
					onClick={() => {
						addRole({} as Role);
					}}
				>
					Добавить
				</Button>
				<CardSection withBorder className='!flex !flex-col !items-center !py-1'>
					<h2 className='text-2xl font-bold my-3 flex items-center gap-2'>
						Добавьте Специальности для своей компании
						<Tooltip
							label='Специальности, позволяют автоматизировать назначение задач'
							color='gray'
							withArrow
							arrowSize={8}
							multiline
							w={220}
							transitionProps={{ transition: 'scale-x', duration: 300 }}
							position='right'
						>
							<IoIosInformationCircleOutline />
						</Tooltip>
					</h2>
				</CardSection>
				{specializations.map((field, index) => {
					return (
						<div className='flex flex-col gap-2 my-2' key={field.id}>
							<Input.Wrapper label='Название'>
								<Controller
									name={`specializations.${index}.name`}
									control={control}
									render={({ field }) => {
										return (
											<div className='flex gap-2'>
												<Input {...field} className='w-full' />
												<Button
													color='red'
													onClick={() => removeSpecialization(index)}
												>
													<CgTrash />
												</Button>
											</div>
										);
									}}
								/>
							</Input.Wrapper>
						</div>
					);
				})}
				<Button
					fullWidth
					className='mb-2'
					onClick={() => {
						addSpecialization({} as Specialization);
					}}
				>
					Добавить
				</Button>
				<CardSection withBorder className='!flex !flex-col !items-center !py-1'>
					<h2 className='text-2xl font-bold my-3 flex items-center gap-2'>
						Добавьте Типы задач для своей компании
						<Tooltip
							label='Тип задачи определяет её категорию, например (разработка, исправление ошибок и т.д.)'
							color='gray'
							withArrow
							arrowSize={8}
							multiline
							w={220}
							transitionProps={{ transition: 'scale-x', duration: 300 }}
							position='right'
						>
							<IoIosInformationCircleOutline />
						</Tooltip>
					</h2>
				</CardSection>
				{typeOfTasks.map((field, index) => {
					return (
						<div className='flex flex-col gap-2 my-2' key={field.id}>
							<Input.Wrapper label='Название'>
								<Controller
									name={`type-of-tasks.${index}.name`}
									control={control}
									render={({ field }) => {
										return (
											<div className='flex gap-2'>
												<Input {...field} className='w-full' />
												<Button
													color='red'
													onClick={() => removeTypeOfTask(index)}
												>
													<CgTrash />
												</Button>
											</div>
										);
									}}
								/>
							</Input.Wrapper>
						</div>
					);
				})}
				<Button
					fullWidth
					className='mb-2'
					onClick={() => {
						addTypeOfTask({} as Specialization);
					}}
				>
					Добавить
				</Button>
				<CardSection className='!flex !flex-col !items-center '>
					<Button fullWidth color='green' type='submit'>
						{isLoading ? (
							<AiOutlineLoading className='animate-spin' />
						) : (
							'Создать'
						)}
					</Button>
				</CardSection>
			</Card>
		</Form>
	);
};
