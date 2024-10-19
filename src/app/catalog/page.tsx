import { products } from '@/data/readyProducts';
import Catalog from './catalog';
import { Product } from '@/store/catalogStore';

export type CatalogProps = {
	products: Product[];
};

const CatalogPage = async () => {
	// const products = await fetchProducts();
	return <Catalog products={products} />;
};

export default CatalogPage;
