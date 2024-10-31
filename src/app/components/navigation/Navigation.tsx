'use client';
import Link from 'next/link';
import Burger from '../burger/Burger';
import styles from './navigation.module.css';
import { usePathname } from 'next/navigation';
const Navigation = () => {
	const pathname = usePathname();
	return (
		<div className={styles.container}>
			{/* <Burger /> */}
			<nav className={styles.holder}>
				<ul className={styles.navList}>
					<li
						className={
							pathname === '/catalog'
								? `${styles.navItem} ${styles.navActive}`
								: styles.navItem
						}
					>
						<Link href='/catalog'>Каталог</Link>
					</li>
					<li className={styles.navItem}>
						<Link href='/catalog/favorites'>Избранное</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navigation;
