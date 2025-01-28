import Button from "antd/es/button";
import Badge from "../badge/Badge";
import styles from "./productInfo.module.css";
import { Product as ProductProps } from "../../store/catalogStore";

const ru: { [key: string]: string } = {
	sku: "Артикул",
	diameter: "Диаметр",
	len: "Длина",
	depth: "Глубина",
	height: "Высота",
};
const ProductInfo = ({
	product,
	className,
}: {
	product: ProductProps;
	className: string;
}) => {
	const keys = ["sku"].concat(
		product.diameter ? ["diameter"] : ["len", "depth", "height"]
	);
	return (
		<div className={`${className} ${styles.productInfo}`}>
			<div className={styles.top}>
				<h2>{product.name}</h2>
				<div className={styles.section}>
					<div className={styles.sectionName}>Цена:</div>
					<div
						className={`${styles.badge} ${styles.price}`}
					>{`${product.price} BYN`}</div>
				</div>
			</div>

			<div className={styles.middle}>
				<div className={styles.section}>
					<div className={styles.sectionName}>Наличие:</div>
					<div className={`${styles.badge} ${styles.availability}`}>
						Под заказ
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.sectionName}>Описание:</div>
					<div className={styles.descriptions}>
						{keys.map((key) => (
							<div className={styles.entry} key={key}>
								<span className={styles.prop}>{ru[key]}</span>
								<span className={styles.dotted}></span>
								<span className={styles.value}>
									{product[key as keyof ProductProps]}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.bottom}>
				<Button
					className={styles.btnOrder}
					type="primary"
					size={"large"}
					// icon={<ArrowRightOutlined />}
					iconPosition="end"
				>
					<span>Заказать</span>
				</Button>
			</div>
		</div>
	);
};

export default ProductInfo;
