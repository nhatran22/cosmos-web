import { CategoryBase } from "./category";

export interface NavBar extends SubItem {
    submenu?: SubMenu[];
}

export interface SubMenu {
    id?: string;
    title: string;
    href?: string;
    image?: string;
    fullName?: string;
    items?: SubItem[];
}

export interface SubItem {
    id?: string;
    name: string;
    href: string;
    fullName?: string;
    image?: string;
}

export interface AdditionalHeader {
    id: string;
    name: string;
    subCategory: CategoryBase[];
}