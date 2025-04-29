import { Employee } from '@/entities/employee';
import { Task } from '@/entities/task';
import { User } from '@/entities/user';

export interface Project {
	id: string;
	name: string;
	description: string;
	user: User;
	userId: string;
	employees: Employee[];
	tasks: Task[];
}

export interface ProjectRequest {
	name: string;
	description: string;
	userId: string;
	employeeIds?: string[];
}
