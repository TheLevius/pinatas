import { AntdRegistry } from '@ant-design/nextjs-registry';
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Пиньята каталог',
	description: 'Каталог пиньят',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<AntdRegistry>
					<Layout>
						<Header>Header</Header>
						<Content>{children}</Content>
						<Footer>Footer</Footer>
					</Layout>
				</AntdRegistry>
			</body>
		</html>
	);
}
