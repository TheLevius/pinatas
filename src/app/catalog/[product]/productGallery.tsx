"use client";
import { Image as AntImage, Carousel } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import styles from "./product.module.css";

import { useEffect, useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
	images: string[];
};
const ProductGallery = ({ images }: ProductGalleryProps) => {
	// const { currentProductPicture, setCurrentProductPicture } = useProduct();
	const { 0: mainImg, 1: setMainImg } = useState(images[0]);
	const { 0: isWide, 1: setIsWide } = useState(false);

	// const getDirection = (width: number) =>
	// 	width < 481 || (width > 640 && width < 769) ? "horizontal" : "vertical";

	useEffect(() => {
		const handleResize = () => {
			setIsWide(window.innerWidth > 480);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	useEffect(() => {
		setIsWide(window.innerWidth > 480);
	}, []);

	return (
		<>
			<div className={styles.imgBox}>
				<Swiper
					direction={isWide ? "vertical" : "horizontal"}
					pagination={{
						clickable: true,
					}}
					modules={[Navigation]}
					slidesPerView={"auto"}
					freeMode={true}
					spaceBetween={12}
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
							onClick={() => setMainImg(el)}
						>
							<Image
								src={`/img/products/${el}.webp`}
								alt={`image ${i}`}
								fill
								sizes="(max-width: 480px) 448px, (max-width: 640) 110px, (max-width: 768px) 62px, (max-width: 960px) 80px; (max-width: 1280px) 112px, 100px"
								style={{
									objectFit: "cover",
									objectPosition: "center",
								}}
								priority
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className={styles.previewBox}>
				{isWide && (
					<AntImage.PreviewGroup
						items={images.map((el) => `/img/products/${el}.webp`)}
					>
						<AntImage
							src={`/img/products/${mainImg}.webp`}
							alt={mainImg}
							style={{ borderRadius: "8px" }}
							className={styles.antImage}
						/>
					</AntImage.PreviewGroup>
				)}
			</div>
		</>
		// <div className={styles.imgBox}>
		// 	{/* <div className={styles.imgPanel}>
		// 	</div> */}
		// 	{/* <div className={styles.imgContainer}>
		// 		<div className={styles.imgPanelAbs}>

		// 		</div>
		// 		{<div className={styles.imgPreviewBox}>
		// 		</div>}
		// 	</div> */}
		// </div>
	);
};

export default ProductGallery;
