import Image from "next/image";
import styles from "./reasons.module.css";
import { db } from "@/data/readyDb";

const Reasons = () => (
	<div className={`container ${styles.section} textCenter`}>
		<h2>Повод для пиньяты</h2>
		<p className={styles.paragraph}>
			<span>Пиньята настолько универсальная штука, </span>
			<span>что для нее вовсе не нужен повод. </span>
			<span>Это как цветы для любимой! </span>
			<span>Но если Вам хочется больше идей, ловите: </span>
		</p>
		<div className={styles.exampleBox}>
			{db.reasonForPinata.map((el) => (
				<div key={el.reason} className={styles.cell}>
					<div className={styles.imageContainer}>
						<Image
							className={styles.pic}
							src={`/img/products/IMG_1550.webp`}
							alt={el.reason}
							fill
							sizes="(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px"
							style={{
								objectFit: "cover",
								objectPosition: "center",
							}}
							priority
						/>
					</div>
					<h4>{el.reason}</h4>
					<p>{el.description}</p>
				</div>
			))}
		</div>
	</div>
);

export default Reasons;
