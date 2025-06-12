import { CreateEmployee } from '@/page/employees';
import { baseApi } from '@/shared/api';
import { targetEmployee } from './_constants';
import { Employee } from './_types';

export const getEmployees = async (userId: string): Promise<Employee[]> =>
	(await baseApi(`${targetEmployee}/user/${userId}`)).data;

export const createEmployee = async (data: CreateEmployee): Promise<Employee> =>
	await baseApi.post(`${targetEmployee}`, data);

export const getEmployeeById = async (id: string): Promise<Employee> =>
	(await baseApi(`${targetEmployee}/${id}`)).data;

export const updateEmployee = async (data: Partial<Employee>) => {
	return (await baseApi.patch(`${targetEmployee}/${data.id}`, data)).data;
};

export const deleteEmployee = async (id: string): Promise<Employee> =>
	(await baseApi.delete(targetEmployee + id)).data;

export const getNotBusyEmployee = async (
	specializationId: string
): Promise<Employee> =>
	(await baseApi(`${targetEmployee}/least-busy-employee/${specializationId}`))
		.data;
