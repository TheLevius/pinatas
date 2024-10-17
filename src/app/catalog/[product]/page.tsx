import { notFound } from 'next/navigation';
import fetchCatalog from '@/utils/fetchCatalog';
import Product from './product';

const breadcrumbItems = [
	{ title: 'Главная', href: '/' },
	{ title: 'Каталог', href: '/catalog' },
];
type ParamsProps = {
	params: {
		product: string;
	};
};
export const generateMetadata = async ({ params }: ParamsProps) => {
	const { products } = await fetchCatalog();
	const product = products.find((p) => p.sku === params.product);
	const pinataName = product?.name ?? 'Not Found';
	return {
		title: `Пиньята ${pinataName}`,
		description: `Пиньята: ${pinataName}`,
	};
};

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
	const breadCrumbs = [
		...breadcrumbItems,
		{ title: product?.name ?? 'Not Found', href: params.product },
	];
	return <Product {...product} breadCrumbs={breadCrumbs} />;
};

export default ProductPage;
