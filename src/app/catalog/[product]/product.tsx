import { Product as ProductProps } from '../../../store/catalogStore';
import styles from './product.module.css';
import Breadcrumb from 'antd/es/breadcrumb';
import { BreadCrumb } from '../catalog';
import ProductGallery from './productGallery';

const Product = ({
	sku,
	name,
	price,
	category,
	diameter,
	len,
	depth,
	height,
	images,
	breadCrumbs,
}: ProductProps & { breadCrumbs: BreadCrumb[] }) => {
	return (
		<div className={styles.container}>
			<div className={styles.panel}>
				<Breadcrumb items={breadCrumbs} />
			</div>
			<ProductGallery images={images} />
			<div className={styles.infoBox}>
				<h1 className={styles.title}>{name}</h1>
				<h2>{price} BYN</h2>
				<p>Артикул: {sku}</p>
				{diameter ? (
					<p>Диаметр: {diameter}</p>
				) : (
					<>
						<p>Длинна: {len}</p>
						<p>Глубина: {depth}</p>
						<p>Высота: {height}</p>
					</>
				)}
			</div>
			<div className={styles.priceBox}>{price} BYN</div>
		</div>
	);
};

export default Product;
