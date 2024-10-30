import { AntdRegistry } from '@ant-design/nextjs-registry';

import type { Metadata } from 'next';
import Link from 'next/link';
import 'photoswipe/dist/photoswipe.css';
import HeaderModalButton from '../components/HeaderModalButton';

import Layout from 'antd/es/layout';
import { Content } from 'antd/es/layout/layout';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

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
		<AntdRegistry>
			<Layout>
				<Content>{children}</Content>
			</Layout>
			{/* <div id={modalRootId}></div> */}
		</AntdRegistry>
	);
}
