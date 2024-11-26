import Link from 'next/link';
import styles from './logo.module.css';
const Logo = () => {
	return (
		<h1 className={styles.name} style={{ display: 'inline-block' }}>
			<Link href='/'>Pinatas</Link>
		</h1>
	);
};

export default Logo;
