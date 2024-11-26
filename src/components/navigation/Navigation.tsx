'use client';
import Link from 'next/link';
import Burger from '../burger/Burger';
import styles from './navigation.module.css';
import Menu from 'antd/es/menu';
import { useNav } from '@/store/navStore';
import { useEffect, useRef, useState } from 'react';
import { Button, Divider } from 'antd';
import {
	HeartOutlined,
	LeftOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';

const items = [
	// {
	// 	label: <Link href='/'>Главная</Link>,
	// 	key: '/',
	// },
	{
		label: <Link href='/catalog'>Каталог</Link>,
		key: '/catalog',
		// icon: <UnorderedListOutlined />,
	},
	{
		label: <Link href='/catalog/favorites'>Ваши краши</Link>,
		key: '/catalog/favorites',
		// icon: <HeartOutlined />,
	},
	{
		label: <Link href='/howtoplay'>Как играть</Link>,
		key: '/howtoplay',
	},
	{
		label: <Link href='/whattofill'>Чем наполнять</Link>,
		key: '/whattofill',
	},
];
const Navigation = () => {
	const { sideCollapsed, switchSideCollapsed, setSideCollapsed } = useNav(
		(state) => state
	);
	const handleOverlayClick = () => setSideCollapsed();
	const handleSideClick = () => switchSideCollapsed();

	useEffect(() => {
		if (!sideCollapsed) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
		return () => {
			document.body.classList.remove('no-scroll');
		};
	}, [sideCollapsed]);
	return (
		<>
			{!sideCollapsed && (
				<div className={styles.navOverlay} onClick={handleOverlayClick}></div>
			)}
			<div className={styles.container}>
				<Burger />
				<nav
					onClick={handleSideClick}
					className={styles.holder}
					style={{
						transform: `translateX(${sideCollapsed ? '100%' : '0'})`,
						opacity: sideCollapsed ? 0 : 1,
						maxWidth: sideCollapsed ? 0 : '100%',
					}}
				>
					<div className={styles.menuHeader}>
						<LeftOutlined />
					</div>

					<Menu items={items} />
				</nav>
			</div>
		</>
	);
};

export default Navigation;
