import { CreateEmployee } from '@/page/employees';
import { baseApi } from '@/shared/api';
import { targetEmployee } from './_constants';
import { Employee } from './_types';

export const getEmployees = async (userId: string): Promise<Employee[]> =>
	(await baseApi(`${targetEmployee}/user/${userId}`)).data;

export const createEmployee = async (data: CreateEmployee): Promise<Employee> =>
	await baseApi.post(`${targetEmployee}`, data);
