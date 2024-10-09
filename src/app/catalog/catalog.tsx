'use client';
import Link from 'next/link';
import { CatalogProps, Product } from './page';
import { useEffect, useState } from 'react';

const Catalog = (props: CatalogProps) => {
	const [products, setProducts] = useState<Product[]>(props.products);
	const [version, setVersion] = useState<{ current: number; prev: number }>(
		props.version
	);
	const [favorites, setFavorites] = useState<number[]>([]);
	useEffect(() => {
		const localVersion = localStorage.getItem('version');
		if (localVersion === null || version.current !== Number(localVersion)) {
			localStorage.setItem('version', JSON.stringify(version));
			localStorage.setItem('catalog', JSON.stringify(products));
		}
		const favoritesRaw = localStorage.getItem('favorites');
		if (favoritesRaw !== null) {
			const favoritesLocal = JSON.parse(favoritesRaw);
			setFavorites(favoritesLocal);
		}
	}, []);
	useEffect(() => {
		const newProducts = favorites.reduce((prods, favId) => {
			const index = prods.findIndex((p) => p.id === favId);
			if (index !== -1) {
				prods[index].favorite = true;
			}
			return products;
		}, products);
		setProducts(newProducts);
	}, [favorites]);
	return (
		<div>
			<h2>Версия {version.current}</h2>
			<ul>
				{products.map((product) => {
					return (
						<li key={product.sku}>
							<h2>{product.name}</h2>
							<h3>{product.price} BYN</h3>
							<Link href={`/catalog/${product.sku}`}>Страница продукта</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default Catalog;
