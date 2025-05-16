'use client';

import { EditRolesModal, EditTypeOfTaskModal } from '@/entities/profile';
import { userStore } from '@/entities/user';
import {
	Button,
	Card,
	CardSection,
	Input,
	Modal,
	PasswordInput,
	Switch,
	Title,
	useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAtomValue } from 'jotai';
import { Controller, Form, useForm } from 'react-hook-form';
import { IoIosSettings } from 'react-icons/io';

export const ProfilePage = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const user = useAtomValue(userStore);

	const {
		control,
		formState: { isDirty },
	} = useForm();

	const { colorScheme, setColorScheme } = useMantineColorScheme();

	return (
		<>
			<Card>
				<CardSection
					withBorder
					className='!flex items-center justify-between !py-1 !px-5'
				>
					<h2 className='text-2xl font-bold my-3 gap-2'>Моя учетная запись</h2>
					<Button unstyled onClick={open} className='!cursor-pointer'>
						<IoIosSettings size={40} />
					</Button>
				</CardSection>
				<div className='flex gap-5'>
					<EditRolesModal />
					<EditTypeOfTaskModal />
				</div>
			</Card>
			<Modal
				opened={opened}
				onClose={close}
				title='Настройки'
				fullScreen
				radius={0}
				transitionProps={{ transition: 'fade', duration: 600 }}
			>
				<div className='flex w-full'>
					<Card className='w-full'>
						<CardSection>
							<Title order={3} className='!ml-5 !my-5'>
								Информация
							</Title>
						</CardSection>
						<Form control={control} className='flex flex-col gap-2'>
							<Input.Wrapper label='Имя'>
								<Controller
									control={control}
									name='name'
									render={({ field }) => {
										return <Input {...field} defaultValue={user?.name} />;
									}}
								/>
							</Input.Wrapper>
							<Input.Wrapper label='Email'>
								<Controller
									control={control}
									name='email'
									render={({ field }) => {
										return <Input {...field} defaultValue={user?.email} />;
									}}
								/>
							</Input.Wrapper>

							<Input.Wrapper label='Пароль'>
								<Controller
									control={control}
									name='password'
									render={({ field }) => {
										return <PasswordInput {...field} />;
									}}
								/>
							</Input.Wrapper>
							{isDirty && <Button className='!ml-auto'>Сохранить</Button>}
						</Form>
					</Card>
					<Card className='w-full'>
						<CardSection>
							<Title order={3} className='!ml-5 !my-5'>
								Приложение
							</Title>
						</CardSection>
						<Switch
							label='Светлая тема'
							checked={colorScheme === 'light'}
							onChange={() => {
								if (colorScheme === 'dark') {
									setColorScheme('light');
								} else {
									setColorScheme('dark');
								}
							}}
						/>
					</Card>
				</div>
			</Modal>
		</>
	);
};
