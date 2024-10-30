import Link from 'next/link';
import styles from './socials.module.css';
export type SocialLinkItem = {
	label: string;
	href: string;
	svgIcon: string;
};

const socialLinkItems: SocialLinkItem[] = [
	{
		label: 'instagram',
		href: 'https://instagram.com/pinatas_by',
		svgIcon: `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M23.923 7.096a8.702 8.702 0 00-.559-2.954A6.144 6.144 0 0019.855.633a8.804 8.804 0 00-2.913-.56C15.66.016 15.253 0 11.999 0 8.744 0 8.327 0 7.054.073c-.995.02-1.98.21-2.912.56a6.14 6.14 0 00-3.509 3.51 8.735 8.735 0 00-.558 2.911C.017 8.338 0 8.744 0 12c0 3.254 0 3.67.075 4.944.02.997.208 1.98.558 2.915a6.144 6.144 0 003.51 3.508c.93.364 1.915.567 2.913.6 1.283.057 1.69.074 4.944.074 3.255 0 3.672 0 4.945-.075a8.782 8.782 0 002.913-.558 6.15 6.15 0 003.509-3.51c.35-.932.538-1.916.558-2.914.058-1.282.075-1.689.075-4.944-.003-3.255-.003-3.668-.077-4.943zM11.99 18.153a6.16 6.16 0 01-6.162-6.161 6.16 6.16 0 0110.518-4.357 6.161 6.161 0 01-4.356 10.518zM18.397 7.04a1.435 1.435 0 01-1.016-2.453 1.435 1.435 0 012.451 1.016c0 .794-.642 1.437-1.435 1.437z" fill="currentColor"/><path d="M11.99 15.994a4.002 4.002 0 100-8.004 4.002 4.002 0 000 8.004z" fill="currentColor"/></svg>`,
	},
	{
		label: 'telegram',
		href: 'https://t.me/tarasova_nastassia',
		svgIcon: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9999 0C5.37594 0 -6.10352e-05 5.376 -6.10352e-05 12C-6.10352e-05 18.624 5.37594 24 11.9999 24C18.6239 24 23.9999 18.624 23.9999 12C23.9999 5.376 18.6239 0 11.9999 0ZM17.5679 8.16C17.3879 10.056 16.6079 14.664 16.2119 16.788C16.0439 17.688 15.7079 17.988 15.3959 18.024C14.6999 18.084 14.1719 17.568 13.4999 17.124C12.4439 16.428 11.8439 15.996 10.8239 15.324C9.63594 14.544 10.4039 14.112 11.0879 13.416C11.2679 13.236 14.3399 10.44 14.3999 10.188C14.4083 10.1498 14.4072 10.1102 14.3967 10.0726C14.3863 10.0349 14.3668 10.0004 14.3399 9.972C14.2679 9.912 14.1719 9.936 14.0879 9.948C13.9799 9.972 12.2999 11.088 9.02394 13.296C8.54394 13.62 8.11194 13.788 7.72794 13.776C7.29594 13.764 6.47994 13.536 5.86794 13.332C5.11194 13.092 4.52394 12.96 4.57194 12.54C4.59594 12.324 4.89594 12.108 5.45994 11.88C8.96394 10.356 11.2919 9.348 12.4559 8.868C15.7919 7.476 16.4759 7.236 16.9319 7.236C17.0279 7.236 17.2559 7.26 17.3999 7.38C17.5199 7.476 17.5559 7.608 17.5679 7.704C17.5559 7.776 17.5799 7.992 17.5679 8.16Z" fill="currentColor" />
</svg>`,
	},
];

const Socials = () => {
	return socialLinkItems.map((item) => (
		<Link
			href={item.href}
			target='_blank'
			className={styles.socialLinkIcons}
			dangerouslySetInnerHTML={{ __html: item.svgIcon }}
		></Link>
	));
};

export default Socials;
