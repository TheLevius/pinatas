import { notFound } from 'next/navigation';
import fetchCatalog from '@/utils/fetchCatalog';
import Product from './product';

export const generateStaticParams = async () => {
	const { products } = await fetchCatalog();
	const params = products.map((p) => ({ product: p.sku }));
	return params;
};

const ProductPage = async ({
	params,
}: {
	params: { product: string; id: number };
}) => {
	const catalog = await fetchCatalog();
	const product = catalog.products.find((p) => p.sku === params.product);
	if (!product) {
		notFound();
	}
	return <Product {...product} />;
};

export default ProductPage;
