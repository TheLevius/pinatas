import styles from './page.module.css';
import Link from 'next/link';

export default async function Home() {
	return (
		<main className={styles.main}>
			<Link href={`/catalog`}>Catalog</Link>
		</main>
	);
}
