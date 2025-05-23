'use client';

import { Employee, useGetEmployees } from '@/entities/employee';
import { userStore } from '@/entities/user';
import { useAtomValue } from 'jotai';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { MRT_Localization_RU } from 'mantine-react-table/locales/ru';
import { useMemo, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import * as yup from 'yup';

// Схема валидации для сотрудника
const employeeValidationSchema = yup.object().shape({
	fullName: yup.string().required('Имя обязательно для заполнения'),
	email: yup
		.string()
		.email('Некорректный email')
		.required('Email обязателен для заполнения'),
	phone: yup.string().required('Телефон обязателен для заполнения'),
});

export const AllEmployeesProjects = () => {
	const user = useAtomValue(userStore);
	const { data: employeesData, isLoading } = useGetEmployees(
		user?.id as string,
		{
			enabled: !!user?.id,
		}
	);

	const [validationErrors, setValidationErrors] = useState<
		Partial<Record<keyof Employee, string | undefined>>
	>({});

	const columns = useMemo<MRT_ColumnDef<Employee>[]>(
		() => [
			{
				accessorKey: 'fullName',
				header: 'Имя',
				mantineEditTextInputProps: {
					error: validationErrors.fullName,
				},
			},
			{
				accessorKey: 'email',
				header: 'Почта',
				mantineEditTextInputProps: {
					error: validationErrors.email,
				},
			},
			{
				accessorKey: 'phone',
				header: 'Телефон',
				Edit: ({ cell }) => (
					<>
						<PhoneInput
							defaultMask='(...)-...-..-..'
							alwaysDefaultMask
							specialLabel=''
							disableDropdown
							value={cell.getValue() as string}
							containerClass='w-full'
							buttonStyle={{ display: 'none' }}
							inputClass='p-1.5 focus:!border !outline-none rounded-[4px]'
							onChange={async value => {
								await handleSaveRow({
									values: {
										phone: value,
									},
								});
							}}
						/>
						<p className='text-red-500 mt-1 text-xs'>
							{validationErrors?.phone}
						</p>
					</>
				),
				mantineEditTextInputProps: {
					error: validationErrors.phone,
				},
			},
		],
		[validationErrors]
	);

	const handleSaveRow = async ({
		values,
	}: {
		values: Record<string, string>;
	}) => {
		console.log(values);
		try {
			await employeeValidationSchema.validate(values, { abortEarly: false });
		} catch (err) {
			if (err instanceof yup.ValidationError) {
				const errors = err.inner.reduce(
					(acc, curr) => {
						return { ...acc, [curr.path as string]: curr.message };
					},
					{} as Record<string, string>
				);

				setValidationErrors({
					...validationErrors,
					[Object.keys(values)[0]]: errors[Object.keys(values)[0]],
				});
			}
		}
	};

	return (
		<div>
			<MantineReactTable
				data={employeesData || []}
				columns={columns}
				editDisplayMode='table'
				enableEditing
				state={{
					isLoading,
				}}
				localization={MRT_Localization_RU}
				getRowId={row => row.id}
				mantineEditTextInputProps={{
					onBlur: async ({ target }) => {
						const [id, name] = target.name.split('_'); // получение id employee
					},
					onChange: async ({ target }) => {
						const [id, name] = (target as HTMLInputElement)?.name.split(
							'_'
						) as [string, keyof Employee]; // получение id employee
						await handleSaveRow({
							values: {
								[name]: (target as HTMLInputElement)?.value,
							},
						});
					},
				}}
				onEditingRowSave={handleSaveRow}
			/>
		</div>
	);
};
