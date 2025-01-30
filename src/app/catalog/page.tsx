import { db } from '@/data/readyDb';
import Catalog from './catalog';
import { Product } from '@/store/catalogStore';

export type CatalogProps = {
	products: Product[];
};

const CatalogPage = async () => {
	// const products = await fetchProducts();
	return <Catalog products={db.products} />;
};

export default CatalogPage;
