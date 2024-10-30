import Burger from '../burger/Burger';
import Logo from '../logo/Logo';
import styles from './header.module.css';
const Header = () => {
	return (
		<header className={`container ${styles.holder}`}>
			<Logo />
			<Burger />
		</header>
	);
};
export default Header;
