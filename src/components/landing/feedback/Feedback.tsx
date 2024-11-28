import styles from './feedback.module.css';
import ReviewsCarousel from './reviewCarousel/ReviewsCarousel';

const contentStyle: React.CSSProperties = {
	margin: 0,
	height: '160px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
};

const Feedback = () => (
	<div className={`container textCenter ${styles.section}`}>
		<h2 className={styles.title}>Эхо восторга</h2>
		<p className={styles.represent}>
			<span>Наши пиньяты уже подарили </span>
			<br className={styles.breaker} />
			<span>100500 миллионов счастливых моментов, </span>
			<br className={styles.breaker} />
			<span>крутых эмоций и визгов восторга. </span>
			<br className={styles.breaker} />
			<span>Вместо тысячи слов смотрите сами: </span>
		</p>
		<div style={{ display: 'block', width: '100%' }}>
			<ReviewsCarousel />
		</div>
	</div>
);

export default Feedback;
