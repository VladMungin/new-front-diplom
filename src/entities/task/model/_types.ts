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
	taskLogs?: TaskLog[];
	employee?: Employee;
	project?: Project;
	specialization?: Specialization;
	type: TypeOfTask;
	createdById: string;
	createdBy: {
		name: string;
	};
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

export interface CreateTaskLogDto {
	taskId: number;
	employeeId: string;
	hoursWorked?: number;
}

export interface UpdateTaskLogDto {
	taskId?: number;
	employeeId?: string;
	hoursWorked?: number | null;
}

export interface TaskLog {
	id: string;
	taskId: number;
	employeeId: string;
	createdAt: string;
	hoursWorked: number | null;
	task: { id: number; title: string };
	employee: { id: string; fullName: string };
	action?: string;
}

export interface UpdateTaskStatusDto {
	status: keyof typeof TASK_STATUS;
}

export interface UpdateTaskTimeDto {
	currentTime: number;
}

export interface UpdateTaskEmployeeDto {
	employeeId?: string | null;
	autoSet?: boolean;
	specializationId?: string;
}
