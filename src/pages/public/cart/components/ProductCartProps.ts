interface ProductCartProps {
    idProduct: string
    productName: string;
    quantity: number;
    totalPrice: number;
    stock: number;
    img1: string;
    onDelete: () => void;
    onProductClick: () => void;
    updateQuantity: (newQuantity: number) => void;
}