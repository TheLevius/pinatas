'use client';
import Link from 'next/link';
import { CatalogProps, Product, Version } from './page';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

const Catalog = (props: CatalogProps) => {
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(
		props.products
	);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedSortType, setSelectedSortType] = useState<string>('');
	const [version] = useState<Version>(props.version);
	const [favorites, setFavorites] = useState<number[]>([]);

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

	const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const values = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);

		setSelectedCategories(values);
	};

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
	return (
		<div>
			<h2>Версия {version.current}</h2>
			<div>
				<select
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
				</select>
			</div>
			<select onChange={handleSort} id={'sort'}>
				{Object.entries(sortTypes).map((entry) => (
					<option key={entry[0]} value={entry[0]}>
						{entry[1].name}
					</option>
				))}
			</select>
			<ul className={styles.container}>
				{filteredProducts.map((product) => {
					return (
						<li key={product.sku} className={styles.item}>
							<Link href={`/catalog/${product.sku}`}>
								<Image
									src={`/img/products/pin_bomb_red_45_0.jpg`}
									alt={product.sku}
									width={250}
									height={250}
								/>
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
		</div>
	);
};
export default Catalog;
