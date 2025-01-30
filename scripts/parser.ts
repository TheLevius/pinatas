import { Product, ReasonsForPinata } from "./../src/utils/catalogParsers";
import { ProductImages } from "./../src/store/catalogStore";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import Papa from "papaparse";

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
	const results = await Promise.all(csvURLTables.map((url) => fetch(url)));
	const textResults = await Promise.all(
		results.map((result) => result.text())
	);
	const numFields = ["id", "price", "diameter", "len", "depth", "height"];
	const zeroValues = ["price", "diameter", "len", "depth", "height"];
	const options = {
		delimiter: ",",
		header: true,
		transformHeader: (header: string) => header.trim(),
		transform: (v: string | null, field: string) => {
			if (v === null) {
				return zeroValues.includes(field) ? 0 : "";
			}
			if (numFields.includes(field)) {
				return Number(v);
			}
			if (v === "FALSE") {
				return false;
			}
			return v;
		},
		dynamicTyping: false,
		skipEmptyLines: true,
		comments: "#",
	};
	const {
		0: products,
		1: productImages,
		2: reasonsForPinata,
		3: feedback,
	} = textResults.map((text) => Papa.parse(text, options));

	// const tableStrings = await fetchTables(csvURLTables);
	// const currentDb = getCurrentDb(tableStrings, dbKeyArray);

	// const productRelImages = productAndImageJoin(currentDb);

	// const db = {
	// 	products: productRelImages,
	// 	feedback: currentDb.feedback,
	// 	reasonForPinata: currentDb.reasonsForPinata,
	// };
	const productImageArrays: string[][] = (
		productImages.data as Record<string, string>[]
	).map((productImage: Record<string, string>) =>
		Object.values(productImage).filter(Boolean)
	);
	const rawProducts = products.data as Product[];
	const readyProducts = rawProducts.reduce<Product[]>(
		(products: Product[], product: Product) => {
			const currentProductImages = productImageArrays.find(
				(pIArr) => pIArr[0] === product.sku
			);
			if (currentProductImages) {
				product.images = currentProductImages.slice(1);
			} else {
				product.images = ["dummy"];
			}

			return products;
		},
		rawProducts
	);
	const dbStr = JSON.stringify({
		products: readyProducts,
		reasonsForPinata: reasonsForPinata.data,
		feedback: feedback.data,
	});

	const readyModuleContent = `export const db = ${dbStr}`;
	const dbJSONFileName = "db.json";
	const dbReadyFileName = "readyDb.ts";
	await Promise.all([
		writeFile(join(dirPath, dbJSONFileName), dbStr),
		writeFile(join(dirPath, dbReadyFileName), readyModuleContent),
	]);
	console.log("done: ", dbJSONFileName, dbReadyFileName);
})();
