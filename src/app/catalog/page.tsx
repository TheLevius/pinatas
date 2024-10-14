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

export type CatalogProps = {
	products: Product[];
	categories: string[];
};

const CatalogPage = async () => {
	const catalog = await fetchCatalog();
	return <Catalog {...catalog} />;
};

export default CatalogPage;
