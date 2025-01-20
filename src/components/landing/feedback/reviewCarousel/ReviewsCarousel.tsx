"use client";
import { Carousel } from "antd";
import Image from "next/image";
import styles from "./reviewCarousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

const reviews = [
	{
		eventPhoto: "/img/products/IMG_1550.webp",
		feedbackScreen: "/img/products/IMG_3383.webp",
	},
	{
		eventPhoto: "/img/products/IMG_3383.webp",
		feedbackScreen: "/img/products/IMG_1550.webp",
	},
	{
		eventPhoto: "/img/products/IMG_1550.webp",
		feedbackScreen: "/img/products/IMG_3383.webp",
	},
	{
		eventPhoto: "/img/products/IMG_3383.webp",
		feedbackScreen: "/img/products/IMG_1550.webp",
	},
	{
		eventPhoto: "/img/products/IMG_1550.webp",
		feedbackScreen: "/img/products/IMG_3383.webp",
	},
	{
		eventPhoto: "/img/products/IMG_3383.webp",
		feedbackScreen: "/img/products/IMG_1550.webp",
	},
];
const ReviewCarousel = () => (
	<Swiper
		pagination={{
			clickable: true,
		}}
		slidesPerView={1}
		slidesPerGroup={1}
		className={styles.swiperBox}
		scrollbar={{ draggable: true }}
	>
		{reviews.map((el, i) => (
			<SwiperSlide key={i} className={styles.slide}>
				<div className={styles.imageContainer}>
					<Image
						className={styles.pic}
						src={el.eventPhoto}
						alt={`review ${i}`}
						fill
						sizes="(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px"
						style={{ objectFit: "cover", objectPosition: "center" }}
						priority
					/>
				</div>
				<div className={styles.imageContainer}>
					<Image
						className={styles.pic}
						src={el.feedbackScreen}
						alt={`review ${i}`}
						fill
						sizes="(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px"
						style={{ objectFit: "cover", objectPosition: "center" }}
						priority
					/>
				</div>
			</SwiperSlide>
		))}
	</Swiper>
);

export default ReviewCarousel;
