'use client';
import { useGetRoles } from '@/entities/company';
import { Employee } from '@/entities/employee';
import { Button, Card, CardSection, Input, Select } from '@mantine/core';
import { Controller, Form, useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

type CreateEmployee = Omit<
	Employee,
	'id' | 'user' | 'userId' | 'roleId' | 'tasks' | 'specializationId' | 'company'
>;

export const CreateEmployeePage = () => {
	const { data: roles } = useGetRoles();
	const { control } = useForm<CreateEmployee>();

	const rolesForMultiSelect = roles?.map(role => role.name);

	return (
		<Form control={control} className='w-full flex items-center justify-center'>
			<Card
				className='mx-auto max-w-[860px] w-full mb-[150px]'
				shadow='sm'
				radius='md'
				withBorder
			>
				<CardSection withBorder className='!flex !flex-col !items-center !py-1'>
					<h2 className='text-2xl font-bold my-3 flex items-center gap-2'>
						Добавление сотрудника
					</h2>
				</CardSection>
				<Input.Wrapper label='Имя'>
					<Controller
						control={control}
						name='fullName'
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>
				</Input.Wrapper>
				<Input.Wrapper label='Email'>
					<Controller
						control={control}
						name='email'
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>
				</Input.Wrapper>
				<Input.Wrapper label='Телефон'>
					<Controller
						control={control}
						name='phone'
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>
				</Input.Wrapper>

				<Controller
					control={control}
					name='role.name'
					render={({ field }) => {
						return (
							<Select data={rolesForMultiSelect} {...field} label='Роль' />
						);
					}}
				/>

				<Input.Wrapper label='Специальность'>
					<Controller
						control={control}
						name='specialization.name'
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>
				</Input.Wrapper>
				<CardSection className='!flex !flex-col !items-center mt-2'>
					<Button fullWidth color='green' type='submit'>
						{false ? <AiOutlineLoading className='animate-spin' /> : 'Создать'}
					</Button>
				</CardSection>
			</Card>
		</Form>
	);
};
