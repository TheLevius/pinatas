'use client';
import { CatalogProps, Product } from './page';
import { useEffect, useRef, useState } from 'react';
import styles from './catalog.module.scss';
import Image from 'next/image';
import { useInitFromLocalStorage } from '@/hooks/useLocalStorage';
import {
	CatalogInitials,
	useCatalogDerivedInitials,
} from '@/hooks/useCatalogDerivedInitials';
import { FavoriteHeart } from '../components/FavoriteHeart';
import Select, { SelectProps } from 'antd/es/select';
import Pagination from 'antd/es/pagination/Pagination';
import Breadcrumb from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import Switch from 'antd/es/switch';

const initPage = 1;
const initLimit = 4;
const initEndProducts = initPage * initLimit;
const initStartProducts = initEndProducts - initLimit;

const breadcrumbItems = [
	{ title: 'Главная', href: '/' },
	{ title: 'Каталог', href: '/catalog' },
];
export type LocalStorageStateNameCortege = [
	'onlyFavorites',
	'selectedSort',
	'favoriteIds',
	'selectedCategories'
];
export type DerivedInitials = Omit<CatalogInitials, 'products'>;
const lsStateNames: LocalStorageStateNameCortege = [
	'onlyFavorites',
	'selectedSort',
	'favoriteIds',
	'selectedCategories',
];

type Option = {
	value: 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc';
	label: string;
};

const sortOptions: Option[] = [
	{ value: 'nameAsc', label: 'название ↑' },
	{ value: 'nameDesc', label: 'название ↓' },
	{ value: 'priceAsc', label: 'цена ↑' },
	{ value: 'priceDesc', label: 'цена ↓' },
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
	// const {
	// 	initSelectedSort,
	// 	initFavoriteIds,
	// 	initSelectedCategories,
	// 	initOnlyFavorites,
	// } = useInitFromLocalStorage(
	// 	localStorageStateNames as string[],
	// 	props.categories
	// );
	// const { initProducts, initTotalCount } = useCatalogDerivedInitials({
	// 	initOnlyFavorites,
	// 	initSelectedSort,
	// 	initFavoriteIds,
	// 	initSelectedCategories,
	// 	products: props.products,
	// });

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

	const endProducts = page * limit;
	const startProducts = endProducts - limit;

	const switchFavorite = (id: number) => {
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

	const handleOnlyFavorites = (onlyFavorites: boolean) => {
		setOnlyFavorites(onlyFavorites);
	};

	const handleSort = (value: SortValue) => {
		productsRef.current.sort(sortComparators[value]);
		setSelectedSort(value);
	};

	const handleCategoryChange = (value: string[]) =>
		setSelectedCategories(value);

	const handleChangePage = (page: number) => setPage(page);

	useEffect(() => {
		const initValues: DerivedInitials = {
			initOnlyFavorites: false,
			initSelectedSort: '',
			initFavoriteIds: [],
			initSelectedCategories: [],
		};
		const lsInitials = lsStateNames.reduce((initValues, stateName) => {
			const rawValue = localStorage.getItem(stateName);
			const isNull = rawValue === null;
			switch (stateName) {
				case lsStateNames[0]: {
					initValues.initOnlyFavorites = isNull ? false : JSON.parse(rawValue);
					console.log(initValues.initOnlyFavorites);
					break;
				}
				case lsStateNames[1]: {
					initValues.initSelectedSort = isNull ? '' : JSON.parse(rawValue);
					break;
				}
				case lsStateNames[2]: {
					initValues.initFavoriteIds = isNull ? [] : JSON.parse(rawValue);
					break;
				}
				case lsStateNames[3]: {
					initValues.initSelectedCategories = isNull
						? []
						: JSON.parse(rawValue).filter((category: string) =>
								props.categories.includes(category)
						  );
					break;
				}
			}
			return initValues;
		}, initValues as DerivedInitials);

		setOnlyFavorites(lsInitials.initOnlyFavorites);
		setSelectedSort(lsInitials.initSelectedSort);
		setFavoriteIds(lsInitials.initFavoriteIds);
		setSelectedCategories(lsInitials.initSelectedCategories);
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
		localStorage.setItem('onlyFavorites', JSON.stringify(onlyFavorites));

		let newProducts = productsRef.current;
		if (onlyFavorites) {
			newProducts = newProducts.filter((product) => product.favorite);
		}
		if (selectedCategories.length > 0) {
			newProducts = newProducts.filter((product) =>
				selectedCategories.includes(product.category)
			);
		}

		setPage(initPage);
		setTotalCount(newProducts.length);
		setCurrentPageProducts(newProducts.slice(startProducts, endProducts));
	}, [selectedCategories, onlyFavorites, page, limit]);

	return (
		<div className={`${styles.container}`}>
			<div className={styles.panel}>
				<Breadcrumb items={breadcrumbItems} />
			</div>
			<div className={`${styles.panel} ${styles.contentCenter}`}>
				<Link href={'/catalog/favorites'}>Favorites</Link>
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
									<FavoriteHeart filled={product.favorite} />
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
