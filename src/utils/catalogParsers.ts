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

export const parseProductsFromCSV = (rows: string[][]): Product[] => {
	const headers = rows[0];
	const indexes = {
		id: headers.indexOf('id'),
		sku: headers.indexOf('sku'),
		name: headers.indexOf('name'),
		price: headers.indexOf('price'),
		category: headers.indexOf('category'),
		description: headers.indexOf('description'),
		color: headers.indexOf('color'),
		diameter: headers.indexOf('diameter'),
		len: headers.indexOf('len'),
		depth: headers.indexOf('depth'),
		height: headers.indexOf('height'),
	};
	return rows.slice(1).map((row) => ({
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
	}));
};

export const parseImgLinksFromCSV = (rows: string[][]): ProductImages[] => {
	return rows.slice(1).map((row) => ({
		sku: String(row[0]),
		images: [row[1]],
	}));
};

export const productAndImageParse = ({
	0: productStrings,
	1: imageStrings,
}: string[][][]) => {
	return {
		products: parseProductsFromCSV(productStrings),
		images: parseImgLinksFromCSV(imageStrings),
	};
};

export const productAndImageJoin = ({
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
