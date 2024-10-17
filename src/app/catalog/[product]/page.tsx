import { notFound } from 'next/navigation';
import fetchCatalog from '@/utils/fetchCatalog';
import Product from './product';

export const generateStaticParams = async () => {
	const { products } = await fetchCatalog();
	const params = products.map((p) => ({ product: p.sku, id: p.id }));
	return params;
};

const ProductPage = async ({ params }: { params: { sku: string } }) => {
	const catalog = await fetchCatalog();
	const product = catalog.products.find((p) => p.sku === params.sku);
	if (!product) {
		notFound();
	}
	return <Product {...product} />;
};

export default ProductPage;
