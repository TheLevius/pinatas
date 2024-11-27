import Link from 'next/link';
import Socials from '../socials/socials';
import styles from './footer.module.css';
const currentYear = new Date().getFullYear();
const Footer = () => {
	return (
		<footer className={`container ${styles.holder} textCenter`}>
			<h1 className={styles.logo}>
				<Link href='/'>Pinatas</Link>
			</h1>
			<h3 className={styles.phone}>+375 25 7098221</h3>
			<div style={{ display: 'flex', gap: '8px' }}>
				<Socials />
			</div>
			<div className={styles.copyright}>© {currentYear} Pinatas.by</div>
		</footer>
	);
};

export default Footer;
