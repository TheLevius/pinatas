'use client';
import { CatalogProps, Product } from './page';
import { useEffect, useRef, useState } from 'react';
import styles from './catalog.module.scss';
import Image from 'next/image';
import { FavoriteHeart } from '../components/FavoriteHeart';
import Select, { SelectProps } from 'antd/es/select';
import Pagination from 'antd/es/pagination/Pagination';
import Breadcrumb from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import Switch from 'antd/es/switch';

export const initPage = 1;
export const initLimit = 4;
export const initEndProducts = initPage * initLimit;
export const initStartProducts = initEndProducts - initLimit;

const breadcrumbItems = [
	{ title: 'Главная', href: '/' },
	{ title: 'Каталог', href: '/catalog' },
];
export type LocalStorageStateNameTuple = [
	'favoriteIds',
	'selectedCategories',
	'selectedSort',
	'onlyFavorites'
];

export const lsStateNames: LocalStorageStateNameTuple = [
	'favoriteIds',
	'selectedCategories',
	'selectedSort',
	'onlyFavorites',
];

export type InitForms = {
	onlyFavorites: boolean;
	selectedSort: SelectedSort;
	favoriteIds: number[];
	selectedCategories: string[];
};

type Option = {
	value: 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc';
	label: string;
};

export const sortOptions: Option[] = [
	{ value: 'nameAsc', label: 'название ↑' },
	{ value: 'nameDesc', label: 'название ↓' },
	{ value: 'priceAsc', label: 'цена ↑' },
	{ value: 'priceDesc', label: 'цена ↓' },
];

export type SortValue = Option['value'];
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

const initCount =
	(c = 0) =>
	() =>
		++c;
const count = initCount(0);

