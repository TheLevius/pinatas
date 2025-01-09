'use client';
import { Image as AntImage, Carousel } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './product.module.css';

import { useState } from 'react';
import Image from 'next/image';

type ProductGalleryProps = {
	images: string[];
};
const ProductGallery = ({ images }: ProductGalleryProps) => {
	// const { currentProductPicture, setCurrentProductPicture } = useProduct();
	const [mainImg, setMainImg] = useState(images[0]);
	return (
		<div className={styles.imgBox}>
			<div className={styles.imgPanel}>
				{/* <div className={styles.aspectBox}>
					
				</div> */}
				{/* <Carousel
					arrows
					dotPosition='left'
					infinite={false}
					style={{ height: '100%', position: 'relative' }}
				>
					{images.map((el, i) => (
						<Image
							src={`/img/products/${el}.webp`}
							alt={`image ${i}`}
							fill
							sizes='(max-width: 480px) 100px, (max-width: 768px) 120px, (max-width: 1280px) 112px, 100px'
							style={{ objectFit: 'cover', objectPosition: 'center' }}
							priority
						/>
					))}
				</Carousel> */}
			</div>
			<div className={styles.imgContainer}>
				<div className={styles.imgPanelAbs}>
					<Swiper
						direction={'vertical'}
						pagination={{
							clickable: true,
						}}
						modules={[Navigation]}
						slidesPerView={'auto'}
						freeMode={true}
						spaceBetween={16}
						mousewheel
						navigation={{
							nextEl: `.${styles.swiperButtonNext}`,
							prevEl: `.${styles.swiperButtonPrev}`,
						}}
						className={styles.swiperBox}
						scrollbar={{ draggable: true }}
					>
						<div className={styles.swiperButtonPrev}>↑</div>
						<div className={styles.swiperButtonNext}>↓</div>
						{images.map((el, i) => (
							<SwiperSlide
								key={el}
								className={styles.productSlide}
								style={{ height: '150px' }}
								onClick={() => setMainImg(el)}
							>
								<Image
									src={`/img/products/${el}.webp`}
									alt={`image ${i}`}
									width={120}
									height={150}
									// fill
									// sizes='(max-width: 480px) 100px, (max-width: 768px) 120px, (max-width: 1280px) 112px, 100px'
									// style={{ objectFit: 'cover', objectPosition: 'center' }}
									// priority
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<AntImage.PreviewGroup
					items={images.map((el) => `/img/products/${el}.webp`)}
				>
					<AntImage
						src={`/img/products/${mainImg}.webp`}
						alt={mainImg}
						style={{ borderRadius: '8px' }}
					/>
				</AntImage.PreviewGroup>
			</div>
		</div>
	);
};

export default ProductGallery;
