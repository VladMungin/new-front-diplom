import { Project } from '@/entities/project'
import { Role, Task } from '@/entities/task'
import { Company, User } from '@/entities/user'

export interface Specialization {
  id?: string;
  name: string;
  tasks?: Task[];
  employees?: Employee[];
}

export interface Employee {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  roleId: string;
  user: User;
  userId: string;
  company: Company;
  companyId: string;
  projects: Project[];
  tasks: Task[];
  specialization: Specialization;
  specializationId: string;
}