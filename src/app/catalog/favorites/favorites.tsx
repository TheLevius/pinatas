'use client';
import { useEffect, useState } from 'react';
import { CatalogProps, Product } from '../page';

const Favorites = (props: CatalogProps) => {
	const [favorites, setFavorites] = useState<number[]>([]);
	const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

	const handleRemoveFavorite = (id: number) => {
		setFavorites(favorites.filter((favId) => favId !== id));
	};

	useEffect(() => {
		const favoritesRaw = localStorage.getItem('favorites');
		if (favoritesRaw !== null) {
			const favoritesFromLS = JSON.parse(favoritesRaw);
			setFavorites(favoritesFromLS);
		}
	}, []);

	useEffect(() => {
		if (favorites.length > 0) {
			localStorage.setItem('favorites', JSON.stringify(favorites));
		} else {
			localStorage.removeItem('favorites');
		}
		const newFavoriteProducts = props.products
			.filter((p) => favorites.includes(p.id))
			.map((product) => {
				product.favorite = true;
				return product;
			});
		setFavoriteProducts(newFavoriteProducts);
	}, [favorites]);

	return (
		<div>
			<ul>
				{favoriteProducts.map((fp) => (
					<li key={fp.id}>
						<h2>{fp.name}</h2>
						<h3>{fp.price} BYN</h3>
						<button onClick={() => handleRemoveFavorite(fp.id)}>
							Delete from favorite
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Favorites;
