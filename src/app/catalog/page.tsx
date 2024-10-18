import Catalog from './catalog';
import fetchProducts from '@/utils/fetchProducts';

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
};

const CatalogPage = async () => {
	const products = await fetchProducts();
	return <Catalog products={products} />;
};

export default CatalogPage;
