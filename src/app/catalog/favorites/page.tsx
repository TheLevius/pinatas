import fetchCatalog from '@/utils/fetchCatalog';
import Favorites from './favorites';

const FavoritesPage = async () => {
	const catalog = await fetchCatalog();
	return <Favorites {...catalog} />;
};

export default FavoritesPage;
