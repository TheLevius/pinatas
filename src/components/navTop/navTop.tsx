'use client';

import { useNav } from '@/store/navStore';
import Menu from 'antd/es/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

const navTop = () => {
	const { sideCollapsed, setSideCollapsed } = useNav((state) => state);
	const pathname = usePathname();
	return (
		<div
			style={{
				width: '100%',
				height: sideCollapsed ? 0 : '46px',
				backgroundColor: '#ffffff',
				transition: '300ms',
				overflow: 'hidden',
				textAlign: 'center',
			}}
		>
			<Menu
				// onClick={() => setSideCollapsed()}
				selectedKeys={[pathname]}
				mode='horizontal'
				items={menuItems}
				style={{ justifyContent: 'center' }}
			/>
		</div>
	);
};

export default navTop;
