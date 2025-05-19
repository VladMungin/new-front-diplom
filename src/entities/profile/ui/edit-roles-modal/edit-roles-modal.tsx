'use client';

import { useGetRoles, useUpdateRole } from '@/entities/company';
import { Role } from '@/entities/task';
import { userStore } from '@/entities/user';
import { Button, Checkbox, Input, Title } from '@mantine/core';
import cn from 'classnames';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Controller, Form, useFieldArray, useForm } from 'react-hook-form';
import { CgTrash } from 'react-icons/cg';
import { IoIosSave } from 'react-icons/io';
import { MdOutlineModeEdit } from 'react-icons/md';
export const EditRolesModal = () => {
	const { control, getValues, reset } = useForm<{ roles: Role[] }>();
	const user = useAtomValue(userStore);
	const { data: rolesData } = useGetRoles(user?.id, {
		enabled: !!user?.id,
	});
	const [editableRoles, setEditableRoles] = useState<number[]>([]);

	const {
		fields: roles,
		append: addRole,
		remove: removeRole,
	} = useFieldArray({
		control,
		name: 'roles',
	});

	const toggleRoleEdit = (index: number) => {
		if (editableRoles.includes(index)) {
			setEditableRoles(editableRoles.filter(i => i !== index));
		} else {
			setEditableRoles([...editableRoles, index]);
		}
	};

	const { mutateAsync: updateRole, isPending } = useUpdateRole();

	useEffect(() => {
		return () => {
			reset({ roles: [] }); // Сбрасываем форму при размонтировании
		};
	}, [reset]);

	useEffect(() => {
		if (rolesData) {
			reset({ roles: rolesData }); // Устанавливаем начальные данные
		}
	}, [rolesData, reset]);

	return (
		<>
			{/* <Button onClick={open} mt={10}>Настройка ролей</Button>
			<Modal
				opened={opened}
				onClose={close}
				title='Настройки'
				fullScreen
				radius={0}
				transitionProps={{ transition: 'fade', duration: 600 }}
			> */}
			<Form control={control}>
				<Title order={4} className='!mt-3'>
					Настройка ролей
				</Title>
				{roles.map((field, index) => {
					const isEditable = editableRoles.includes(index);
					return (
						<div className='flex flex-col gap-2 my-2' key={field.id}>
							<Input.Wrapper label='Название'>
								<Controller
									name={`roles.${index}.name`}
									control={control}
									render={({ field }) => {
										return (
											<div className='flex gap-2'>
												<Input
													{...field}
													className='w-full'
													disabled={!isEditable}
												/>
												<Button
													color='red'
													className='!px-2'
													onClick={() => removeRole(index)}
												>
													<CgTrash size={20} />
												</Button>
												<Button
													loading={isPending}
													color={isEditable ? 'green' : 'indigo'}
													type={isEditable ? 'submit' : 'button'}
													onClick={() => {
														if (!isEditable) {
															toggleRoleEdit(index);
														} else {
															// console.log(getValues(`roles.${index}`))
															updateRole(getValues(`roles.${index}`));
															toggleRoleEdit(index);
														}
													}}
													className={cn('!px-2', {
														'!px-3': !isEditable,
													})}
												>
													{!isEditable ? (
														<MdOutlineModeEdit size={15} />
													) : (
														<IoIosSave size={22} />
													)}
												</Button>
											</div>
										);
									}}
								/>
							</Input.Wrapper>
							<div className='grid grid-cols-2 gap-2'>
								<Controller
									name={`roles.${index}.canEditEmployee`}
									control={control}
									render={({ field: { value, ...field } }) => {
										return (
											<Checkbox
												{...field}
												checked={value as boolean}
												label='Возможность редактировать сотрудников'
												disabled={!isEditable}
											/>
										);
									}}
								/>
								<Controller
									name={`roles.${index}.canEditProject`}
									control={control}
									render={({ field: { value, ...field } }) => {
										return (
											<Checkbox
												{...field}
												checked={value as boolean}
												label='Возможность редактировать проекты'
												disabled={!isEditable}
											/>
										);
									}}
								/>
								<Controller
									name={`roles.${index}.canEditRole`}
									control={control}
									render={({ field: { value, ...field } }) => {
										return (
											<Checkbox
												{...field}
												checked={value as boolean}
												label='Возможность редактировать роли'
												disabled={!isEditable}
											/>
										);
									}}
								/>
								<Controller
									name={`roles.${index}.canEditSpecialization`}
									control={control}
									render={({ field: { value, ...field } }) => {
										return (
											<Checkbox
												{...field}
												checked={value as boolean}
												label='Возможность редактировать специальности'
												disabled={!isEditable}
											/>
										);
									}}
								/>
								<Controller
									name={`roles.${index}.canEditTask`}
									control={control}
									render={({ field: { value, ...field } }) => {
										return (
											<Checkbox
												{...field}
												checked={value as boolean}
												label='Возможность редактировать задачи'
												disabled={!isEditable}
											/>
										);
									}}
								/>
							</div>
						</div>
					);
				})}
			</Form>
			{/* </Modal> */}
		</>
	);
};
