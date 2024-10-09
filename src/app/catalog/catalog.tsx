'use client';
import Link from 'next/link';
import { CatalogProps, Product, Version } from './page';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
const Catalog = (props: CatalogProps) => {
	const [products, setProducts] = useState<Product[]>(props.products);
	const [categories, setCategories] = useState<string[]>(props.categories);
	const [version, setVersion] = useState<Version>(props.version);
	const [favorites, setFavorites] = useState<number[]>([]);
	const switchFavorite = (id: number) => {
		setFavorites((prev) => {
			if (prev.includes(id)) {
				return prev.filter((favId) => favId !== id);
			}
			return [...prev, id];
		});
	};
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
	const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
		setProducts((prevProducts) => {
			const newProducts = prevProducts
				.slice()
				.sort(sortTypes[e.target.value].comparator);
			return newProducts;
		});
	};

	useEffect(() => {
		const localVersion = localStorage.getItem('version');
		if (localVersion === null || version.current !== Number(localVersion)) {
			localStorage.setItem('version', JSON.stringify(version));
			localStorage.setItem('catalog', JSON.stringify(products));
		}
		const favoritesRaw = localStorage.getItem('favorites');
		if (favoritesRaw !== null) {
			const favoritesLocal = JSON.parse(favoritesRaw);
			console.log('entries', favoritesLocal);
			setFavorites(favoritesLocal);
			setProducts((prevProducts) => {
				return prevProducts.map((product) => {
					product.favorite = favoritesLocal.includes(product.id);
					return product;
				});
			});
		}
	}, []);
	useEffect(() => {
		const newProducts = products.map((product) => {
			product.favorite = favorites.includes(product.id);
			return product;
		});
		setProducts(newProducts);
	}, [favorites]);

	useEffect(() => {
		if (favorites.length > 0) {
			localStorage.setItem('favorites', JSON.stringify(favorites));
		} else {
			localStorage.removeItem('favorites');
		}
	}, [favorites]);

	return (
		<div>
			<h2>Версия {version.current}</h2>
			<select onChange={handleSort}>
				{Object.entries(sortTypes).map((entry) => (
					<option key={entry[0]} value={entry[0]}>
						{entry[1].name}
					</option>
				))}
			</select>
			<ul className={styles.container}>
				{products.map((product) => {
					return (
						<li key={product.sku} className={styles.item}>
							<h2 onClick={() => switchFavorite(product.id)}>{product.name}</h2>
							<h3>{product.price} BYN</h3>
							<p>{product.favorite.toString()}</p>
							<Link href={`/catalog/${product.sku}`}>Страница продукта</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default Catalog;
