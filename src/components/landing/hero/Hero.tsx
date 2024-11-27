import Button from 'antd/es/button';
import styles from './hero.module.css';
import { ArrowRightOutlined } from '@ant-design/icons';

import Socials from '@/components/socials/socials';

// const sectionPhrases = {
// 	title: ['Яркие пиньяты', 'для ярких праздников!'],
// 	subtitle: [
// 		'Наполни конфертами, повдвесь ',
// 		'и наслаждайся разбиванием',
// 		'с крутыми эмоциями',
// 	],
// };

const Hero = () => {
	return (
		<div className={`container ${styles.section} ${styles.textCenter}`}>
			<h1 className={styles.title}>
				<span>Яркие пиньяты </span>
				<br className={styles.titleBr} />
				<span>для ярких праздников!</span>
			</h1>
			<h2 className={styles.subtitle}>
				<span>{'Наполни конфетами, подвесь '}</span>
				<br className={styles.subtitleBr} />
				<span>{'и наслаждайся разбиванием '}</span>
				<br className={styles.subtitleBr} />
				<span>{'с крутыми эмоциями'}</span>
			</h2>
			<Button
				style={{
					fontWeight: 'bold',
				}}
				className={styles.btnCta}
				type='primary'
				size={'large'}
				// icon={<ArrowRightOutlined />}
				iconPosition='end'
			>
				<span>Подобрать самую красивую пиньяту</span>
			</Button>
			<div className={styles.contacts}>
				<h2>+375257098221</h2>
				<div className={styles.panel}>
					<Socials />
				</div>
			</div>
		</div>
	);
};

export default Hero;
