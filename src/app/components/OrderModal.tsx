'use client';
import Button from 'antd/es/button';
import ReactDOM from 'react-dom';
import { ModalRoot } from '../catalog/layout';

const OrderModal = ({
	onClose,
	modalRootId,
}: {
	onClose: () => void;
	modalRootId: ModalRoot;
}) => {
	return ReactDOM.createPortal(
		<>
			<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 1000,
				}}
			>
				<div
					style={{
						backgroundColor: 'white',
						padding: '20px',
						borderRadius: '5px',
						width: '300px',
						textAlign: 'center',
					}}
				>
					<h1>Заказать Пиньяту</h1>
					<h3>+375257098221</h3>
					<p>tg: @tarasova_nastassia</p>
					<Button
						onClick={onClose}
						color='primary'
						variant='filled'
						size='large'
					>
						Закрыть
					</Button>
				</div>
			</div>
		</>,
		document.getElementById(modalRootId)!
	);
};

export default OrderModal;
