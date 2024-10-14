'use client';
import Link from 'next/link';
import { CatalogProps, Product } from './page';
import { useEffect, useRef, useState, MouseEvent } from 'react';
import styles from './catalog.module.scss';
import Image from 'next/image';
import { makeDisplayPageNumbers } from '@/utils/makeDisplayPageNumbers';
import { useInitFromLocalStorage } from '@/hooks/useLocalStorage';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { FavoriteHeart } from '../components/FavoriteHeart';
import { useCatalogDerivedInitials } from '@/hooks/useCatalogDerivedInitials';

const initPage = 1;
const initLimit = 6;
const initEndProducts = initPage * initLimit;
const initStartProducts = initEndProducts - initLimit;

const defaultPageRange = 10;

const localStorageStateNames = [
	'selectedSort',
	'favoriteIds',
	'selectedCategories',
];

type Option = {
	value: 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc';
	label: string;
};

const sortOptions: Option[] = [
	{ value: 'nameAsc', label: 'Name Asc' },
	{ value: 'nameDesc', label: 'Name Desc' },
	{ value: 'priceAsc', label: 'Price Asc' },
	{ value: 'priceDesc', label: 'Price Desc' },
];

type SortValue = Option['value'];
type SortComparators = {
	[key in SortValue]: (a: Product, b: Product) => number;
};
export const sortComparators: SortComparators = {
	nameAsc: (a, b) => (a.name > b.name ? 1 : -1),
	nameDesc: (a, b) => (a.name < b.name ? 1 : -1),
	priceAsc: (a, b) => a.price - b.price,
	priceDesc: (a, b) => b.price - a.price,
};

type SortComparatorKeys = keyof SortComparators;
export type SelectedSort = SortComparatorKeys | '';

const Catalog = (props: CatalogProps) => {
	const [initSelectedSort, initFavoriteIds, initSelectedCategories] =
		useInitFromLocalStorage(localStorageStateNames, props.categories);
	const { initProducts, initTotalCount } = useCatalogDerivedInitials({
		initSelectedSort,
		initFavoriteIds,
		initSelectedCategories,
		products: props.products,
	});

	const [selectedSort, setSelectedSort] =
		useState<SelectedSort>(initSelectedSort);
	const [favoriteIds, setFavoriteIds] = useState<number[]>(initFavoriteIds);
	const [selectedCategories, setSelectedCategories] = useState<string[]>(
		initSelectedCategories
	);
	const [totalCount, setTotalCount] = useState<number>(initTotalCount);
	const [page, setPage] = useState<number>(initPage);
	const [limit] = useState<number>(initLimit);
	const productsRef = useRef(initProducts);
	const [currentPageProducts, setCurrentPageProducts] = useState<Product[]>(
		initProducts.slice(initStartProducts, initEndProducts)
	);

	const totalPages = Math.ceil(totalCount / limit);
	const displayPageRange =
		totalPages < defaultPageRange ? totalPages : defaultPageRange;
	const displayPages = makeDisplayPageNumbers(
		page,
		totalPages,
		displayPageRange
	);

	const endProducts = page * limit;
	const startProducts = endProducts - limit;

	const switchFavorite = (e: MouseEvent<HTMLDivElement>, id: number) => {
		e.stopPropagation();
		e.preventDefault();
		let result: boolean;
		productsRef.current.some((product: Product) => {
			if (product.id === id) {
				result = !product.favorite;
				product.favorite = result;
				return true;
			}
			return false;
		});
		setFavoriteIds((prev) =>
			result ? [...prev, id] : prev.filter((favId) => favId !== id)
		);
	};

	const handleSort = (value: SortValue) => {
		productsRef.current.sort(sortComparators[value]);
		setSelectedSort(value);
	};

	const handleCategoryChange = (e: MultiSelectChangeEvent) =>
		setSelectedCategories(e.value);

	const handleSwitchPage = (dpNumber: number) => setPage(dpNumber);

	useEffect(() => {
		localStorage.setItem('selectedSort', JSON.stringify(selectedSort));
		if (selectedSort !== '') {
			productsRef.current.sort(sortComparators[selectedSort]);
			setCurrentPageProducts(
				productsRef.current.slice(startProducts, endProducts)
			);
		}
	}, [selectedSort]);

	useEffect(() => {
		localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));

		setCurrentPageProducts((prev) =>
			prev.map((product) => {
				product.favorite = favoriteIds.includes(product.id);
				return product;
			})
		);
	}, [favoriteIds]);

	useEffect(() => {
		localStorage.setItem(
			'selectedCategories',
			JSON.stringify(selectedCategories)
		);

		let newProducts = productsRef.current;
		if (selectedCategories.length > 0) {
			newProducts = newProducts.filter((product) =>
				selectedCategories.includes(product.category)
			);
		}

		setPage(initPage);
		setTotalCount(newProducts.length);
		setCurrentPageProducts(newProducts.slice(startProducts, endProducts));
	}, [selectedCategories]);

	useEffect(() => {
		setCurrentPageProducts(
			productsRef.current.slice(startProducts, endProducts)
		);
	}, [page, limit]);
	return (
		<div className={`${styles.container}`}>
			<div className={styles.panel}>
				<Link href={'/catalog/favorites'}>Favorites</Link>
			</div>
			<h1 className={styles.header}>Catalog Page</h1>
			<div className={`${styles.panel}`}>
				<MultiSelect
					value={selectedCategories}
					onChange={handleCategoryChange}
					options={props.categories.map((category) => ({
						value: category,
						label: category,
					}))}
					optionLabel='label'
					placeholder='Категория'
					maxSelectedLabels={3}
					className={`${styles.myContainer}`}
					display='chip'
					pt={{ wrapper: { className: styles.myContainerWrapper } }}
					suppressHydrationWarning
				/>
				<Dropdown
					value={selectedSort}
					onChange={(e) => handleSort(e.value)}
					options={sortOptions}
					optionLabel='label'
					placeholder='Сортировать'
					suppressHydrationWarning
				/>
			</div>

			{currentPageProducts.map((product) => {
				return (
					<div key={product.sku} className={`${styles.item}`}>
						<Link href={`/catalog/${product.sku}`}>
							<div className={`${styles.imageContainer}`}>
								<Image
									src={`/img/products/pin_bomb_red_45_0.jpg`}
									alt={product.sku}
									fill
								/>
								<div
									className={styles.favoriteButton}
									onClick={(e) => switchFavorite(e, product.id)}
								>
									<FavoriteHeart filled={product.favorite} />
								</div>
							</div>
							<p>{product.name}</p>
						</Link>
						<h3>{product.price} BYN</h3>
					</div>
				);
			})}
			<div
				className={`${styles.panel} ${styles.panelGap} ${styles.panelContentCenter}`}
			>
				{displayPages.map((dpNumber) => (
					<button
						key={dpNumber}
						onClick={() => handleSwitchPage(dpNumber)}
						className={styles.pageButton}
					>
						{dpNumber}
					</button>
				))}
			</div>
		</div>
	);
};
export default Catalog;
