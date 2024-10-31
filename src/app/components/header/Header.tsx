import Burger from '../burger/Burger';
import HeaderModalButton from '../HeaderModalButton';
import Logo from '../logo/Logo';
import Navigation from '../navigation/Navigation';
import styles from './header.module.css';
const Header = () => {
	return (
		<header className={`container ${styles.holder}`}>
			<Logo />
			<Navigation />
			<HeaderModalButton />
		</header>
	);
};
export default Header;
