export interface PagesI {
	label: string;
	href?: string;
	items?: PagesI[];
}

export const Pages: PagesI[] = [
	{
		label: 'Проекты',
		items: [
			{
				label: 'Мои проекты',
				href: '/projects',
			},
			{ label: 'Все проекты', href: '/project/all-projects' },
			{ label: 'Создать проект', href: '/project/create' },
		],
	},
	{
		label: 'Задачи',
		items: [
			{
				label: 'Мои задач',
				href: '/tasks',
			},
			{
				label: 'Все задачи',
				href: '/all-tasks',
			},
			{
				label: 'Создать задачу',
				href: '/tasks/create',
			},
		],
	},
	{
		label: 'Сотрудники',
		items: [
			{
				label: 'Все сотрудники',
				href: '/employee/all-employees',
			},
			{
				label: 'Добавить сотрудника',
				href: '/employee/create',
			},
		],
	},
];
