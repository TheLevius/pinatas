import Button from 'antd/es/button';
import styles from './hero.module.css';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Socials from '@/components/socials/socials';
const Hero = () => {
	return (
		<div className='container'>
			<h1>{'Яркие пиньяты для ярких праздников!'}</h1>
			<p>
				{
					'Наполни конфетами, подвесь и наслаждайся разбиванием с крутыми эмоциями'
				}
			</p>
			<Button
				style={{
					fontWeight: 'bold',
				}}
				className={styles.btnCta}
				type='primary'
				size={'large'}
				icon={<ArrowRightOutlined />}
				iconPosition='end'
			>
				<span>Подобрать самую красивую пиньяту</span>
			</Button>
			<div>
				<Socials />
			</div>
		</div>
	);
};

export default Hero;
