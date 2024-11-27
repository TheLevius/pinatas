import Menu from 'antd/es/menu';
import Burger from '../burger/Burger';
import HeaderModalButton from '../HeaderModalButton';
import Navigation from '../navigation/Navigation';
import styles from './header.module.css';
import Link from 'next/link';
const Header = () => {
	return (
		<header className={`container ${styles.holder}`}>
			<h1 className={styles.logo}>
				<Link href='/'>Pinatas</Link>
			</h1>
			{/* <HeaderModalButton />	 */}
			<Navigation />
		</header>
	);
};
export default Header;
