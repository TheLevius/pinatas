import Image from 'next/image';
import styles from './reasons.module.css';

const reasons = [
	{
		name: 'День рождения',
		image: '',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
	{
		name: 'Свадьба',
		image: '',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
	{
		name: 'Девичник, Мальчишник',
		image: '',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
	{
		name: 'Гендер пати',
		image: '',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
	{
		name: 'Выпускной',
		image: '',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
	{
		name: 'Корпоратив',
		image: '',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
	{
		name: 'Упаковка подарка',
		image: '',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
	{
		name: 'Сделать предложение',
		image: '',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
	{
		name: 'Снять стрес',
		image: '',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	},
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
					<div className={styles.imageContainer}>
						<Image
							className={styles.pic}
							src={`/img/products/IMG_1550.webp`}
							alt={el.name}
							fill
							sizes='(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px'
							style={{ objectFit: 'cover', objectPosition: 'center' }}
							priority
						/>
					</div>
					<h4>{el.name}</h4>
					<p>{el.description}</p>
				</div>
			))}
		</div>
	</div>
);

export default Reasons;
