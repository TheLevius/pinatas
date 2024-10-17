import fetchCatalog from '@/utils/fetchCatalog';
import Favorites from './favorites';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
	title: 'Избранные пиньяты',
	description: 'Избранные пиньяты каталога',
};
const FavoritesPage = async () => {
	const catalog = await fetchCatalog();
	return <Favorites {...catalog} />;
};

export default FavoritesPage;
