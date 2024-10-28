'use client';
import styles from './product.module.css';
const ProductGallery = () => {
	return (
		<div className={styles.imgBox}>
			<div className={styles.imgPanel}>1fr</div>
			<div className={styles.imgContainer}>4fr</div>
		</div>
	);
};

export default ProductGallery;
