'use client';

import { Auth, useAuth, userStore } from '@/entities/user';
import { Button, Card, CardSection, Input, PasswordInput } from '@mantine/core';
import { useSetAtom } from 'jotai';
import { Controller, Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

export const LoginPage = () => {
	const { control } = useForm<Auth>();
	const setUser = useSetAtom(userStore);
	const { loginData } = useAuth();

	const onSubmit: FormSubmitHandler<Auth> = async data => {
		const result = await loginData.mutateAsync(data.data);
		console.log(result)
		setUser(result.user);
	};

	return (
		<div className='w-full h-screen flex items-center justify-center '>
			<Card
				className='mx-auto max-w-[860px] w-full mb-[150px]'
				shadow='sm'
				radius='md'
				withBorder
			>
				<CardSection withBorder className='!flex !flex-col !items-center !py-1'>
					<h3 className='text-2xl font-bold my-3'>Авторизация</h3>
				</CardSection>
				<Form
					className='flex flex-col gap-3 py-3'
					control={control}
					onSubmit={onSubmit}
				>
					<Input.Wrapper label='Email'>
						<Controller
							name='email'
							control={control}
							render={({ field }) => {
								return <Input {...field} />;
							}}
						/>
					</Input.Wrapper>
					<Input.Wrapper label='Имя'>
						<Controller
							name='name'
							control={control}
							render={({ field }) => {
								return <Input {...field} />;
							}}
						/>
					</Input.Wrapper>
					<Input.Wrapper label='Пароль'>
						<Controller
							name='password'
							control={control}
							render={({ field }) => {
								return <PasswordInput {...field} />;
							}}
						/>
					</Input.Wrapper>
					<Input.Wrapper label='Название компании'>
						<Controller
							name='companyName'
							control={control}
							render={({ field }) => {
								return <Input {...field} />;
							}}
						/>
					</Input.Wrapper>
					<Button fullWidth type='submit'>
						{loginData.isPending ? (
							<AiOutlineLoading className='animate-spin' />
						) : (
							'Авторизоваться'
						)}
					</Button>
				</Form>
			</Card>
		</div>
	);
};
