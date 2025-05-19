'use client';

import { useGetSpecialization } from '@/entities/company';
import { useUpdateSpecialization } from '@/entities/company/model/use-update-specialization';
import { Specialization } from '@/entities/employee';
import { userStore } from '@/entities/user';
import { Button, Input, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import cn from 'classnames';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Controller, Form, useFieldArray, useForm } from 'react-hook-form';
import { CgTrash } from 'react-icons/cg';
import { IoIosSave } from 'react-icons/io';
import { MdOutlineModeEdit } from 'react-icons/md';

export const EditSpecializationModal = () => {
	const { control, getValues } = useForm<{
		specializations: Specialization[];
	}>();
	const user = useAtomValue(userStore);
	const { data: specializationsData } = useGetSpecialization(user?.id || '', {
		enabled: !!user?.id,
	});
	const [opened, { open, close }] = useDisclosure(false);
	const [editableSpecializations, setEditableSpecializations] = useState<
		number[]
	>([]);

	const {
		fields: specializations,
		append: addSpecializations,
		remove: removeSpecializations,
	} = useFieldArray({
		control,
		name: 'specializations',
	});

	const toggleSpecializationsEdit = (index: number) => {
		if (editableSpecializations.includes(index)) {
			setEditableSpecializations(
				editableSpecializations.filter(i => i !== index)
			);
		} else {
			setEditableSpecializations([...editableSpecializations, index]);
		}
	};

	const { mutateAsync: updateSpecialization, isPending } =
		useUpdateSpecialization();

	useEffect(() => {
		specializationsData?.forEach(item => {
			addSpecializations(item);
		});
	}, [specializationsData]);

	return (
		<>
			<Button onClick={open} mt={10}>
				Настройка специальностей
			</Button>
			<Modal
				opened={opened}
				onClose={close}
				title='Настройки'
				fullScreen
				radius={0}
				transitionProps={{ transition: 'fade', duration: 600 }}
			>
				<Form control={control}>
					<Title order={4} className='!mt-3'>
						Настройка ролей
					</Title>
					{specializations.map((field, index) => {
						const isEditable = editableSpecializations.includes(index);
						return (
							<div className='flex flex-col gap-2 my-2' key={field.id}>
								<Input.Wrapper label='Название'>
									<Controller
										name={`specializations.${index}.name`}
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
														onClick={() => removeSpecializations(index)}
													>
														<CgTrash size={20} />
													</Button>
													<Button
														loading={isPending}
														color={isEditable ? 'green' : 'indigo'}
														type={isEditable ? 'submit' : 'button'}
														onClick={() => {
															if (!isEditable) {
																toggleSpecializationsEdit(index);
															} else {
																// console.log(getValues(`roles.${index}`))
																updateSpecialization(
																	getValues(`specializations.${index}`)
																);
																toggleSpecializationsEdit(index);
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
			</Modal>
		</>
	);
};
