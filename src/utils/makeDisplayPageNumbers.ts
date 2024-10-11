export const makeDisplayPageNumbers = (
	page: number,
	totalPages: number,
	displayPageRange: number
): number[] => {
	let startPage = Math.max(1, page - Math.floor(displayPageRange / 2));
	const endPage = Math.min(totalPages, startPage + displayPageRange - 1);
	const pageNumbers = [];
	if (endPage - startPage + 1 < displayPageRange) {
		startPage = Math.max(1, endPage - displayPageRange + 1);
	}
	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	return pageNumbers;
};
