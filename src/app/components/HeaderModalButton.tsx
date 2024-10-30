'use client';

import Button from 'antd/es/button';
import { useState } from 'react';
import OrderModal from './OrderModal';
import { ModalRoot } from '../catalog/layout';

const HeaderModalButton = ({ modalRootId }: { modalRootId: ModalRoot }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	return (
		<>
			<Button
				onClick={openModal}
				color='primary'
				variant='outlined'
				size='large'
			>
				Заказать
			</Button>
			{isOpen && <OrderModal onClose={closeModal} modalRootId={modalRootId} />}
		</>
	);
};

export default HeaderModalButton;
