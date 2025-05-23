import { Employee, Specialization } from '@/entities/employee';
import { Project } from '@/entities/project';
import { User } from '@/entities/user';
import { TASK_STATUS } from './_constants';

export interface Task {
	id?: number;
	status: keyof typeof TASK_STATUS;
	title: string;
	description: string;
	employeeId: string;
	projectId: string;
	createdAt: Date;
	timeToCompleat: number;
	currentTime: number;
	typeOfTaskId: string;
	specializationId: string;
	employee?: Employee;
	project?: Project;
	specialization?: Specialization;
	type: TypeOfTask;
}

export interface Role {
	id?: string;
	name: string;
	canEditEmployee: boolean;
	canEditProject: boolean;
	canEditTask: boolean;
	canEditSpecialization: boolean;
	canEditRole: boolean;
	user?: User[];
	employee?: Employee[];
}

export interface TypeOfTask {
	id?: string;
	name: string;
	task?: Task[];
}
