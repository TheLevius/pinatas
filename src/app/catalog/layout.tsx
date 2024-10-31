// import { AntdRegistry } from '@ant-design/nextjs-registry';

import type { Metadata } from 'next';
// import Link from 'next/link';
import 'photoswipe/dist/photoswipe.css';
// import HeaderModalButton from '../components/HeaderModalButton';

// import Layout from 'antd/es/layout';
// import { Content, Header } from 'antd/es/layout/layout';
// import Menu from 'antd/es/menu';
// import Logo from '../components/logo/Logo';

export const metadata: Metadata = {
	title: 'Пиньята каталог',
	description: 'Каталог пиньят',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
