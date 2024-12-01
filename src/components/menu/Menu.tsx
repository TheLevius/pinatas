import Link from 'next/link';
import styles from './menu.module.css';

type MenuItem = { path: string; label: string };
type MenuProps = {
	items: MenuItem[];
};

const Menu = ({ items = [] }: MenuProps) => (
	<ul className={styles.menu}>
		{items.map((el) => (
			<li key={el.path} className={styles.menuItem}>
				<Link href={el.path}>{el.label}</Link>
			</li>
		))}
	</ul>
);

export default Menu;
