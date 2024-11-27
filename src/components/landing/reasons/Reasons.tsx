import Image from 'next/image';
import styles from './reasons.module.css';

const reasons = [
	{ name: 'День рождения', image: '', description: '' },
	{ name: 'Свадьба', image: '', description: '' },
	{ name: 'Девичник, Мальчишник', image: '', description: '' },
	{ name: 'Гендер пати', image: '', description: '' },
	{ name: 'Выпускной', image: '', description: '' },
	{ name: 'Корпоратив', image: '', description: '' },
	{ name: 'Упаковка подарка', image: '', description: '' },
	{ name: 'Сделать предложение', image: '', description: '' },
	{ name: 'Снять стрес', image: '', description: '' },
];
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
			{reasons.map((el) => (
				<div key={el.name} className={styles.cell}>
					<Image
						width={172}
						height={229}
						className={styles.pic}
						src={`/img/products/IMG_1550.webp`}
						alt={el.name}
					/>
					<h4>{el.name}</h4>
					<p>{el.description}</p>
				</div>
			))}
		</div>
	</div>
);

export default Reasons;
