import Image from 'next/image';
import styles from './reasons.module.css';

const reasons = [
	{ name: 'День рождения', image: '', description: '' },
	{ name: 'Свадьба', image: '', description: '' },
	{ name: 'Девичник / Мальчишник', image: '', description: '' },
	{ name: 'Гендер пати', image: '', description: '' },
	{ name: 'Выпускной', image: '', description: '' },
	{ name: 'Корпоратив', image: '', description: '' },
	{ name: 'Упаковка подарка', image: '', description: '' },
	{ name: 'Сделать предложение', image: '', description: '' },
	{ name: 'Снять стрес', image: '', description: '' },
];
const Reasons = () => (
	<div className='container'>
		<h2>Повод для пиньяты</h2>
		<p>
			Пиньята настолько универсальная штука, что для нее вовсе не нужен повод.
			Это как цветы для любимой! Но если Вам хочется больше идей, ловите:
		</p>
		<div className={styles.box}>
			{reasons.map((el) => (
				<div className={styles.reasonItem}>
					<Image src={el.image} alt={el.name} />
					<h4>{el.name}</h4>
					<p>{el.description}</p>
				</div>
			))}
		</div>
	</div>
);

export default Reasons;
