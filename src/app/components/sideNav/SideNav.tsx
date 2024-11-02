'use client';
import { useEffect } from 'react';
import Sider from 'antd/es/layout/Sider';
import { useNav } from '@/store/navStore';
import NavigationAnt from '../navigationant/NavigationAnt';
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import Button from 'antd/es/button';

const SideNav = () => {
	const { sideCollapsed, switchSideCollapsed, setSideCollapsed } = useNav(
		(state) => state
	);
	const handleOverlayClick = () => setSideCollapsed();
	const handleSideClick = () => switchSideCollapsed();
	useEffect(() => {
		if (!sideCollapsed) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
		return () => {
			document.body.classList.remove('no-scroll');
		};
	}, [sideCollapsed]);
	return (
		<>
			{!sideCollapsed && (
				<div
					onClick={handleOverlayClick}
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						zIndex: 10,
					}}
				></div>
			)}
			<Sider
				onClick={handleSideClick}
				collapsed={sideCollapsed}
				collapsedWidth={0}
				style={{ zIndex: 20, backgroundColor: '#ffffff' }}
			>
				<div
					style={{
						height: '80px',
						display: 'flex',
						padding: '0 16px',
						alignItems: 'center',
					}}
				>
					<Button shape='circle' icon={<CloseOutlined />} size={'large'} />
				</div>
				<NavigationAnt />
			</Sider>
		</>
	);
};

export default SideNav;
