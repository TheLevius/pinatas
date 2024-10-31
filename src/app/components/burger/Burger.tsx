'use client';
import { useNav } from '@/store/navStore';
import styles from './burger.module.css';
const Burger = () => {
	const switchSideCollapsed = useNav((state) => state.switchSideCollapsed);
	return (
		<button onClick={switchSideCollapsed} className={styles.burgerButton}>
			<svg
				width='32'
				height='32'
				viewBox='0 0 32 32'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M28 13.3333H9.33334'
					stroke='#2B2D33'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M28 8H4'
					stroke='#2B2D33'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M28 18.6667H4'
					stroke='#2B2D33'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M28 24H9.33334'
					stroke='#2B2D33'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		</button>
	);
};

export default Burger;
