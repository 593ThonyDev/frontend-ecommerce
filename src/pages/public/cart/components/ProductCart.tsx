import { useState } from "react";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { PATH_PRODUCTO_ID } from "../../../../routes/public/Paths";

const ProductCart: React.FC<ProductCartProps> = ({ idProduct, productName, stock, quantity, totalPrice, img1, onDelete, updateQuantity, onProductClick }) => {
    const [quantityState, setQuantityState] = useState(quantity);

    const handleQuantityChange = (newQuantity: number) => {
        const updatedQuantity = Math.min(Math.max(newQuantity, 1), stock); // Aquí 10 es el valor máximo de la cantidad, puedes ajustarlo según sea necesario
        setQuantityState(updatedQuantity);
        updateQuantity(updatedQuantity); // Llamar a la función para actualizar la cantidad en el componente padre
    };

    return (
        <div className="flex w-full">
            <div className={`rounded-3xl`}>
                <div className="relative">
                    <div className="absolute cursor-pointer right-4 p-1 text-lg hover:bg-danger-500/70 bg-danger-300 backdrop-blur-md text-white rounded-full ">
                        <BiTrash onClick={onDelete} />
                    </div>
                </div>
                <img src={"https://" + img1} alt="Product Image" className="mr-4 rounded-xl max-w-16 max-h-16 w-16 h-16 object-cover bg-primary-100 border border-primary-200" />
            </div>
            <div className="grid w-full">
                <div className="grid">
                    <Link
                        onClick={onProductClick}
                        to={PATH_PRODUCTO_ID + idProduct + "/" + (productName?.replace(/\s+/g, '-') ?? '')}
                        className="font-semibold text-primary-600 hover:text-primary-700 line-clamp-1 uppercase">
                        {productName}
                    </Link>
                </div>
                <div className="flex justify-between -mt-1">
                    <span className="text-black-600">Cantidad:</span>
                    <div className=" ml-auto flex items-center justify-center">
                        <div className="bg-primary-200 text-primary-500 hover:bg-primary-300 hover:text-primary-100 rounded-lg px-2 py-1" onClick={() => handleQuantityChange(quantityState - 1)}>
                            <BiMinus />
                        </div>
                        <span className="px-2 text-black-600">{quantityState}</span>
                        <div className="bg-primary-200 text-primary-500 hover:bg-primary-300 hover:text-primary-100 rounded-lg px-2 py-1" onClick={() => handleQuantityChange(quantityState + 1)}>
                            <BiPlus />
                        </div>
                    </div>
                </div>
                <div className="flex justify-start -mt-1">
                    <span className="text-black-600">Total:</span>
                    <span className=" font-bold text-black-600 pl-2">USD {totalPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCart;