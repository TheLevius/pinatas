'use client';
import { SelectedSort } from '@/app/catalog/catalog';

export const useInitFromLocalStorage = (
	keys: string[],
	categories: string[]
): [SelectedSort, number[], string[]] => {
	if (typeof window === 'undefined') {
		return ['', [], []];
	}

	const localStorageInitials = keys.map((stateName, i) => {
		const rawValue = localStorage.getItem(stateName);
		const isNull = rawValue === null;
		if (i === 0) {
			return isNull ? '' : JSON.parse(rawValue);
		}
		return isNull ? [] : JSON.parse(rawValue);
	}) as [SelectedSort, number[], string[]];
	localStorageInitials[2] = localStorageInitials[2].filter((category) =>
		categories.includes(category)
	);

	return localStorageInitials;
};
