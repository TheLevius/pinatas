import fetchCatalog from '@/utils/fetchCatalog';
import Favorites from './favorites';
import Link from 'next/link';

const FavoritesPage = async () => {
	const catalog = await fetchCatalog();
	return (
		<div>
			<Link href={'/'}>Home</Link>
			<Link href={'/catalog'}>Catalog</Link>
			<Favorites {...catalog} />
		</div>
	);
};

export default FavoritesPage;
