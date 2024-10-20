const { writeFile } = require('fs/promises');
const { join } = require('path');
require('dotenv').config();

type Product = {
	id: number;
	sku: string;
	name: string;
	price: number;
	category: string;
	description: string;
	favorite: boolean;
	images: string[];
};

type ProductImages = {
	sku: string;
	images: string[];
};

const prodImgRel = process.env.PRODUCTS_IMG_REL;
const DATA_API_URL = `https://docs.google.com/spreadsheets/d/e/${process.env.SHEETS_TABLE_ID}/pub?gid=0&single=true&output=csv`;
const IMAGES_API_URL = `https://docs.google.com/spreadsheets/d/e/${process.env.SHEETS_TABLE_ID}/pub?gid=${prodImgRel}&single=true&output=csv`;
const dirPath = join(process.cwd(), 'src', 'data');

const parseCatalogFromCSV = (rows: string[][]): Product[] => {
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
const parseImgLinksFromCSV = (rows: string[][]): ProductImages[] => {
	return rows.slice(1).map((row) => ({
		sku: String(row[0]),
		images: [row[1]],
	}));
};

(async () => {
	const fetchProductsWithImages = async (urls: string[]) => {
		const results = await Promise.all(urls.map((url) => fetch(url)));
		const textResults = await Promise.all(
			results.map((result) => result.text())
		);
		const dataStrings = textResults.map((text) =>
			text.split('\n').map((row) => row.trim().split(','))
		);
		return dataStrings;
	};
	const productImageParse = ({
		0: productStrings,
		1: imageStrings,
	}: string[][][]) => {
		return {
			products: parseCatalogFromCSV(productStrings),
			images: parseImgLinksFromCSV(imageStrings),
		};
	};

	const productImageJoin = ({
		products,
		images,
	}: {
		products: Product[];
		images: ProductImages[];
	}): Product[] =>
		products.map((product) => {
			const imageItem = images.find((image) => image.sku === product.sku);
			if (imageItem) {
				product.images = [...imageItem.images];
			}
			return product;
		});
	const dataStrings = await fetchProductsWithImages([
		DATA_API_URL,
		IMAGES_API_URL,
	]);
	const productsStr = JSON.stringify(
		productImageJoin(productImageParse(dataStrings))
	);
	const readyModuleContent = `export const products = ${productsStr}`;
	await Promise.all([
		writeFile(join(dirPath, 'products.json'), productsStr),
		writeFile(join(dirPath, 'readyProducts.ts'), readyModuleContent),
	]).catch(console.error);
	console.log('done: ', 'products.json', 'readyProducts.ts');
})();
