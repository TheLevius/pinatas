import { create } from 'zustand';

type ProductState = {
	currentProductPicture: string;
};

type ProductActions = {
	setCurrentProductPicture: (value: string) => void;
};

export const useProduct = create<ProductState & ProductActions>((set, get) => ({
	currentProductPicture: '',
	setCurrentProductPicture: (value) =>
		set(() => ({ currentProductPicture: value })),
}));
