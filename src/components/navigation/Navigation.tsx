"use client";
import Link from "next/link";
import Burger from "../burger/Burger";
import styles from "./navigation.module.css";
// import Menu from 'antd/es/menu';
import { useNav } from "@/store/navStore";
import { useEffect, useRef, useState } from "react";
import {
	HeartOutlined,
	LeftOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import Menu from "../menu/Menu";

// const items = [
// 	// {
// 	// 	label: <Link href='/'>Главная</Link>,
// 	// 	key: '/',
// 	// },
// 	{
// 		label: <Link href='/catalog'>Каталог</Link>,
// 		key: '/catalog',
// 		// icon: <UnorderedListOutlined />,
// 	},
// 	{
// 		label: <Link href='/catalog/favorites'>Ваши краши</Link>,
// 		key: '/catalog/favorites',
// 		// icon: <HeartOutlined />,
// 	},
// 	{
// 		label: <Link href='/howtoplay'>Как играть</Link>,
// 		key: '/howtoplay',
// 	},
// 	{
// 		label: <Link href='/whattofill'>Чем наполнять</Link>,
// 		key: '/whattofill',
// 	},
// ];

const items = [
	{ path: "/", label: "Главная" },
	{ path: "/catalog", label: "Каталог" },
	{ path: "/catalog/favorites", label: "Ваши краши" },
	{ path: "/howtoplay", label: "Как играть" },
	{ path: "/whattofill", label: "Чем наполнять" },
	{ path: "/contacts", label: "Контакты" },
];
const Navigation = () => {
	const { sideCollapsed, switchSideCollapsed, setSideCollapsed } = useNav(
		(state) => state
	);
	const handleOverlayClick = () => setSideCollapsed();

	useEffect(() => {
		if (!sideCollapsed) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}
		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, [sideCollapsed]);
	return (
		<>
			{!sideCollapsed && (
				<div
					className={styles.navOverlay}
					onClick={handleOverlayClick}
				></div>
			)}
			<div className={styles.container}>
				<Burger />
				<nav
					className={styles.holder}
					style={{ left: sideCollapsed ? "-100%" : 0 }}
				>
					<div className={styles.menuHeader}>
						<LeftOutlined />
					</div>
					{<Menu items={items} />}
				</nav>
			</div>
		</>
	);
};

export default Navigation;
