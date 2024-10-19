import { Product as ProductProps } from '../../../store/catalogStore';
import styles from './product.module.css';
import Breadcrumb from 'antd/es/breadcrumb';
import { BreadCrumb } from '../catalog';
import { Image as ImageZoom } from 'antd';

const Product = ({
	sku,
	name,
	price,
	images,
	breadCrumbs,
}: ProductProps & { breadCrumbs: BreadCrumb[] }) => {
	return (
		<div className={styles.container}>
			<div className={styles.panel}>
				<Breadcrumb items={breadCrumbs} />
			</div>
			<div className={styles.imgBox}>
				<div className={styles.imgPanel}>
					{[1, 2, 3].map((n) => (
						<ImageZoom
							key={n}
							width={'100%'}
							src={`/img/products/webp_1280/${images[n] ?? images[0]}.webp`}
							className={`${styles.imgSmall}`}
						/>
					))}
				</div>
				<div className={styles.imgContainer}>
					<ImageZoom
						width={'100%'}
						src={`/img/products/webp_1280/${images[0]}.webp`}
						className={`${styles.imgSmall}`}
					/>
					{/* <Image
						src={`/img/products/pin_bomb_red_45_0.jpg`}
						alt={sku}
						fill
						sizes={
							'(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px'
						}
						style={{ objectFit: 'cover', objectPosition: 'center' }}
						priority
					/> */}
				</div>
			</div>
			<div className={styles.infoBox}>
				<h1 className={styles.title}>{name}</h1>
				<h2>{price} BYN</h2>
				<p>SKU: {sku}</p>
			</div>
		</div>
	);
};

export default Product;
