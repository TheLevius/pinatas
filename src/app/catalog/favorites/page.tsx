import Favorites from './favorites';
import { Metadata } from 'next/types';
import fetchProducts from '@/utils/fetchProducts';

export const metadata: Metadata = {
	title: 'Избранные пиньяты',
	description: 'Избранные пиньяты каталога',
};
const FavoritesPage = async () => {
	const products = await fetchProducts();
	return <Favorites products={products} />;
};

export default FavoritesPage;
