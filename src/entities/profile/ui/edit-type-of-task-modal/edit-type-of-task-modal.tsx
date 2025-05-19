'use client';

import { useGetTypeOfTasks, useUpdateTypeOfTask } from '@/entities/company';
import { TypeOfTask } from '@/entities/task';
import { userStore } from '@/entities/user';
import { Button, Input, Title } from '@mantine/core';
import cn from 'classnames';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Controller, Form, useFieldArray, useForm } from 'react-hook-form';
import { CgTrash } from 'react-icons/cg';
import { IoIosSave } from 'react-icons/io';
import { MdOutlineModeEdit } from 'react-icons/md';

export const EditTypeOfTaskModal = () => {
	const { control, getValues, reset } = useForm<{ typeOfTask: TypeOfTask[] }>();
	const user = useAtomValue(userStore);
	const { data: typeOfTasksData } = useGetTypeOfTasks(user?.id, {
		enabled: !!user?.id,
	});
	const [editableTypeOfTasks, setEditableTypeOfTasks] = useState<number[]>([]);

	const {
		fields: typeOfTasks,
		append: addTypeOfTask,
		remove: removeTypeOfTask,
	} = useFieldArray({
		control,
		name: 'typeOfTask',
	});

	const toggleRoleEdit = (index: number) => {
		if (editableTypeOfTasks.includes(index)) {
			setEditableTypeOfTasks(editableTypeOfTasks.filter(i => i !== index));
		} else {
			setEditableTypeOfTasks([...editableTypeOfTasks, index]);
		}
	};

	const { mutateAsync: updateTypeOfTask, isPending } = useUpdateTypeOfTask();

	useEffect(() => {
		return () => {
			reset({ typeOfTask: [] }); // Сбрасываем форму при размонтировании
		};
	}, [reset]);

	useEffect(() => {
		if (typeOfTasksData) {
			reset({ typeOfTask: typeOfTasksData }); // Устанавливаем начальные данные
		}
	}, [typeOfTasksData, reset]);

	return (
		<>
			{/* <Button onClick={open} mt={10}>
				Настройка типов задач
			</Button>
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
				{typeOfTasks.map((field, index) => {
					const isEditable = editableTypeOfTasks.includes(index);
					return (
						<div className='flex flex-col gap-2 my-2' key={field.id}>
							<Input.Wrapper label='Название'>
								<Controller
									name={`typeOfTask.${index}.name`}
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
													onClick={() => removeTypeOfTask(index)}
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
															updateTypeOfTask(
																getValues(`typeOfTask.${index}`)
															);
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
						</div>
					);
				})}
			</Form>
			{/* </Modal> */}
		</>
	);
};
