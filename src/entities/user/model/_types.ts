import { Employee } from '@/entities/employee'
import { Project } from '@/entities/project'

export interface User {
	id: string;
	email: string;
	password: string;
	name: string;
	createdEmployee: Employee[];
	projects: Project[];
	role: Role;
	roleId: string;
	company: Company;
	companyId: string;
}

export interface Company {
	id: string;
	name: string;
	employees: Employee[];
	user: User[];
}

interface Role {
	id: string;
	name: string;
	canEditEmployee: boolean;
	canEditProject: boolean;
	canEditTask: boolean;
	canEditSpecialization: boolean;
	canEditRole: boolean;
	user: User[];
	employee: Employee[];
}
