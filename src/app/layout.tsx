import type { Metadata } from 'next';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';
import { App, Button, Menu } from 'antd';

import Link from 'next/link';
import Logo from './components/logo/Logo';
import Socials from './components/socials/socials';
import NavigationAnt from './components/navigationant/NavigationAnt';
import Sider from 'antd/es/layout/Sider';
import SideNav from './components/sideNav/SideNav';
import Burger from './components/burger/Burger';
import NavTop from './components/navTop/navTop';
// import Header from './components/header/Header';
// import Footer from './components/footer/Footer';

export const metadata: Metadata = {
	title: 'Pinatas',
	description: 'Заказать пиньяту',
};
const currentYear = new Date().getFullYear();
const menuItems = [
	// {
	// 	label: <Link href='/'>Главная</Link>,
	// 	key: '/',
	// },
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
					<App>
						<Layout>
							<Layout>
								<Header
									style={{
										padding: '0 16px',
										height: '80px',
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
										backgroundColor: 'var(--background)',
									}}
								>
									<Logo />
									<Burger />
								</Header>
								<NavTop />
								<Content>{children}</Content>
								<Footer className='container'>
									<Logo />
									<div style={{ display: 'flex', gap: '16px' }}>
										<Socials />
									</div>
									<div>© {currentYear} Pinatas.by</div>
								</Footer>
							</Layout>
							{/* <SideNav /> */}
						</Layout>
					</App>
				</AntdRegistry>
			</body>
		</html>
	);
}
