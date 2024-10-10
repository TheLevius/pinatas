import { notFound } from 'next/navigation';
import { catalog } from '@/data/catalog';
import fetchCatalog from '@/utils/fetchCatalog';
import Image from 'next/image';

export const generateStaticParams = async () => {
	const { products } = await fetchCatalog();
	const params = products.map((p) => ({ sku: p.sku }));

	return params;
};

const ProductPage = ({ params }: { params: { sku: string } }) => {
	const product = catalog.find((p) => p.sku === params.sku);
	if (!product) {
		notFound();
	}
	return (
		<div>
			<Image
				src={`/img/products/pin_bomb_red_45_0.jpg`}
				alt={product.sku}
				width={500}
				height={500}
			/>
			<h1>{product.name}</h1>
			<h2>{product.price} BYN</h2>
			<p>SKU: {product.sku}</p>
		</div>
	);
};

export default ProductPage;
