'use client';
import Link from 'next/link';
import { CatalogProps, Product } from './page';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { makeDisplayPageNumbers } from '@/utils/makeDisplayPageNumbers';
import { useInitFromLocalStorage } from '@/hooks/useLocalStorage';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';

// const counter =
// 	(counter = 0) =>
// 	() =>
// 		++counter;
// const result = counter(0);

const initPage = 1;
const initLimit = 4;
const initEndProducts = initPage * initLimit;
const initStartProducts = initEndProducts - initLimit;

const defaultPageRange = 10;

const localStorageStateNames = [
	'selectedSort',
	'favoriteIds',
	'selectedCategories',
];

const sortOptions = [
	{ value: 'nameAsc', label: 'Name Asc' },
	{ value: 'nameDesc', label: 'Name Desc' },
	{ value: 'priceAsc', label: 'Price Asc' },
	{ value: 'priceDesc', label: 'Price Desc' },
];

type SortValue = (typeof sortOptions)[number]['value'];

type SortComparators = {
	[key in SortValue]: (a: Product, b: Product) => number;
};

const sortComparators: SortComparators = {
	nameAsc: (a, b) => (a.name > b.name ? 1 : -1),
	nameDesc: (a, b) => (a.name < b.name ? 1 : -1),
	priceAsc: (a, b) => a.price - b.price,
	priceDesc: (a, b) => b.price - a.price,
};

type SortComparatorKeys = keyof SortComparators;
export type SelectedSort = SortComparatorKeys | '';

const Catalog = (props: CatalogProps) => {
	const productsRef = useRef(props.products);
	const [initSelectedSort, initFavoriteIds, initSelectedCategories] =
		useInitFromLocalStorage(localStorageStateNames, props.categories);

	const [selectedSort, setSelectedSort] = useState<string>(initSelectedSort);
	const [favoriteIds, setFavoriteIds] = useState<number[]>(initFavoriteIds);
	const [selectedCategories, setSelectedCategories] = useState<string[]>(
		initSelectedCategories
	);

	const [currentPageProducts, setCurrentPageProducts] = useState<Product[]>(
		productsRef.current.slice(initStartProducts, initEndProducts)
	);

	const [totalCount, setTotalCount] = useState<number>(props.products.length);
	const [page, setPage] = useState<number>(initPage);
	const [limit] = useState<number>(initLimit);
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

	const switchFavorite = (id: number) => {
		let result: boolean;
		productsRef.current.some((product) => {
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
		if (value !== null) {
			productsRef.current.sort(sortComparators[value]);
			setSelectedSort(value);
		}
	};

	const handleCategoryChange = (values: string[]) =>
		setSelectedCategories(values);

	const handleSwitchPage = (dpNumber: number) => setPage(dpNumber);

	useEffect(() => {
		if (selectedSort !== '') {
			productsRef.current.sort(sortComparators[selectedSort]);
		}

		productsRef.current.forEach((product) => {
			product.favorite = favoriteIds.includes(product.id);
		});

		if (selectedCategories.length > 0) {
			const newSelectedProducts = productsRef.current.filter((product) =>
				selectedCategories.includes(product.category)
			);
			setCurrentPageProducts(
				newSelectedProducts.slice(startProducts, endProducts)
			);
			// перенести в инициализацию
			setTotalCount(newSelectedProducts.length);
		}
	}, []);

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
		<div className={styles.wrapper}>
			<h2>Версия Pre-Alpha</h2>
			<div className={`${styles.container}`}>
				<div className={`${styles.panel}`}>
					<MultiSelect
						value={selectedCategories}
						onChange={(e: MultiSelectChangeEvent) =>
							handleCategoryChange(e.value)
						}
						options={props.categories.map((category) => ({
							value: category,
							label: category,
						}))}
						optionLabel='label'
						placeholder='Категория'
						maxSelectedLabels={3}
					/>
					<Dropdown
						value={selectedSort}
						onChange={(e) => handleSort(e.value)}
						options={sortOptions}
						optionLabel='label'
						placeholder='Сортировать'
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
								</div>
								<p>{product.name}</p>
							</Link>
							<p onClick={() => switchFavorite(product.id)}>
								click to switch {product.favorite ? '♥️' : '♡'}
							</p>
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
		</div>
	);
};
export default Catalog;
