import { Employee } from '../model';

export const groupEmployeesBySpecialization = (employees: Employee[]) => {
	return employees.reduce<Record<string, Employee[]>>((grouped, employee) => {
		const {
			specialization: { name },
		} = employee;
		if (!grouped[name]) {
			grouped[name] = [];
		}
		grouped[name].push(employee);
		return grouped;
	}, {});
};
