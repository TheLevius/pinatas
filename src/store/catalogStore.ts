import {
	InitForms,
	SelectedSort,
	sortComparators,
} from './../app/catalog/catalog';
import { create } from 'zustand';
type Product = {
	id: number;
	sku: string;
	name: string;
	price: number;
	category: string;
	description: string;
	favorite: boolean;
	images: string[];
};

type State = {
	products: Product[];
	categories: string[];
	favoriteIds: Set<number>;
	selectedSort: SelectedSort;
	selectedCategories: string[];
	onlyFavorites: boolean;
	limit: number;
	totalCount: number;
	page: number;
	startProducts: number;
	endProducts: number;
	currentPageProducts: Product[];
};

type Actions = {
	setProducts: (newProducts: Product[]) => void;
	switchFavorite: (favId: number) => void;
	setSelectedSort: (selectedSort: SelectedSort) => void;
	setSelectedCategories: (selectedCategories: string[]) => void;
	toggleOnlyFavorites: (onlyFavorites: boolean) => void;
	setClientSettings: (clientSettigs: InitForms) => void;
	setPage: (page: number) => void;
	getFavoriteProducts: () => Product[];
};
export const initPage = 1;
export const initLimit = 2;
type DerivedProperties = {
	totalCount: number;
	page: number;
	startProducts: number;
	endProducts: number;
	currentPageProducts: Product[];
};
const computeCurrent = (
	products: Product[],
	limit: number,
	page: number
): DerivedProperties => {
	const totalCount = products.length;
	const newTotalPages = totalCount > 0 ? Math.ceil(totalCount / limit) : 1;
	const newPage = Math.min(page, newTotalPages);
	const newStartProducts = (newPage - 1) * limit;
	const newEndProducts = newPage * limit;
	const newCurrentPageProducts = products.slice(
		newStartProducts,
		newEndProducts
	);
	return {
		page: newPage,
		totalCount,
		startProducts: newStartProducts,
		endProducts: newEndProducts,
		currentPageProducts: newCurrentPageProducts,
	};
};
export const useCatalog = create<State & Actions>((set, get) => ({
	products: [],
	categories: [],
	favoriteIds: new Set(),
	selectedSort: '',
	selectedCategories: [],
	onlyFavorites: false,
	limit: initLimit,
	totalCount: 0,
	page: 0,
	startProducts: 0,
	endProducts: 0,
	currentPageProducts: [],

	setProducts: (newProducts: Product[]) =>
		set(() => ({
			products: newProducts,
			categories: Array.from(new Set(newProducts.map((p) => p.category))),
		})),
	switchFavorite: (favId) =>
		set(({ products, favoriteIds, limit, page, onlyFavorites }) => {
			if (favoriteIds.has(favId)) {
				favoriteIds.delete(favId);
			} else {
				favoriteIds.add(favId);
			}
			favoriteIds = new Set(favoriteIds);
			localStorage.setItem(
				'favoriteIds',
				JSON.stringify(Array.from(favoriteIds))
			);
			const updatedProducts = products.map((p) => {
				p.favorite = favoriteIds.has(p.id);
				return p;
			});
			let selectedProducts = [...updatedProducts];
			if (onlyFavorites) {
				selectedProducts = selectedProducts.filter((p) =>
					favoriteIds.has(p.id)
				);
			}
			return {
				products: updatedProducts,
				favoriteIds,
				...computeCurrent(selectedProducts, limit, page),
			};
		}),
	setSelectedSort: (selectedSort: SelectedSort) =>
		set(({ products, limit, onlyFavorites, favoriteIds }) => {
			localStorage.setItem('selectedSort', JSON.stringify(selectedSort));
			let selectedProducts = [...products];
			if (selectedSort !== '') {
				selectedProducts.sort(sortComparators[selectedSort]);
			}
			if (onlyFavorites) {
				selectedProducts = selectedProducts.filter((p) =>
					favoriteIds.has(p.id)
				);
			}

			return {
				selectedSort,
				...computeCurrent(selectedProducts, limit, 1),
			};
		}),
	setSelectedCategories: (selectedCategories: string[]) =>
		set(({ products, favoriteIds, onlyFavorites, limit }) => {
			localStorage.setItem(
				'selectedCategories',
				JSON.stringify(selectedCategories)
			);
			let selectedProducts = [...products];
			if (onlyFavorites) {
				selectedProducts = selectedProducts.filter((p) =>
					favoriteIds.has(p.id)
				);
			}
			selectedProducts = selectedProducts.filter((p) =>
				selectedCategories.includes(p.category)
			);

			return {
				selectedCategories,
				...computeCurrent(selectedProducts, limit, 1),
			};
		}),
	toggleOnlyFavorites: (isOnlyFavorites: boolean) =>
		set(({ products, favoriteIds, limit, page }) => {
			localStorage.setItem('onlyFavorites', JSON.stringify(isOnlyFavorites));
			let selectedProducts = [...products];
			if (isOnlyFavorites) {
				selectedProducts = selectedProducts.filter((p) =>
					favoriteIds.has(p.id)
				);
			}
			return {
				onlyFavorites: isOnlyFavorites,
				...computeCurrent(selectedProducts, limit, page),
			};
		}),

	setPage: (page) =>
		set(({ products, favoriteIds, onlyFavorites, limit }) => {
			let selectedProducts = [...products];
			if (onlyFavorites) {
				selectedProducts = selectedProducts.filter((p) =>
					favoriteIds.has(p.id)
				);
			}
			return {
				...computeCurrent(selectedProducts, limit, page),
			};
		}),
	setClientSettings: ({
		selectedSort,
		selectedCategories,
		favoriteIds,
		onlyFavorites,
	}: InitForms) =>
		set(({ products, categories, limit }) => {
			const newFavoriteIds = new Set(favoriteIds);
			let initProducts = products.map((p) => {
				p.favorite = newFavoriteIds.has(p.id);
				return p;
			});
			let selectedProducts = initProducts;
			if (onlyFavorites) {
				selectedProducts = selectedProducts.filter((p) =>
					newFavoriteIds.has(p.id)
				);
			}

			if (selectedCategories.length > 0) {
				selectedCategories = selectedCategories.filter((sc) =>
					categories.includes(sc)
				);
				selectedProducts = selectedProducts.filter((p) =>
					selectedCategories.includes(p.category)
				);
			}

			return {
				products: initProducts,
				selectedSort,
				selectedCategories,
				favoriteIds: newFavoriteIds,
				onlyFavorites,
				...computeCurrent(selectedProducts, limit, 1),
			};
		}),
	getFavoriteProducts: () => {
		const { products, favoriteIds } = get();
		return products.filter((p) => favoriteIds.has(p.id));
	},
}));
