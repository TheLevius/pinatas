export type Product = {
	id: number;
	sku: string;
	name: string;
	price: number;
	category: string;
	description: string;
	color: string;
	diameter: number;
	len: number;
	depth: number;
	height: number;
	favorite: boolean;
	images: string[];
};

export type ProductImages = {
	sku: string;
	images: string[];
};

export type ReasonsForPinata = {
	id: number;
	reason: string;
	description: string;
	image: string;
};
export type Feedback = {
	id: number;
	photo: string;
	screen: string;
};
type Db = {
	products: Product[];
	productImages: ProductImages[];
	reasonsForPinata: ReasonsForPinata[];
	feedback: Feedback[];
};
// type MakeIndexes = <T>(headers: (keyof T)[]) => Record<keyof T, number>;
// const makeIndexes: MakeIndexes = <T>(headers: (keyof T)[]) => {
// 	return headers.reduce((indexes, name) => {
// 		indexes[name] = headers.indexOf(name);
// 		return indexes;
// 	}, {} as Record<keyof T, number>);
// }

const feedbackMapper: Mapper<Feedback> = (row, indexes) => ({
	id: Number(row[indexes.id]),
	photo: row[indexes.photo],
	screen: row[indexes.screen],
});

const reasonsForPinataMapper: Mapper<ReasonsForPinata> = (row, indexes) => ({
	id: Number(row[indexes.id]),
	reason: row[indexes.reason],
	description: row[indexes.description],
	image: row[indexes.image],
});

const productMapper: Mapper<Product> = (row, indexes) => ({
	id: Number(row[indexes.id]),
	sku: row[indexes.sku],
	name: row[indexes.name],
	price: Number(row[indexes.price]),
	category: row[indexes.category],
	description: row[indexes.description],
	color: row[indexes.color],
	diameter: Number(row[indexes.diameter]) || 0,
	len: Number(row[indexes.len]) || 0,
	depth: Number(row[indexes.depth]) || 0,
	height: Number(row[indexes.height]) || 0,
	favorite: false,
	images: [`${String(row[indexes.sku])}_${0}`],
});

const productImagesMapper: Mapper<ProductImages> = (row, indexes) => ({
	sku: String(row[indexes.sku]),
	images: row.slice(1).filter((v) => v.length),
});

type Mapper<T> = (row: string[], indexes: Record<keyof T, number>) => T;
type ParseCSV = <T>(rows: string[][], mapper: Mapper<T>) => T[];
const parseCSV: ParseCSV = <T>(rows: string[][], mapper: Mapper<T>): T[] => {
	const headers = rows[0] as (keyof T)[];
	
	const indexes = headers.reduce((indexes, header) => {
		indexes[header] = headers.indexOf(header);
		return indexes;
	}, {} as Record<keyof T, number>);
	return rows.slice(1).map((row) => mapper(row, indexes));
};

export type MapperRecord = {
	products: Mapper<Product>;
	productImages: Mapper<ProductImages>;
	reasonsForPinata: Mapper<ReasonsForPinata>;
	feedback: Mapper<Feedback>;
};
type DbTuple = [
	["products", Mapper<Product>],
	["productImages", Mapper<ProductImages>],
	["reasonsForPinata", Mapper<ReasonsForPinata>],
	["feedback", Mapper<Feedback>]
];
export const dbKeyArray: DbTuple = [
	["products", productMapper],
	["productImages", productImagesMapper],
	["reasonsForPinata", reasonsForPinataMapper],
	["feedback", feedbackMapper],
];
// const myDb: MyDb = dbKeyArray.reduce((myDb, arr) => {
// 	myDb[arr[0]] = parseCSV();
// 	return myDb;
// }, {} as MyDb);

// export const parseReasonsForPinataFromCSV = (
// 	rows: string[][]
// ): ReasonForPinata[] => {
// 	const headers = rows[0] as (keyof ReasonForPinata)[];
// 	const indexes = headers.reduce((indexes, name) => {
// 		indexes[name] = headers.indexOf(name);
// 		return indexes;
// 	}, {} as Record<keyof ReasonForPinata, number>);
// 	return rows.slice(1).map((row) => ({
// 		id: Number(row[indexes.id]),
// 		reason: row[indexes.reason],
// 		description: row[indexes.description],
// 		image: row[indexes.image],
// 	}));
// };

// export const parseFeedbacksFromCSV = (rows: string[][]): Feedback[] => {
// 	const headers = rows[0] as (keyof Feedback)[];
// 	const { id, photo, screen } = headers.reduce((indexes, name) => {
// 		indexes[name] = headers.indexOf(name);
// 		return indexes;
// 	}, {} as Record<keyof Feedback, number>);
// 	return rows.slice(1).map((row) => ({
// 		id: Number(row[id]),
// 		photo: row[photo],
// 		screen: row[screen],
// 	}));
// };
// export const parseProductsFromCSV = (rows: string[][]): Product[] => {
// 	const headers = rows[0];
// 	const indexes = {
// 		id: headers.indexOf("id"),
// 		sku: headers.indexOf("sku"),
// 		name: headers.indexOf("name"),
// 		price: headers.indexOf("price"),
// 		category: headers.indexOf("category"),
// 		description: headers.indexOf("description"),
// 		color: headers.indexOf("color"),
// 		diameter: headers.indexOf("diameter"),
// 		len: headers.indexOf("len"),
// 		depth: headers.indexOf("depth"),
// 		height: headers.indexOf("height"),
// 	};
// 	return rows.slice(1).map((row) => ({
// 		id: Number(row[indexes.id]),
// 		sku: row[indexes.sku],
// 		name: row[indexes.name],
// 		price: Number(row[indexes.price]),
// 		category: row[indexes.category],
// 		description: row[indexes.description],
// 		color: row[indexes.color],
// 		diameter: Number(row[indexes.diameter]) || 0,
// 		len: Number(row[indexes.len]) || 0,
// 		depth: Number(row[indexes.depth]) || 0,
// 		height: Number(row[indexes.height]) || 0,
// 		favorite: false,
// 		images: [`${String(row[indexes.sku])}_${0}`],
// 	}));
// };

// export const parseImgLinksFromCSV = (rows: string[][]): ProductImages[] => {
// 	return rows.slice(1).map((row) => ({
// 		sku: String(row[0]),
// 		images: row.filter((v, i) => i > 0 && v.length > 0),
// 	}));
// };

// export const productAndImageParse = ({
// 	0: productStrings,
// 	1: imageStrings,
// }: string[][][]) => {
// 	return {
// 		products: parseProductsFromCSV(productStrings),
// 		images: parseImgLinksFromCSV(imageStrings),
// 	};
// };
export const getCurrentDb = (entries: string[][][], dbKeyArray: DbTuple) =>
	dbKeyArray.reduce((db, { 0: name, 1: mapper }, i) => {
		db[name] = parseCSV(entries[i], mapper as Mapper<any>);
		return db;
	}, {} as Db);

export const productAndImageJoin = ({
	products,
	productImages,
}: Db): Product[] =>
	products.map((product) => {
		const imageItem = productImages.find(
			(image) => image.sku === product.sku
		);
		if (imageItem) {
			product.images = [...imageItem.images];
		}
		return product;
	});
