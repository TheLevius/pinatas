import Menu from 'antd/es/menu';
import Link from 'next/link';

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

const NavigationAnt = () => {
	return (
		<nav>
			<Menu items={menuItems} />
		</nav>
	);
};

export default NavigationAnt;
