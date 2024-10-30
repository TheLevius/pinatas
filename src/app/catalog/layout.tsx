import { AntdRegistry } from '@ant-design/nextjs-registry';
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';
import Menu from 'antd/es/menu';
import type { Metadata } from 'next';
import Link from 'next/link';
import 'photoswipe/dist/photoswipe.css';
import HeaderModalButton from '../components/HeaderModalButton';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

export const metadata: Metadata = {
	title: 'Пиньята каталог',
	description: 'Каталог пиньят',
};

export const modalRootId = 'modal-root' as const;
export type ModalRoot = typeof modalRootId;
const menuItems = [
	{
		label: <Link href='/'>Главная</Link>,
		key: 'Home',
	},
	{
		label: <Link href='/catalog'>Каталог</Link>,
		key: 'Catalog',
	},
	{
		label: <Link href='/catalog/favorites'>Избранное</Link>,
		key: 'Favorites',
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
						<Header style={{ backgroundColor: '#0780f3', display: 'flex' }}>
							<h2 style={{ color: '#ffffff' }}>Пиньята бай</h2>
							<Menu
								theme='light'
								mode='horizontal'
								defaultSelectedKeys={['2']}
								items={menuItems}
								style={{ flex: 1, minWidth: 0 }}
							/>
							<HeaderModalButton modalRootId={modalRootId} />
						</Header>
						<Content>{children}</Content>
						<Footer>Footer</Footer>
					</Layout>
					<div id={modalRootId}></div>
				</AntdRegistry>
			</body>
		</html>
	);
}
