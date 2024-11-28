'use client';
import { Carousel } from 'antd';
const contentStyle: React.CSSProperties = {
	height: '160px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
};
const MyCarousel = () => (
	<Carousel arrows effect='fade'>
		<div>
			<h3 style={contentStyle}>Отзыв 1</h3>
		</div>
		<div>
			<h3 style={contentStyle}>Отзыв 2</h3>
		</div>
		<div>
			<h3 style={contentStyle}>Отзыв 3</h3>
		</div>
		<div>
			<h3 style={contentStyle}>Отзыв 4</h3>
		</div>
		<div>
			<h3 style={contentStyle}>Отзыв 5</h3>
		</div>
		<div>
			<h3 style={contentStyle}>Отзыв 6</h3>
		</div>
	</Carousel>
);

export default MyCarousel;
