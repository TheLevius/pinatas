import Catalog from './catalog';

export type Product = {
	id: number;
	sku: string;
	name: string;
	price: number;
	category: string;
	description: string;
	favorite?: boolean;
};
export type Version = { current: number; prev: number };

export type CatalogProps = {
	products: Product[];
	version: Version;
};

const DATA_API_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQsGqVIO54lOQnaSnsan2m5p9-JCLI37AqF6x9PPy3Q79GaG8waMPcypHW841ISf8lXSa7YKFp9L6me/pub?gid=0&single=true&output=csv`;
const VERSION_API_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQsGqVIO54lOQnaSnsan2m5p9-JCLI37AqF6x9PPy3Q79GaG8waMPcypHW841ISf8lXSa7YKFp9L6me/pub?gid=850009889&single=true&output=csv`;

export const parseCatalogFromCSV = (rows: string[][]) => {
	const headers = rows[0];
	const indexes = {
		id: headers.indexOf('id'),
		sku: headers.indexOf('sku'),
		name: headers.indexOf('name'),
		price: headers.indexOf('price'),
		category: headers.indexOf('category'),
		description: headers.indexOf('description'),
	};
	return rows.slice(1).map((row) => ({
		id: Number(row[indexes.id]),
		sku: String(row[indexes.sku]),
		name: String(row[indexes.name]),
		price: Number(row[indexes.price]),
		category: String(row[indexes.category]),
		description: String(row[indexes.description]),
		favorite: false,
	}));
};

export const fetchCatalog = async (): Promise<CatalogProps> => {
	const catalog: CatalogProps = {
		products: [],
		version: {
			current: 0,
			prev: 0,
		},
	};
	try {
		const { 0: data_rows, 1: ver_rows } = await Promise.all(
			[DATA_API_URL, VERSION_API_URL].map((url) =>
				fetch(url, { next: { revalidate: 3600 } }).then((res) =>
					res
						.text()
						.then((text) =>
							text.split('\n').map((row) => row.trim().split(','))
						)
				)
			)
		);
		catalog.products = parseCatalogFromCSV(data_rows);
		catalog.version.current = Number(ver_rows[1][0]);
		catalog.version.prev = Number(ver_rows[1][1]);
	} catch (err) {
		console.error(err);
	}
	return catalog;
};

const CatalogPage = async () => {
	const { products, version } = await fetchCatalog();
	return (
		<div>
			<h1>Catalog Page</h1>
			<Catalog products={products} version={version} />
		</div>
	);
};

export default CatalogPage;
