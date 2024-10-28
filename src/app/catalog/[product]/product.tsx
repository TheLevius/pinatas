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
			<ProductGallery />
			<div className={styles.infoBox}>
				<h1 className={styles.title}>{name}</h1>
				<h2>{price} BYN</h2>
				<p>SKU: {sku}</p>
				{category === 'Сфера' ? (
					<p>diameter: {diameter}</p>
				) : (
					<>
						<p>len: {len}</p>
						<p>depth: {depth}</p>
						<p>height: {height}</p>
					</>
				)}
			</div>
		</div>
	);
};

export default Product;
