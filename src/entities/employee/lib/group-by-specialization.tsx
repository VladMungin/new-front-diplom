import { Employee } from '../model';

export const groupEmployeesBySpecialization = (employees: Employee[]) => {
	return employees.reduce<Record<string, Employee[]>>((grouped, employee) => {
		const { specializationId } = employee;
		if (!grouped[specializationId]) {
			grouped[specializationId] = [];
		}
		grouped[specializationId].push(employee);
		return grouped;
	}, {});
};
