import Link from "next/link";
import styles from "./menu.module.css";
import { useNav } from "@/store/navStore";
import { MouseEvent } from "react";

type MenuItem = { path: string; label: string };
type MenuProps = {
	items: MenuItem[];
};

const Menu = ({ items = [] }: MenuProps) => {
	const { setSideCollapsed } = useNav((state) => state);
	const handleMenuClick = (e: MouseEvent<HTMLUListElement>) => {
		e.stopPropagation();
		setSideCollapsed();
	};

	return (
		<ul className={styles.menu} onClick={handleMenuClick}>
			{items.map((el) => (
				<li key={el.path} className={styles.menuItem}>
					<Link href={el.path}>{el.label}</Link>
				</li>
			))}
		</ul>
	);
};

export default Menu;
