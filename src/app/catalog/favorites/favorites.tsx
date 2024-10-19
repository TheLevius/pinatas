'use client';
import { useEffect, useRef } from 'react';
import { CatalogProps } from '../page';
import Link from 'next/dist/client/link';
import styles from './favorites.module.css';
import Pagination from 'antd/es/pagination/Pagination';
import Breadcrumb from 'antd/es/breadcrumb/Breadcrumb';
import { FavoriteHeart } from '../../components/FavoriteHeart';
import { InitForms, lsStateNames, sortOptions, SortValue } from '../catalog';
import Select, { SelectProps } from 'antd/es/select';
import Image from 'next/image';
import { initPage, useCatalog } from '@/store/catalogStore';

const breadcrumbItems = [
	{ title: 'Главная', href: '/' },
	{ title: 'Каталог', href: '/catalog' },
	{ title: 'Избранное', href: '/catalog/favorites' },
];

const Favorites = (props: CatalogProps) => {
	const {
		categories,
		selectedCategories,
		selectedSort,
		totalCount,
		limit,
		page,
		currentPageProducts,
		setProducts,
		setSelectedSort,
		setSelectedCategories,
		switchFavorite,
		setClientSettings,
		setPage,
	} = useCatalog((store) => store);

	const isMounted = useRef(false);

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
			initForms.onlyFavorites = true;
			setProducts(props.products);
			setClientSettings(initForms);
		}
	}, []);

	return (
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
					className={`${styles.sortSelect}`}
					onChange={handleSort}
					placeholder='Сортировать'
					options={sortOptions}
					value={selectedSort === '' ? null : selectedSort}
				/>
			</div>
			<div className={`${styles.panel}`}>
				<Select
					mode='multiple'
					allowClear
					placeholder='Категории'
					onChange={handleCategoryChange}
					value={selectedCategories}
					style={{ width: '100%' }}
					options={
						categories.map((category) => ({
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
									src={`/img/products/webp_1280/${product.images[0]}.webp`}
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
export default Favorites;
