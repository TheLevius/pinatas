import { notFound } from 'next/navigation';
import { catalog } from '@/data/catalog';

export const generateStaticParams = async () =>
	catalog.map((product) => ({ sku: product.sku }));

const ProductPage = ({ params }: { params: { sku: string } }) => {
	const product = catalog.find((p) => p.sku === params.sku);
	if (!product) {
		notFound();
	}
	return (
		<div>
			<h1>{product.name}</h1>
			<h2>{product.price} BYN</h2>
			<p>SKU: {product.sku}</p>
		</div>
	);
};

export default ProductPage;
