import { Category } from "../../landing/categories/model/Category";

export interface Product {
    idProduct?: number;
    name: string;
    img1?: File;
    img2?: File;
    img3?: File;
    price: number;
    stock: number;
    status?: string;
    created?: string;
    description: string;
    Category?: Category;
    [key: string]: any; // Added to allow dynamic image keys
  }