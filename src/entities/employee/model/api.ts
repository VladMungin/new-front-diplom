import { baseApi } from '@/shared/api';
import { targetEmployee } from './_constants';
import { Employee } from './_types';

export const getEmployees = async (userId: string): Promise<Employee[]> =>
	await baseApi(`${targetEmployee}/${userId}`);
