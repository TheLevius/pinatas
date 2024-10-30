import Logo from '../logo/Logo';
import Socials from '../socials/socials';
import styles from './footer.module.css';
const currentYear = new Date().getFullYear();
const Footer = () => {
	return (
		<footer className={`container ${styles.holder}`}>
			<Logo />
			<div style={{ display: 'flex', gap: '16px' }}>
				<Socials />
			</div>
			<div>© {currentYear} Pinatas.by</div>
		</footer>
	);
};

export default Footer;
