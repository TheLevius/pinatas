'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CatalogProps, Product } from './page';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { makeDisplayPageNumbers } from '@/utils/makeDisplayPageNumbers';
import { MultiValue, SingleValue } from 'react-select';
const Select = dynamic(() => import('react-select'), { ssr: false });

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
] as const;

type SortValue = (typeof sortOptions)[number]['value'];
type SortLabel = (typeof sortOptions)[number]['label'];

type Option = {
	value: SortValue;
	label: SortLabel;
};

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
type SelectedSort = SortComparatorKeys | '';

const Catalog = (props: CatalogProps) => {
	const productsRef = useRef(props.products);

	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedSortType, setSelectedSortType] = useState<SelectedSort>('');
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

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

	const handleSort = (singleValue: SingleValue<Option>) => {
		if (singleValue !== null) {
			productsRef.current.sort(sortComparators[singleValue.value]);
			setSelectedSortType(singleValue.value);
		}
	};

	const handleCategoryChange = (newValues: MultiValue<Option>) => {
		setSelectedCategories(newValues.map((option) => option.value));
	};

	const handleSwitchPage = (dpNumber: number) => setPage(dpNumber);

	useEffect(() => {
		const [selectedSortLS, favoriteIdsLS, selectedCategoriesLS] =
			localStorageStateNames.map((stateName) => {
				const rawValue = localStorage.getItem(stateName);
				const isNull = rawValue === null;
				if (stateName === localStorageStateNames[0]) {
					return isNull ? '' : JSON.parse(rawValue);
				}
				return isNull ? [] : JSON.parse(rawValue);
			}) as [SelectedSort, number[], string[]];

		if (selectedSortLS !== '') {
			productsRef.current.sort(sortComparators[selectedSortLS]);
		}
		setSelectedSortType(selectedSortLS);
		console.log(favoriteIdsLS);
		if (favoriteIdsLS.length > 0) {
			favoriteIdsLS.forEach((favId) =>
				productsRef.current.some((product) => {
					if (product.id === favId) {
						product.favorite = true;
						return true;
					}
					return false;
				})
			);
		}
		setFavoriteIds(favoriteIdsLS);

		if (selectedCategoriesLS.length > 0) {
			const newSelectedProducts = productsRef.current.filter((product) =>
				selectedCategoriesLS.includes(product.category)
			);
			const newTotalCount = newSelectedProducts.length;
			setTotalCount(newTotalCount);
		}
		setSelectedCategories(selectedCategoriesLS);
	}, []);

	useEffect(() => {
		if (selectedSortType !== '') {
			productsRef.current.sort(sortComparators[selectedSortType]);
			setCurrentPageProducts(
				productsRef.current.slice(startProducts, endProducts)
			);
		}
	}, [selectedSortType]);

	useEffect(() => {
		if (favoriteIds.length > 0) {
			localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
		} else {
			localStorage.removeItem('favoriteIds');
		}
		setCurrentPageProducts((prev) =>
			prev.map((product) => {
				product.favorite = favoriteIds.includes(product.id);
				return product;
			})
		);
	}, [favoriteIds]);

	useEffect(() => {
		let newProducts = productsRef.current;
		if (selectedCategories.length > 0) {
			localStorage.setItem(
				'selectedCategories',
				JSON.stringify(selectedCategories)
			);
			newProducts = newProducts.filter((product) =>
				selectedCategories.includes(product.category)
			);
		} else {
			localStorage.removeItem('selectedCategories');
		}
		setTotalCount(newProducts.length);
		setCurrentPageProducts(newProducts.slice(startProducts, endProducts));
	}, [selectedCategories]);

	useEffect(() => {
		setCurrentPageProducts(
			productsRef.current.slice(startProducts, endProducts)
		);
	}, [page, limit]);
	console.log('rerender -----');
	return (
		<div>
			<h2>Версия Pre-Alpha</h2>
			<div className={styles.wrapper}>
				<div className={`${styles.container} ${styles.spacebetween}`}>
					<Select
						onChange={(newValues) =>
							handleCategoryChange(newValues as MultiValue<Option>)
						}
						isMulti
						name='categories'
						placeholder='Категория'
						options={props.categories.map((category) => ({
							value: category,
							label: category,
						}))}
						className='basic-multi-select'
						classNamePrefix='select'
					/>
					<Select
						onChange={(singleValue) =>
							handleSort(singleValue as SingleValue<Option>)
						}
						name='sort'
						placeholder={'Сортировать'}
						value={sortOptions.find(
							(option) => option.value === selectedSortType
						)}
						options={sortOptions}
						className='basic-multi-select'
						classNamePrefix='select'
					/>
				</div>

				<ul className={`${styles.container}`}>
					{currentPageProducts.map((product) => {
						return (
							<li
								key={product.sku}
								className={`${styles.item} ${styles.cardFlex}`}
							>
								<Link href={`/catalog/${product.sku}`}>
									<div className={`${styles.imageContainer}`}>
										<Image
											src={`/img/products/pin_bomb_red_45_0.jpg`}
											alt={product.sku}
											fill
										/>
									</div>
									<h2>{product.name}</h2>
								</Link>
								<h3 onClick={() => switchFavorite(product.id)}>
									click to switch {product.favorite ? '♥️' : '♡'}
								</h3>
								<h3>{product.price} BYN</h3>
							</li>
						);
					})}
				</ul>
				<ul className={`${styles.container} ${styles.contentCenter}`}>
					{displayPages.map((dpNumber) => (
						<li key={dpNumber}>
							<button
								onClick={() => handleSwitchPage(dpNumber)}
								className={styles.pageButton}
							>
								{dpNumber}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
export default Catalog;
