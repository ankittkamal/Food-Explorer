import { useDispatch, useSelector } from "react-redux";
import ListItem from "./ListItem";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4 ">
      <h1 className="font-bold py-4 text-2xl"> 🛒 Cart </h1>
      <div className="w-6/12 m-auto">
        <button
          className="font-medium bg-red-300 shadow-md rounded-lg m-2 p-2 my-4"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems.length === 0 && (
          <h1 className="font-medium text-lg">
            Cart is Empty, Order Something Fast!\
          </h1>
        )}
        <ListItem items={cartItems} cl />
      </div>
    </div>
  );
};

export default Cart;
