import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import * as dotenv from 'dotenv';
import { fetchProductsAndImages } from '@/utils/fetchCatalog';
import {
	productAndImageJoin,
	productAndImageParse,
} from '@/utils/catalogParsers';
dotenv.config();

const prodImgRel = process.env.PRODUCTS_IMG_REL;
const DATA_API_URL = `https://docs.google.com/spreadsheets/d/e/${process.env.SHEETS_TABLE_ID}/pub?gid=0&single=true&output=csv`;
const IMAGES_API_URL = `https://docs.google.com/spreadsheets/d/e/${process.env.SHEETS_TABLE_ID}/pub?gid=${prodImgRel}&single=true&output=csv`;
const dirPath = join(process.cwd(), 'src', 'data');

(async () => {
	const dataStrings = await fetchProductsAndImages([
		DATA_API_URL,
		IMAGES_API_URL,
	]);
	const productsStr = JSON.stringify(
		productAndImageJoin(productAndImageParse(dataStrings))
	);
	const readyModuleContent = `export const products = ${productsStr}`;
	const productsJSONFileName = 'products.json';
	const productsReadyFileName = 'readyProducts.ts';
	await Promise.all([
		writeFile(join(dirPath, productsJSONFileName), productsStr),
		writeFile(join(dirPath, productsReadyFileName), readyModuleContent),
	]).catch(console.error);
	console.log('done: ', productsJSONFileName, productsReadyFileName);
})();
