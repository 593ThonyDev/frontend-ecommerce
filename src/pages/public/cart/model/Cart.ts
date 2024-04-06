interface Order {
    content: OrderItem[];
    extracontent: OrderExtraContent;
}

interface OrderItem {
    price: number;
    quantity: number;
    preference: string;
    product: Product;
}

interface Product {
    idProduct: number;
    name: string;
    img1: string;
}

interface OrderExtraContent {
    customer: Customer;
    code: string;
    ammount: number;
    date: string;
}

interface Customer {
    idCustomer: number;
    fullName: string;
    email: string;
    address: string;
    country: string;
    zip: string;
}
