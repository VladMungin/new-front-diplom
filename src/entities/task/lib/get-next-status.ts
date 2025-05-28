import { TASK_STATUS } from '../model';

export const getNextStatus = (
	status: keyof typeof TASK_STATUS
): keyof typeof TASK_STATUS => {
	switch (status) {
		case 'PENDING':
			return 'IN_WORK';
		case 'IN_WORK':
			return 'DONE';
		case 'DONE':
			return 'DONE';
	}
};
