import Button from 'antd/es/button';
import styles from './features.module.css';

const combinations = [
	{ name: 'Игрушек', icon: '' },
	{ name: 'Игр', icon: '' },
	{ name: 'Сладостей', icon: '' },
];

const fillers = [
	{ name: 'Игрушками', icon: '' },
	{ name: 'Вкусняшками', icon: '' },
	{ name: 'Конфити', icon: '' },
	{ name: 'Шариками', icon: '' },
];

const Features = () => {
	return (
		<div className={`container ${styles.section}`}>
			<h2 className={styles.title}>
				<span>Пиньята — </span>
				<span style={{ whiteSpace: 'nowrap' }}>это чудесное сочетание:</span>
			</h2>
			<div className={styles.row}>
				{combinations.map((el) => (
					<div key={el.name}>{el.name}</div>
				))}
			</div>
			<h2 className={styles.subtitle}>
				<span>Ее делают из картона </span>
				<br className={styles.breaker} />
				<span>или папье-маше и заполняют:</span>
			</h2>
			<div className={styles.row}>
				{fillers.map((el) => (
					<div key={el.name}>{el.name}</div>
				))}
			</div>
			<h3 className={styles.subheader}>И еще очень много чем!</h3>
			<Button style={{ margin: '24px 0' }} type='primary' size='large'>
				<span>Чем еще наполнить?</span>
			</Button>
			<p>
				Задача гостей — разбить пиньяту битой и "освободить из плена" подарки и
				сладости!
			</p>
			<p>
				Будет много шума и веселья — то, что надо для ударной дозы праздничного
				настроения.
			</p>
		</div>
	);
};

export default Features;
