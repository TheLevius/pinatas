import styles from "./badge.module.css";
const Badge = ({ value }: { value: string }) => (
	<div className={styles.badge}>
		<span className={styles.value}>{value}</span>
	</div>
);

export default Badge;
