import { SelectedSort, sortComparators } from '@/app/catalog/catalog';
import { Product } from '@/app/catalog/page';

export type CatalogInitials = {
	initOnlyFavorites: boolean;
	initSelectedSort: SelectedSort;
	initFavoriteIds: number[];
	initSelectedCategories: string[];
	products: Product[];
};
export const useCatalogDerivedInitials = ({
	initSelectedSort,
	initFavoriteIds,
	initSelectedCategories,
	products,
}: CatalogInitials): {
	initProducts: Product[];
	initTotalCount: number;
} => {
	let initProducts = products;
	if (initSelectedSort !== '') {
		initProducts.sort(sortComparators[initSelectedSort]);
	}

	initProducts.forEach((product) => {
		product.favorite = initFavoriteIds.includes(product.id);
	});

	if (initSelectedCategories.length > 0) {
		initProducts = initProducts.filter((product) =>
			initSelectedCategories.includes(product.category)
		);
	}

	return {
		initProducts,
		initTotalCount: initProducts.length,
	};
};
