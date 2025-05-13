'use client';

import { useGetSpecialization } from '@/entities/company';
import { Task, useCreateTask } from '@/entities/task';
import { userStore } from '@/entities/user';
import { Card, Input, Select, Textarea } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { Controller, Form, useForm } from 'react-hook-form';

export const CreateTask = () => {
	const user = useAtomValue(userStore);

	const { mutateAsync: createTask } = useCreateTask();

	const { data: specializations } = useGetSpecialization(user?.id as string, {
		enabled: !!user?.id,
	});

	const specializationsForMultiSelect = specializations?.map(
		specialization => specialization.name
	);

	const { control } = useForm<Task>();

	return (
		<Form control={control} className='w-full flex items-center justify-center'>
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
					<Controller
						control={control}
						name='specialization.name'
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
				</div>
			</Card>
		</Form>
	);
};
