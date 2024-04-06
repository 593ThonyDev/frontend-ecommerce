
export interface ProductRequest {
    name: string;
    img1?: File;
    img2?: File;
    img3?: File;
    price: number;
    stock: number;
    categoria: number;
    status?: string;
    created?: string;
    description: string;
}