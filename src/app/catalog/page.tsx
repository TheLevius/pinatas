import fetchCatalog from '@/utils/fetchCatalog';
import Catalog from './catalog';
import Link from 'next/link';

export type Product = {
	id: number;
	sku: string;
	name: string;
	price: number;
	category: string;
	description: string;
	favorite: boolean;
	images: string[];
};
export type Version = { current: number; prev: number };

export type CatalogProps = {
	products: Product[];
	categories: string[];
	version: Version;
};

const CatalogPage = async () => {
	const catalog = await fetchCatalog();
	return (
		<div>
			<Link href={'/catalog/favorites'}>Favorites</Link>
			<h1>Catalog Page</h1>
			<Catalog {...catalog} />
		</div>
	);
};

export default CatalogPage;
