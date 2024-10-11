'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CatalogProps, Product, Version } from './page';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { makeDisplayPageNumbers } from '@/utils/makeDisplayPageNumbers';
import { MultiValue } from 'react-select';
const Select = dynamic(() => import('react-select'), { ssr: false });

type CategoryOption = {
	value: string;
	label: string;
};

const defaultPageRange = 10;

const Catalog = (props: CatalogProps) => {
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(
		props.products ?? []
	);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedSortType, setSelectedSortType] = useState<string>('');
	const [version] = useState<Version>(props.version);
	const [favorites, setFavorites] = useState<number[]>([]);

	const [page, setPage] = useState<number>(1);
	const [limit] = useState<number>(3);
	const [totalCount, setTotalCount] = useState<number>(props.products.length);

	const totalPages = Math.ceil(totalCount / limit);
	const displayPageRange =
		totalPages < defaultPageRange ? totalPages : defaultPageRange;
	const displayPages = makeDisplayPageNumbers(
		page,
		totalPages,
		displayPageRange
	);
	const sortTypes: Record<
		string,
		{ name: string; comparator: (a: Product, b: Product) => number }
	> = {
		nameAsc: {
			name: 'Name Asc',
			comparator: (a, b) => (a.name > b.name ? 1 : -1),
		},
		nameDesc: {
			name: 'Name Desc',
			comparator: (a, b) => (a.name < b.name ? 1 : -1),
		},
		priceAsc: { name: 'Price Asc', comparator: (a, b) => a.price - b.price },
		priceDesc: { name: 'Price Desc', comparator: (a, b) => b.price - a.price },
	};

	const switchFavorite = (id: number) => {
		setFavorites((prev) => {
			if (prev.includes(id)) {
				return prev.filter((favId) => favId !== id);
			}
			return [...prev, id];
		});
	};

	const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedSortType(e.target.value);
	};

	// const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
	// 	const values = Array.from(
	// 		e.target.selectedOptions,
	// 		(option) => option.value
	// 	);

	// 	setSelectedCategories(values);
	// };
	const handleCategoryChange = (newValues: MultiValue<CategoryOption>) => {
		setSelectedCategories(newValues.map((option) => option.value));
	};

	const handleSwitchPage = (dpNumber: number) => setPage(dpNumber);

	const endProducts = page * limit;
	const startProducts = endProducts - limit;
	const pageProducts = filteredProducts.slice(startProducts, endProducts);

	useEffect(() => {
		const localVersion = localStorage.getItem('version');
		if (localVersion === null || version.current !== Number(localVersion)) {
			localStorage.setItem('version', JSON.stringify(version));
		}
		const selectedCategoriesRaw = localStorage.getItem('selectedCategories');
		const favoritesRaw = localStorage.getItem('favorites');
		const selectedSortTypeRaw = localStorage.getItem('selectedSortType');

		if (selectedCategoriesRaw !== null) {
			const selectedCategoriesFromLS = JSON.parse(selectedCategoriesRaw);
			setSelectedCategories(selectedCategoriesFromLS);
		}

		if (favoritesRaw !== null) {
			const favoritesFromLS = JSON.parse(favoritesRaw);
			setFavorites(favoritesFromLS);
		}

		if (selectedSortTypeRaw !== null) {
			const selectedSortTypeFromLS = JSON.parse(selectedSortTypeRaw);
			setSelectedSortType(selectedSortTypeFromLS);
		}
	}, []);

	useEffect(() => {
		if (favorites.length > 0) {
			localStorage.setItem('favorites', JSON.stringify(favorites));
		} else {
			localStorage.removeItem('favorites');
		}

		setFilteredProducts((prevFilteredProducts) =>
			prevFilteredProducts.map((product) => {
				product.favorite = favorites.includes(product.id);
				return product;
			})
		);
	}, [favorites]);

	useEffect(() => {
		if (selectedCategories.length > 0) {
			localStorage.setItem(
				'selectedCategories',
				JSON.stringify(selectedCategories)
			);
		} else {
			localStorage.removeItem('selectedCategories');
		}
		let newFilteredProducts: Product[];
		if (selectedCategories.length > 0) {
			newFilteredProducts = props.products.filter((product) =>
				selectedCategories.includes(product.category)
			);
		} else {
			newFilteredProducts = props.products;
		}
		if (selectedSortType.length > 0) {
			newFilteredProducts = newFilteredProducts
				.slice()
				.sort(sortTypes[selectedSortType].comparator);
		}
		if (favorites.length > 0) {
			newFilteredProducts = newFilteredProducts.map((product) => {
				product.favorite = favorites.includes(product.id);
				return product;
			});
		}
		setFilteredProducts(newFilteredProducts);
	}, [selectedCategories]);

	useEffect(() => {
		if (selectedSortType !== '') {
			setFilteredProducts((prevFilteredProducts) => {
				const newFilteredProducts = prevFilteredProducts
					.slice()
					.sort(sortTypes[selectedSortType].comparator);
				return newFilteredProducts;
			});
		}
	}, [selectedSortType]);

	useEffect(() => {
		setTotalCount(filteredProducts.length);
	}, [filteredProducts, totalCount]);

	return (
		<div>
			<h2>Версия Pre-Alpha</h2>
			<div className={styles.wrapper}>
				<div className={`${styles.container} ${styles.spacebetween}`}>
					{/* <select
						id={'categories'}
						multiple={true}
						onChange={handleCategoryChange}
						value={selectedCategories}
					>
						{props.categories.map((category) => {
							return (
								<option key={category} value={category}>
									{category}
								</option>
							);
						})}
					</select> */}
					<Select
						onChange={(newValues) =>
							handleCategoryChange(newValues as MultiValue<CategoryOption>)
						}
						isMulti
						name='colors'
						options={props.categories.map((category) => ({
							value: category,
							label: category,
						}))}
						className='basic-multi-select'
						classNamePrefix='select'
					/>

					<select onChange={handleSort} id={'sort'}>
						{Object.entries(sortTypes).map((entry) => (
							<option key={entry[0]} value={entry[0]}>
								{entry[1].name}
							</option>
						))}
					</select>
				</div>

				<ul className={`${styles.container}`}>
					{pageProducts.map((product) => {
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
