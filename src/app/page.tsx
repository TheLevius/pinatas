import Hero from '@/components/landing/hero/Hero';
import styles from './page.module.css';
import Link from 'next/link';
import Features from '@/components/landing/features/Features';
import Reasons from '@/components/landing/reasons/Reasons';

export default async function Home() {
	return (
		<main className={styles.main}>
			{/* <Link href={`/catalog`}>Catalog</Link> */}
			<Hero />
			<Features />
			<Reasons />
		</main>
	);
}
