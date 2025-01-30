"use client";
import { CatalogProps } from "./page";
import { useEffect, useRef } from "react";

import styles from "./catalog.module.css";
import Image from "next/image";
import { FavoriteHeart } from "../../components/FavoriteHeart";
import Select, { SelectProps } from "antd/es/select";
import Pagination from "antd/es/pagination/Pagination";
import Link from "next/link";
import Switch from "antd/es/switch";
import { initPage, Product, useCatalog } from "@/store/catalogStore";
import Breadcrumb from "antd/es/breadcrumb";

export type BreadCrumb = {
	title: string;
	href: string;
};

const breadcrumbItems = [
	{ title: "Главная", href: "/" },
	{ title: "Каталог", href: "/catalog" },
];
export type LocalStorageStateNameTuple = [
	"favoriteIds",
	"selectedCategories",
	"selectedSort",
	"onlyFavorites"
];

export const lsStateNames: LocalStorageStateNameTuple = [
	"favoriteIds",
	"selectedCategories",
	"selectedSort",
	"onlyFavorites",
];

export type InitForms = {
	onlyFavorites: boolean;
	selectedSort: SelectedSort;
	favoriteIds: number[];
	selectedCategories: string[];
};

type Option = {
	value: "nameAsc" | "nameDesc" | "priceAsc" | "priceDesc";
	label: string;
};

export const sortOptions: Option[] = [
	{ value: "nameAsc", label: "название ↑" },
	{ value: "nameDesc", label: "название ↓" },
	{ value: "priceAsc", label: "цена ↑" },
	{ value: "priceDesc", label: "цена ↓" },
];

export type SortValue = Option["value"];
type SortComparators = {
	[key in SortValue]: (a: Product, b: Product) => number;
};
export const sortComparators: SortComparators = {
	nameAsc: (a, b) => (a.name > b.name ? 1 : -1),
	nameDesc: (a, b) => (a.name < b.name ? 1 : -1),
	priceAsc: (a, b) => a.price - b.price,
	priceDesc: (a, b) => b.price - a.price,
};

type SortComparatorKeys = keyof SortComparators;
export type SelectedSort = SortComparatorKeys | "";

const Catalog = (props: CatalogProps) => {
	const {
		categories,
		selectedCategories,
		onlyFavorites,
		limit,
		totalCount,
		page,
		currentPageProducts,
		setProducts,
		setSelectedSort,
		setSelectedCategories,
		switchFavorite,
		setClientSettings,
		toggleOnlyFavorites,
		setPage,
	} = useCatalog((store) => store);
	const isMounted = useRef(false);

	const handleOnlyFavorites = (onlyFavorites: boolean) =>
		toggleOnlyFavorites(onlyFavorites);

	const handleSort = (value: SortValue) => setSelectedSort(value);

	const handleCategoryChange = (value: string[]) =>
		setSelectedCategories(value);

	const handleChangePage = (page: number) => setPage(page);

	useEffect(() => {
		if (!isMounted.current) {
			const initForms: InitForms = {
				favoriteIds: [],
				selectedCategories: [],
				selectedSort: "",
				onlyFavorites: false,
			};
			lsStateNames.forEach((key) => {
				const rawValue = localStorage.getItem(key);
				if (rawValue !== null) {
					(initForms[key] as InitForms[keyof InitForms]) =
						JSON.parse(rawValue);
				}
			});
			isMounted.current = true;
			setProducts(props.products);
			setClientSettings(initForms);
		}
	}, []);

	return (
		<div className={`${styles.container}`}>
			<div className={styles.panel}>
				<Breadcrumb items={breadcrumbItems} />
			</div>
			{/* <div className={`${styles.panel} ${styles.contentCenter}`}>
				<Link href={'/catalog/favorites'}>Избранное</Link>
			</div> */}

			<h1 className={styles.header}>Каталог</h1>
			<div className={`${styles.panel} ${styles.spacebetween}`}>
				<Select
					onChange={handleSort}
					placeholder="Сортировать"
					options={sortOptions}
				/>
				<div className={`${styles.box}`}>
					<p>Избранное</p>
					<Switch
						checked={onlyFavorites}
						onChange={handleOnlyFavorites}
					/>
				</div>
			</div>
			<div className={`${styles.panel}`}>
				<Select
					mode="multiple"
					allowClear
					style={{ width: "100%" }}
					placeholder="Категории"
					variant="borderless"
					onChange={handleCategoryChange}
					value={selectedCategories}
					options={
						categories.map((category) => ({
							value: category,
							label: category,
						})) as SelectProps["options"]
					}
				/>
			</div>

			{currentPageProducts.map((product) => {
				return (
					<div key={product.sku} className={`${styles.item}`}>
						<Link
							href={`/catalog/${product.sku}`}
							className={`${styles.imageContainer}`}
						>
							<div className={`${styles.imageContainer}`}>
								<Image
									src={`/img/products/${
										product.images[0] || "IMG_1550"
									}.webp`}
									alt={product.sku}
									fill
									sizes="(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px"
									style={{
										objectFit: "cover",
										objectPosition: "center",
									}}
									priority
								/>
								<div
									className={styles.favoriteButton}
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();
										switchFavorite(product.id);
									}}
								>
									<FavoriteHeart
										favorite={product.favorite}
									/>
								</div>
							</div>
							<p>{product.name}</p>
							<h3>{product.price} BYN</h3>
						</Link>
					</div>
				);
			})}
			<div className={`${styles.panel} ${styles.contentCenter}`}>
				<Pagination
					defaultCurrent={initPage}
					current={page}
					total={totalCount}
					defaultPageSize={limit}
					pageSize={limit}
					showSizeChanger={false}
					align="center"
					onChange={handleChangePage}
				/>
			</div>
		</div>
	);
};
export default Catalog;
