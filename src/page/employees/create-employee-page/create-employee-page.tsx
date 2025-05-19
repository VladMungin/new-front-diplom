'use client';
import { useGetRoles, useGetSpecialization } from '@/entities/company';
import { useCreateEmployee } from '@/entities/employee';
import { userStore } from '@/entities/user';
import { Button, Card, CardSection, Input, Select } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { Controller, Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

export type CreateEmployee = {
	fullName: string;
	email: string;
	phone: string;
	password: string;
	companyId?: string;
	specialization?: string;
	userId?: string;
	role?: string;
	roleId?: string;
};

export const CreateEmployeePage = () => {
	const user = useAtomValue(userStore);
	const { data: roles } = useGetRoles(user?.id || '', {
		enabled: !!user?.id,
	});
	const { data: specializations } = useGetSpecialization(user?.id || '', {
		enabled: !!user?.id,
	});

	const { mutateAsync } = useCreateEmployee();
	const { control } = useForm<CreateEmployee>();

	const rolesForMultiSelect = roles?.map(role => role.name);

	const specializationsForMultiSelect = specializations?.map(
		specialization => specialization.name
	);

	const onSubmit: FormSubmitHandler<CreateEmployee> = async ({ data }) => {
		const roleId = roles
			?.map(role => {
				if (role.name === data.role) {
					return role.id;
				}
				return undefined;
			})
			.filter(item => item !== undefined)[0];
		const res = await mutateAsync({
			...data,
			userId: user?.id,
			companyId: user?.companyId,
			roleId: roleId,
		});
		console.log(res);
	};

	return (
		<Form
			control={control}
			className='w-full flex items-center justify-center'
			onSubmit={onSubmit}
		>
			<Card
				className='mx-auto max-w-[860px] w-full mb-[150px] !gap-5'
				shadow='sm'
				radius='md'
				withBorder
			>
				<CardSection withBorder className='!flex !flex-col !items-center !py-1'>
					<h2 className='text-2xl font-bold my-3 flex items-center gap-2'>
						Добавление сотрудника
					</h2>
				</CardSection>
				{/* <Input.Wrapper label='Имя' className='!hidden'>
					<Controller
						control={control}
						name='userId'
						render={({ field }) => {
							return <Input {...field} value={user?.id} />;
						}}
					/>
				</Input.Wrapper> */}
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
				<Input.Wrapper label='Пароль'>
					<Controller
						control={control}
						name='password'
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>
				</Input.Wrapper>

				<Controller
					control={control}
					name='role'
					render={({ field }) => {
						return (
							<Select data={rolesForMultiSelect} {...field} label='Роль' />
						);
					}}
				/>

				<Controller
					control={control}
					name='specialization'
					render={({ field }) => {
						return (
							<Select
								data={specializationsForMultiSelect}
								{...field}
								label='Специализация'
							/>
						);
					}}
				/>
				<CardSection className='!flex !flex-col !items-center '>
					<Button fullWidth color='green' type='submit'>
						{false ? <AiOutlineLoading className='animate-spin' /> : 'Создать'}
					</Button>
				</CardSection>
			</Card>
		</Form>
	);
};
