'use client';
import { useNav } from '@/store/navStore';
import styles from './burger.module.css';
import { MenuOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';

const Burger = () => {
	const switchSideCollapsed = useNav((state) => state.switchSideCollapsed);
	return (
		<Button
			className={`${styles.burgerButton} ${styles.nonableBtn}`}
			onClick={switchSideCollapsed}
			icon={<MenuOutlined />}
		/>
	);
};

export default Burger;
