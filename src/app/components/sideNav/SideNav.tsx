'use client';

import Sider from 'antd/es/layout/Sider';
import styles from './sideNav.module.css';
import Button from 'antd/es/button';
import { useState } from 'react';
import { useNav } from '@/store/navStore';
import NavigationAnt from '../navigationant/NavigationAnt';

const SideNav = () => {
	const sideCollapsed = useNav((state) => state.sideCollapsed);
	return (
		<Sider collapsed={sideCollapsed} collapsedWidth={0}>
			<NavigationAnt />
		</Sider>
	);
};

export default SideNav;
