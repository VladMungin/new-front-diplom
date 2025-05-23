import { TASK_STATUS } from '../model'

export const getTextByStatus = (status: keyof typeof TASK_STATUS) => {
	switch(status){
		case 'PENDING': 
			return 'Приступить'
		case 'IN_WORK':
			return 'Завершить'
	}
};
