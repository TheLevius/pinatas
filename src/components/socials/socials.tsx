import Link from 'next/link';
import styles from './socials.module.css';
import {
	InstagramIcon,
	SvgProps,
	TelegramIcon,
	ViberIcon,
} from '../icons/socialIcons';
export type SocialLinkItem = {
	label: string;
	href: string;
	svgIcon: React.FC<SvgProps>;
};

const socialLinkItems: SocialLinkItem[] = [
	{
		label: 'instagram',
		href: 'https://instagram.com/pinatas_by',
		svgIcon: InstagramIcon,
	},
	{
		label: 'telegram',
		href: 'https://t.me/tarasova_nastassia',
		svgIcon: TelegramIcon,
	},
	{
		label: 'viber',
		href: 'viber://chat?number=375257098221',
		svgIcon: ViberIcon,
	},
];

const Socials = () => {
	return socialLinkItems.map((item) => (
		<Link
			key={item.label}
			href={item.href}
			target='_blank'
			className={styles.socialLinkIcons}
		>
			<item.svgIcon />
		</Link>
	));
};

export default Socials;
