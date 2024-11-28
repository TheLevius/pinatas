import Hero from '@/components/landing/hero/Hero';
import styles from './page.module.css';
import Features from '@/components/landing/features/Features';
import Reasons from '@/components/landing/reasons/Reasons';
import Feedback from '@/components/landing/feedback/Feedback';

export default async function Home() {
	return (
		<main className={`${styles.main}`}>
			<Hero />
			<Features />
			<Reasons />
			<Feedback />
		</main>
	);
}
