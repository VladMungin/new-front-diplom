'use client';

import { CreateTaskForm, Task } from '@/entities/task';

interface CreateTask extends Partial<Task> {
	'should-get-not-busy-employee'?: boolean;
}

export const CreateTask = () => {
	return <CreateTaskForm />;
};
