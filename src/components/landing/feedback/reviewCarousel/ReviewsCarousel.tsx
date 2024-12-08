'use client';
import { Carousel } from 'antd';
import Image from 'next/image';
import styles from './reviewCarousel.module.css';

const reviews = [
	{
		eventPhoto: '/img/products/IMG_1550.webp',
		feedbackScreen: '/img/products/IMG_3383.webp',
	},
	{
		eventPhoto: '/img/products/IMG_3383.webp',
		feedbackScreen: '/img/products/IMG_1550.webp',
	},
	{
		eventPhoto: '/img/products/IMG_1550.webp',
		feedbackScreen: '/img/products/IMG_3383.webp',
	},
	{
		eventPhoto: '/img/products/IMG_3383.webp',
		feedbackScreen: '/img/products/IMG_1550.webp',
	},
	{
		eventPhoto: '/img/products/IMG_1550.webp',
		feedbackScreen: '/img/products/IMG_3383.webp',
	},
	{
		eventPhoto: '/img/products/IMG_3383.webp',
		feedbackScreen: '/img/products/IMG_1550.webp',
	},
];
const ReviewCarousel = () => (
	<Carousel className={styles.holder} arrows effect='fade'>
		{reviews.map((el, i) => (
			<div key={i}>
				<div className={styles.reviewItem}>
					<div className={styles.imageContainer}>
						<Image
							className={styles.pic}
							src={el.eventPhoto}
							alt={'event photo'}
							fill
							sizes='(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px'
							style={{ objectFit: 'cover', objectPosition: 'center' }}
							priority
						/>
					</div>
					<div className={styles.imageContainer}>
						<Image
							className={styles.pic}
							src={el.feedbackScreen}
							alt={'review'}
							fill
							sizes='(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px'
							style={{ objectFit: 'cover', objectPosition: 'center' }}
							priority
						/>
					</div>
				</div>
			</div>
		))}
	</Carousel>
);

export default ReviewCarousel;