const Catalog = (props: CatalogProps) => {
	const [selectedSort, setSelectedSort] = useState<SelectedSort>('');
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
	const [totalCount, setTotalCount] = useState<number>(props.products.length);
	const [page, setPage] = useState<number>(initPage);
	const [limit] = useState<number>(initLimit);
	const productsRef = useRef(props.products);
	const [currentPageProducts, setCurrentPageProducts] = useState<Product[]>(
		props.products.slice(initStartProducts, initEndProducts)
	);
	const isMounted = useRef(false);

	const endProducts = page * limit;
	const startProducts = endProducts - limit;

	const switchFavorite = (id: number) => {
		const product = productsRef.current.find((p) => p.id === id);
		setFavoriteIds((prev) =>
			product?.favorite ? prev.filter((favId) => favId !== id) : [...prev, id]
		);
	};

	const handleOnlyFavorites = (onlyFavorites: boolean) => {
		setOnlyFavorites(onlyFavorites);
	};

	const handleSort = (value: SortValue) => {
		setSelectedSort(value);
	};

	const handleCategoryChange = (value: string[]) =>
		setSelectedCategories(value);

	const handleChangePage = (page: number) => setPage(page);

	useEffect(() => {
		if (!isMounted.current) {
			const initForms: InitForms = {
				favoriteIds: [],
				selectedCategories: [],
				selectedSort: '',
				onlyFavorites: false,
			};
			lsStateNames.forEach((key) => {
				const rawValue = localStorage.getItem(key);
				if (rawValue !== null) {
					(initForms[key] as InitForms[keyof InitForms]) = JSON.parse(rawValue);
				}
			});
			isMounted.current = true;
			setFavoriteIds(initForms.favoriteIds);
			setSelectedCategories(initForms.selectedCategories);
			setSelectedSort(initForms.selectedSort);
			setOnlyFavorites(initForms.onlyFavorites);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('selectedSort', JSON.stringify(selectedSort));

		if (selectedSort !== '') {
			productsRef.current.sort(sortComparators[selectedSort]);
		}
		let newProducts: Product[] = productsRef.current;
		if (onlyFavorites) {
			newProducts = newProducts.filter((p) => p.favorite);
		}
		setCurrentPageProducts(newProducts.slice(startProducts, endProducts));
		setPage(initPage);
	}, [selectedSort]);

	useEffect(() => {
		localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));

		productsRef.current.forEach((p) => {
			p.favorite = favoriteIds.includes(p.id);
		});
		let newProducts: Product[] = productsRef.current;
		if (onlyFavorites) {
			newProducts = newProducts.filter((p) => p.favorite);
		}

		setCurrentPageProducts(newProducts.slice(startProducts, endProducts));
	}, [favoriteIds]);

	useEffect(() => {
		localStorage.setItem(
			'selectedCategories',
			JSON.stringify(selectedCategories)
		);

		let newProducts: Product[] = productsRef.current;
		if (selectedCategories.length > 0) {
			newProducts = newProducts.filter((product) =>
				selectedCategories.includes(product.category)
			);
		}
		if (onlyFavorites) {
			newProducts = newProducts.filter((product) => product.favorite);
		}
		setCurrentPageProducts(newProducts.slice(startProducts, endProducts));
		setTotalCount(newProducts.length);
		setPage(initPage);
	}, [selectedCategories]);

	useEffect(() => {
		localStorage.setItem('onlyFavorites', JSON.stringify(onlyFavorites));
		let newProducts: Product[] = productsRef.current;
		if (onlyFavorites) {
			newProducts = newProducts.filter((p) => p.favorite);
		}
		setCurrentPageProducts(newProducts.slice(startProducts, endProducts));
		setTotalCount(newProducts.length);
		setPage(initPage);
	}, [onlyFavorites]);

	useEffect(() => {
		let newProducts = productsRef.current;
		if (onlyFavorites) {
			newProducts = newProducts.filter((p) => p.favorite);
		}
		setCurrentPageProducts(newProducts.slice(startProducts, endProducts));
	}, [page, limit]);

	useEffect(() => {
		setPage(1);
	}, [limit]);
	console.log('render', count());
	return (
		<div className={`${styles.container}`}>
			<div className={styles.panel}>
				<Breadcrumb items={breadcrumbItems} />
			</div>
			<div className={`${styles.panel} ${styles.contentCenter}`}>
				<Link href={'/catalog/favorites'}>Избранное</Link>
			</div>

			<h1 className={styles.header}>Каталог</h1>
			<div className={`${styles.panel} ${styles.spacebetween}`}>
				<Select
					style={{ width: 120 }}
					onChange={handleSort}
					placeholder='Сортировать'
					options={sortOptions}
				/>
				<div className={`${styles.box}`}>
					<p>Избранное</p>
					<Switch checked={onlyFavorites} onChange={handleOnlyFavorites} />
				</div>
			</div>
			<div className={`${styles.panel}`}>
				<Select
					mode='multiple'
					allowClear
					style={{ width: '100%' }}
					placeholder='Категории'
					onChange={handleCategoryChange}
					value={selectedCategories}
					options={
						props.categories.map((category) => ({
							value: category,
							label: category,
						})) as SelectProps['options']
					}
				/>
			</div>

			{currentPageProducts.map((product) => {
				return (
					<div key={product.sku} className={`${styles.item}`}>
						<Link
							href={`/catalog/${product.sku}`}
							className={`${styles.imageContainer}`}
						>
							<div className={`${styles.imageContainer}`}>
								<Image
									src={`/img/products/pin_bomb_red_45_0.jpg`}
									alt={product.sku}
									fill
									sizes='(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px'
									style={{ objectFit: 'cover', objectPosition: 'center' }}
									priority
								/>
								<div
									className={styles.favoriteButton}
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();
										switchFavorite(product.id);
									}}
								>
									<FavoriteHeart favorite={product.favorite} />
								</div>
							</div>
							<p>{product.name}</p>
							<h3>{product.price} BYN</h3>
						</Link>
					</div>
				);
			})}
			<div className={`${styles.panel} ${styles.contentCenter}`}>
				<Pagination
					defaultCurrent={initPage}
					current={page}
					total={totalCount}
					defaultPageSize={limit}
					pageSize={limit}
					align='center'
					onChange={handleChangePage}
				/>
			</div>
		</div>
	);
};
export default Catalog;
