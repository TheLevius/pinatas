export type Product = {
	id: number;
	name: string;
	price: number;
	sku: string;
	favorite: boolean;
};
export const version = 1;
export const catalog: Product[] = [
	{
		id: 1,
		name: 'Киндер Сюрприз',
		price: 50,
		sku: 'pin_ks_blue_40',
		favorite: false,
	},
	{
		id: 2,
		name: 'Синий кит',
		price: 60,
		sku: 'pin_bw_blue_35',
		favorite: false,
	},
	{
		id: 3,
		name: 'Пиньята Бомба',
		price: 50,
		sku: 'pin_pbomb_red_45',
		favorite: false,
	},
	{
		id: 4,
		name: 'Воллейбольный мяч',
		price: 50,
		sku: 'pin_volleyball_purple_35',
		favorite: false,
	},
	{
		id: 5,
		name: 'Миньон',
		price: 60,
		sku: 'pin_minion_yellow_30',
		favorite: false,
	},
];
