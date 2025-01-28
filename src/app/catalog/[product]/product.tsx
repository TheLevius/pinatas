import { Product as ProductProps } from "../../../store/catalogStore";
import styles from "./product.module.css";
import Breadcrumb from "antd/es/breadcrumb";
import { BreadCrumb } from "../catalog";
import ProductGallery from "./productGallery";
import ProductInfo from "@/components/productInfo/ProductInfo";

const Product = ({
	product,
	breadCrumbs,
}: { product: ProductProps } & { breadCrumbs: BreadCrumb[] }) => {
	return (
		<div className={styles.container}>
			<div className={styles.panel}>
				<Breadcrumb items={breadCrumbs} />
			</div>
			<ProductGallery images={product.images} />

			{/* <h1 className={styles.title}>{name}</h1>
				<div className={styles.priceBox}>
					<h2>{price} BYN</h2>
				</div>

				<div className={styles.descriptionBox}>
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
				</div> */}
			<ProductInfo product={product} className={styles.infoBox} />
		</div>
	);
};

export default Product;
