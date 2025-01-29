import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import * as dotenv from "dotenv";
import { fetchTables } from "@/utils/fetchCatalog";
import {
	dbKeyArray,
	getCurrentDb,
	MapperRecord,
	productAndImageJoin,
} from "@/utils/catalogParsers";
dotenv.config();
const tableID = process.env.SHEETS_TABLE_ID || "";

const csvTables: [keyof MapperRecord, string][] = [
	["products", process.env.PRODUCTS || ""],
	["productImages", process.env.PRODUCTS_IMG_REL || ""],
	["reasonsForPinata", process.env.REASONS_FOR_PINATA || ""],
	["feedback", process.env.FEEDBACK || ""],
];
const csvURLTables = csvTables.map((entry) => {
	return (entry[1] = `https://docs.google.com/spreadsheets/d/e/${tableID}/pub?gid=${entry[1]}&single=true&output=csv`);
});

const dirPath = join(process.cwd(), "src", "data");

(async () => {
	const tableStrings = await fetchTables(csvURLTables);
	const currentDb = getCurrentDb(tableStrings, dbKeyArray);

	const productRelImages = productAndImageJoin(currentDb);

	const db = {
		products: productRelImages,
		feedback: currentDb.feedback,
		reasonForPinata: currentDb.reasonsForPinata,
	};
	const dbStr = JSON.stringify(db);

	const readyModuleContent = `export const db = ${dbStr}`;
	const dbJSONFileName = "db.json";
	const dbReadyFileName = "readyDb.ts";
	await Promise.all([
		writeFile(join(dirPath, dbJSONFileName), dbStr),
		writeFile(join(dirPath, dbReadyFileName), readyModuleContent),
	]);
	console.log("done: ", dbJSONFileName, dbReadyFileName);
	// const readyModuleContent = `export const products = ${productsStr}`;
	// const productsJSONFileName = "products.json";
	// const productsReadyFileName = "readyProducts.ts";
	// await Promise.all([
	// 	writeFile(join(dirPath, productsJSONFileName), productsStr),
	// 	writeFile(join(dirPath, productsReadyFileName), readyModuleContent),
	// ]).catch(console.error);
	// console.log("done: ", productsJSONFileName, productsReadyFileName);
})();
