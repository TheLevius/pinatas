'use client';
import { DerivedInitials } from '@/app/catalog/catalog';

export const useInitFromLocalStorage = (
	keys: string[],
	categories: string[]
): DerivedInitials => {
	const initValues: DerivedInitials = {
		initOnlyFavorites: false,
		initSelectedSort: '',
		initFavoriteIds: [],
		initSelectedCategories: [],
	};
	if (typeof window === 'undefined') {
		return initValues;
	}

	const localStorageInitials = keys.reduce((initValues, stateName) => {
		const rawValue = localStorage.getItem(stateName);
		const isNull = rawValue === null;
		switch (stateName) {
			case keys[0]: {
				initValues.initOnlyFavorites = !isNull;
				break;
			}
			case keys[1]: {
				initValues.initSelectedSort = isNull ? '' : JSON.parse(rawValue);
				break;
			}
			case keys[2]: {
				initValues.initFavoriteIds = isNull ? [] : JSON.parse(rawValue);
				break;
			}
			case keys[3]: {
				initValues.initSelectedCategories = isNull
					? []
					: JSON.parse(rawValue).filter((category: string) =>
							categories.includes(category)
					  );
				break;
			}
		}
		return initValues;
	}, initValues as DerivedInitials);

	return localStorageInitials;
};
