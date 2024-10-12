import { CatalogProps } from '@/app/catalog/page';

const DATA_API_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQsGqVIO54lOQnaSnsan2m5p9-JCLI37AqF6x9PPy3Q79GaG8waMPcypHW841ISf8lXSa7YKFp9L6me/pub?gid=0&single=true&output=csv`;

const parseCatalogFromCSV = (rows: string[][]) => {
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
		images: [`${String(row[indexes.sku])}_${0}`],
	}));
};
const fetchCatalog = async (): Promise<CatalogProps> => {
	const catalog: CatalogProps = {
		products: [],
		categories: [],
	};
	try {
		const data = await fetch(DATA_API_URL, { next: { revalidate: 3600 } });
		const text = await data.text();
		const data_rows = text.split('\n').map((row) => row.trim().split(','));
		catalog.products = parseCatalogFromCSV(data_rows);
	} catch (err) {
		console.error(err);
	}
	const uniqueCats = catalog.products.reduce((cat, product) => {
		cat.add(product.category);
		return cat;
	}, new Set<string>());
	catalog.categories = Array.from(uniqueCats);
	return catalog;
};
export default fetchCatalog;
