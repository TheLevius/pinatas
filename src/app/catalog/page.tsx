import fetchCatalog from '@/utils/fetchCatalog';
import Catalog from './catalog';

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
	const { products, categories, version } = await fetchCatalog();
	return (
		<div>
			<h1>Catalog Page</h1>
			<Catalog products={products} version={version} categories={categories} />
		</div>
	);
};

export default CatalogPage;
