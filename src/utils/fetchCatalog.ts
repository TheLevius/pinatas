export const fetchProductsAndImages = async (urls: string[]) => {
	const results = await Promise.all(urls.map((url) => fetch(url)));
	const textResults = await Promise.all(results.map((result) => result.text()));
	const dataStrings = textResults.map((text) =>
		text.split('\n').map((row) => row.trim().split(','))
	);
	return dataStrings;
};
