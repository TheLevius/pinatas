'use client';
import { useEffect, useRef, useState } from 'react';
import { CatalogProps, Product } from '../page';
import Link from 'next/dist/client/link';
import styles from './favorites.module.scss';
import Pagination from 'antd/es/pagination/Pagination';
import Breadcrumb from 'antd/es/breadcrumb/Breadcrumb';
import { FavoriteHeart } from '../../components/FavoriteHeart';
import {
	initEndProducts,
	InitForms,
	initPage,
	initStartProducts,
	LocalStorageStateNameTuple,
	lsStateNames,
	SelectedSort,
	sortComparators,
	sortOptions,
	SortValue,
} from '../catalog';
import Select, { SelectProps } from 'antd/es/select';
import Image from 'next/image';
import Head from 'next/head';

type WithoutLastStringItem<T extends string[]> = T extends [
	...infer Rest,
	string
]
	? Rest
	: never;

type LocalStorageStateNameFavTuple =
	WithoutLastStringItem<LocalStorageStateNameTuple>;

type InitFav = Omit<InitForms, 'onlyFavorites'>;
const lsStateFavNames: LocalStorageStateNameFavTuple = lsStateNames.slice(
	0,
	3
) as LocalStorageStateNameFavTuple;
const breadcrumbItems = [
	{ title: 'Главная', href: '/' },
	{ title: 'Каталог', href: '/catalog' },
	{ title: 'Избранное', href: '/catalog/favorites' },
];

const Favorites = (props: CatalogProps) => {
	const [selectedSort, setSelectedSort] = useState<SelectedSort>('');
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const [totalCount, setTotalCount] = useState<number>(0);
	const [page, setPage] = useState<number>(initPage);
	const [limit] = useState<number>(2);
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

	const handleSort = (value: SortValue) => {
		setSelectedSort(value);
	};

	const handleCategoryChange = (value: string[]) =>
		setSelectedCategories(value);

	const handleChangePage = (page: number) => setPage(page);

	useEffect(() => {
		if (!isMounted.current) {
			const initForms: InitFav = {
				selectedSort: '',
				favoriteIds: [],
				selectedCategories: [],
			};
			lsStateFavNames.forEach((key) => {
				const rawValue = localStorage.getItem(key);
				if (rawValue !== null) {
					(initForms[key] as InitFav[keyof InitFav]) = JSON.parse(rawValue);
				}
			});
			isMounted.current = true;
			setSelectedSort(initForms.selectedSort);
			setFavoriteIds(initForms.favoriteIds);
			setSelectedCategories(initForms.selectedCategories);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('selectedSort', JSON.stringify(selectedSort));

		if (selectedSort !== '') {
			productsRef.current.sort(sortComparators[selectedSort]);
		}

		setCurrentPageProducts(
			productsRef.current.slice(startProducts, endProducts)
		);
		setPage(initPage);
	}, [selectedSort]);

	useEffect(() => {
		localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
		const newFavorites = productsRef.current.reduce((favs, product) => {
			product.favorite = favoriteIds.includes(product.id);
			if (product.favorite) {
				favs.push(product);
			}
			return favs;
		}, [] as Product[]);
		const totalPages = Math.ceil(newFavorites.length / limit);
		const newPage = Math.min(page, totalPages || 1);

		const newStartProducts = (newPage - 1) * limit;
		const newEndProducts = newPage * limit;
		setCurrentPageProducts(
			newFavorites.slice(newStartProducts, newEndProducts)
		);
		setTotalCount(favoriteIds.length);
	}, [favoriteIds]);

	useEffect(() => {
		localStorage.setItem(
			'selectedCategories',
			JSON.stringify(selectedCategories)
		);

		let newProducts: Product[] = productsRef.current.filter((p) =>
			favoriteIds.includes(p.id)
		);
		if (selectedCategories.length > 0) {
			newProducts = newProducts.filter((product) =>
				selectedCategories.includes(product.category)
			);
		}

		setCurrentPageProducts(newProducts.slice(startProducts, endProducts));
		setTotalCount(favoriteIds.length);
		setPage(initPage);
	}, [selectedCategories]);

	useEffect(() => {
		setCurrentPageProducts(
			productsRef.current
				.filter((p) => favoriteIds.includes(p.id))
				.slice(startProducts, endProducts)
		);
	}, [page]);

	useEffect(() => {
		setPage(1);
	}, [limit]);

	return (
		<>
			<Head>
				<title>Избранное</title>
				<meta name='description' content='Your favorite items in the catalog' />
				{/* Можно добавить и другие метатеги */}
			</Head>
			<div className={`${styles.container}`}>
				<div className={styles.panel}>
					<Breadcrumb items={breadcrumbItems} />
				</div>
				<div className={`${styles.panel} ${styles.contentCenter}`}>
					<Link href={'/catalog'}>Каталог</Link>
				</div>

				<h1 className={styles.header}>Избранное</h1>
				<div className={`${styles.panel} ${styles.spacebetween}`}>
					<Select
						className={`${styles.sortSelec}`}
						onChange={handleSort}
						placeholder='Сортировать'
						options={sortOptions}
					/>
				</div>
				<div className={`${styles.panel}`}>
					<Select
						mode='multiple'
						allowClear
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
		</>
	);
};
export default Favorites;
