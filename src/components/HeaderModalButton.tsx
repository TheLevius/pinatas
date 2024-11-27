'use client';
import Button from 'antd/es/button';
import { useState } from 'react';
import OrderModal from './OrderModal';

const HeaderModalButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	return (
		<>
			<Button
				onClick={openModal}
				size='middle'
				color='primary'
				variant='outlined'
			>
				Заказать
			</Button>
			{isOpen && <OrderModal onClose={closeModal} />}
		</>
	);
};

export default HeaderModalButton;
