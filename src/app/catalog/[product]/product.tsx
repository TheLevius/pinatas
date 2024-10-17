import Image from 'next/image';
import { Product as ProductProps } from '../page';
import styles from './product.module.scss';

const Product = ({ sku, name, price }: ProductProps) => {
	return (
		<div className={styles.container}>
			<Image
				src={`/img/products/pin_bomb_red_45_0.jpg`}
				alt={sku}
				width={500}
				height={500}
			/>
			<h1>{name}</h1>
			<h2>{price} BYN</h2>
			<p>SKU: {sku}</p>
		</div>
	);
};

export default Product;
