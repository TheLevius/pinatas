'use client';
import Link from 'next/link';
// import dynamic from 'next/dynamic';
import { CatalogProps, Product } from './page';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { makeDisplayPageNumbers } from '@/utils/makeDisplayPageNumbers';
// import { MultiValue, SingleValue } from 'react-select';
import { useInitFromLocalStorage } from '@/hooks/useLocalStorage';
// const Select = dynamic(() => import('react-select'), { ssr: false });
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';

// const counter =
// 	(counter = 0) =>
// 	() =>
// 		++counter;
// const result = counter(0);

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

const sortOptions = [
	{ value: 'nameAsc', label: 'Name Asc' },
	{ value: 'nameDesc', label: 'Name Desc' },
	{ value: 'priceAsc', label: 'Price Asc' },
	{ value: 'priceDesc', label: 'Price Desc' },
] as const;

type SortValue = (typeof sortOptions)[number]['value'];
// type SortLabel = (typeof sortOptions)[number]['label'];

// type Option = {
// 	value: SortValue;
// 	label: SortLabel;
// };

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

	const [selectedSort] = useState<SelectedSort>(initSelectedSort);
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

	// const handleSort = (singleValue: SingleValue<Option>) => {
	// 	if (singleValue !== null) {
	// 		productsRef.current.sort(sortComparators[singleValue.value]);
	// 		setSelectedSort(singleValue.value);
	// 	}
	// };

	// const handleCategoryChange = (newValues: MultiValue<Option>) => {
	// 	setSelectedCategories(newValues.map((option) => option.value));
	// };
	const handleCategoryChange = (values: string[]) => {
		console.log('values--->: ', values);
		setSelectedCategories(values.slice());
	};

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
	console.log(sortOptions);
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
						optionValue='value'
						placeholder='Select Cities'
						maxSelectedLabels={3}
					/>
					{/* <MultiSelect
						value={selectedCategories.map((category) => ({
							value: category,
							label: category,
						}))}
						options={props.categories.map((category) => ({
							value: category,
							label: category,
						}))}
						onChange={(e) => handleCategoryChange(e.value)}
						optionLabel='name'
						display='chip'
						placeholder='Выбрать категорию'
						maxSelectedLabels={3}
						className={`${styles.box} p-multiselect-panel`}
					/> */}
					{/* <Select
						onChange={(newValues) =>
							handleCategoryChange(newValues as MultiValue<Option>)
						}
						isMulti
						name='categories'
						placeholder='Категория'
						value={selectedCategories.map((category) => ({
							value: category,
							label: category,
						}))}
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
						value={sortOptions.find((option) => option.value === selectedSort)}
						options={sortOptions}
						className='basic-multi-select'
						classNamePrefix='select'
					/> */}
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
