// import { Product } from '@/store/catalogStore';

// const DATA_API_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vR8UmEz-_HwqidHON5MCNC2piOtEsyqpAtAZ_kOJoo0V0EAxrfL5kYC9XHHIaGwAkRe32eYCM74cN2p/pub?gid=0&single=true&output=csv`;

// export const parseCatalogFromCSV = (rows: string[][]) => {
// 	const headers = rows[0];
// 	const indexes = {
// 		id: headers.indexOf('id'),
// 		sku: headers.indexOf('sku'),
// 		name: headers.indexOf('name'),
// 		price: headers.indexOf('price'),
// 		category: headers.indexOf('category'),
// 		description: headers.indexOf('description'),
// 	};
// 	return rows.slice(1).map((row) => ({
// 		id: Number(row[indexes.id]),
// 		sku: String(row[indexes.sku]),
// 		name: String(row[indexes.name]),
// 		price: Number(row[indexes.price]),
// 		category: String(row[indexes.category]),
// 		description: String(row[indexes.description]),
// 		favorite: false,
// 		images: [`${String(row[indexes.sku])}_${0}`],
// 	}));
// };
// let cachedProducts: Product[] = [];
// let fetchPromise: Promise<Product[]> | null = null;

// const fetchProducts = async (): Promise<Product[]> => {
// 	if (cachedProducts.length > 0) {
// 		return cachedProducts;
// 	}

// 	if (fetchPromise === null) {
// 		fetchPromise = (async () => {
// 			try {
// 				console.log('------ЗАПРОС------>');
// 				const data = await fetch(DATA_API_URL);
// 				const text = await data.text();
// 				const data_rows = text.split('\n').map((row) => row.trim().split(','));
// 				cachedProducts = parseCatalogFromCSV(data_rows);
// 				return cachedProducts;
// 			} catch (err) {
// 				console.error(err);
// 				throw err;
// 			} finally {
// 				fetchPromise = null;
// 			}
// 		})();
// 	}

// 	return fetchPromise;
// };
// export default fetchProducts;
