'use client';
import { useGetEmployees } from '@/entities/employee';
import { useCreateProject } from '@/entities/project';
import { userStore } from '@/entities/user';
import {
	Button,
	Card,
	CardSection,
	Input,
	MultiSelect,
	Textarea,
} from '@mantine/core';
import { useAtomValue } from 'jotai';
import { Controller, Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

interface CreateProject {
	name: string;
	description: string;
	employees: string[];
}

export const ProjectCreate = () => {
	const user = useAtomValue(userStore);

	const { control } = useForm<CreateProject>();

	const { data: employees } = useGetEmployees(user?.id || '');

	const { mutateAsync: createProject, isPending } = useCreateProject();

	console.log(employees);

	const employeesForMultiSelect = employees?.map(employee => employee.fullName);

	const onSubmit: FormSubmitHandler<CreateProject> = async ({ data }) => {
		const employeeIds = employees
			?.map(employee => {
				if (data.employees.includes(employee.fullName)) {
					return employee.id;
				}
				return undefined;
			})
			.filter(item => item !== undefined);

		await createProject({
			...data,
			userId: user!.id,
			employeeIds,
		});
	};

	return (
		<Form
			control={control}
			onSubmit={onSubmit}
			className='w-full flex items-center justify-center'
		>
			<Card
				className='mx-auto max-w-[860px] w-full mb-[150px]'
				shadow='sm'
				radius='md'
				withBorder
			>
				<h2 className='text-2xl font-bold text-center'>Создание проекта</h2>
				<div className='flex flex-col gap-y-3'>
					<Input.Wrapper label='Название *'>
						<Controller
							name='name'
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
					<Controller
						name='employees'
						control={control}
						render={({ field }) => {
							return (
								<MultiSelect
									label='Сотрудники'
									{...field}
									data={employeesForMultiSelect}
									nothingFoundMessage='У вас еще нет сотрудников'
									hidePickedOptions
								/>
							);
						}}
					/>
				</div>
				<CardSection className='!flex !flex-col !items-center mt-4'>
					<Button fullWidth color='green' type='submit'>
						{isPending ? (
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
