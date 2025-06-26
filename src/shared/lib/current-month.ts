import {TaskLog} from "@/entities/task/model/_types";

export function groupAndSortByMonth(data: TaskLog[]) {
	const grouped = {};

	// Группируем данные по году-месяцу
	data.forEach(item => {
		const date = new Date(item.createdAt);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const key = `${year}-${month}`;

		if (!grouped[key]) {
			grouped[key] = [];
		}
		grouped[key].push(item);
	});

	// Сортируем ключи (год-месяц) в порядке возрастания
	const sortedKeys = Object.keys(grouped).sort();

	// Создаем новый объект с отсортированными ключами
	const result = {};
	sortedKeys.forEach(key => {
		result[key] = grouped[key];
	});

	return result;
}
