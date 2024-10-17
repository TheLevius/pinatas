import Image from 'next/image';
import { Product as ProductProps } from '../page';
import styles from './product.module.scss';
import Breadcrumb from 'antd/es/breadcrumb';
import { BreadCrumb } from '../catalog';

const Product = ({
	sku,
	name,
	price,
	breadCrumbs,
}: ProductProps & { breadCrumbs: BreadCrumb[] }) => {
	return (
		<div className={styles.container}>
			<div className={styles.panel}>
				<Breadcrumb items={breadCrumbs} />
			</div>
			<div className={styles.cell}>
				<div className={styles.imgContainer}>
					<Image
						src={`/img/products/pin_bomb_red_45_0.jpg`}
						alt={sku}
						fill
						sizes={
							'(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px'
						}
						priority
					/>
				</div>
			</div>
			<div className={styles.cell}>
				<h1 className={styles.title}>{name}</h1>
				<h2>{price} BYN</h2>
				<p>SKU: {sku}</p>
			</div>
		</div>
	);
};

export default Product;
