import { AntdRegistry } from '@ant-design/nextjs-registry';
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';
import Menu from 'antd/es/menu';
import type { Metadata } from 'next';
import Link from 'next/link';
import 'photoswipe/dist/photoswipe.css';
import HeaderModalButton from '../components/HeaderModalButton';
import Socials from '../components/socials/socials';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
const currentYear = new Date().getFullYear();
export const metadata: Metadata = {
	title: 'Пиньята каталог',
	description: 'Каталог пиньят',
};

export const modalRootId = 'modal-root' as const;
export type ModalRoot = typeof modalRootId;

const menuItems = [
	{
		label: <Link href='/'>Главная</Link>,
		key: '/',
	},
	{
		label: <Link href='/catalog'>Каталог</Link>,
		key: '/catalog',
	},
	{
		label: <Link href='/catalog/favorites'>Избранное</Link>,
		key: '/catalog/favorites',
	},
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<AntdRegistry>
					<Layout>
						<Header
							style={{
								backgroundColor: '#0780f3',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<h2 style={{ color: '#ffffff' }}>Пиньята лого</h2>
							<Menu
								theme='light'
								mode='horizontal'
								defaultSelectedKeys={[menuItems[1].key]}
								items={menuItems}
								style={{ flex: 1, minWidth: 0 }}
							/>
							<HeaderModalButton modalRootId={modalRootId} />
						</Header>
						<Content>{children}</Content>
						<Footer
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<h2>Пиньята лого</h2>
							<div style={{ display: 'flex', gap: '16px' }}>
								<Socials />
							</div>
							<div>© {currentYear} Pinatas.by</div>
						</Footer>
					</Layout>
					<div id={modalRootId}></div>
				</AntdRegistry>
			</body>
		</html>
	);
}
