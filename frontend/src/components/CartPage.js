import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ cartItems, removeFromCart }) => {
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Image</th>
              <th className="py-2">Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 text-center">
                  <div className="flex justify-center items-center h-full">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover" />
                  </div>
                </td>
                <td className="py-2 text-center">{item.name}</td>
                <td className="py-2 text-center">${item.price}</td>
                <td className="py-2 text-center">
                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-6 text-right">
        <h2 className="text-2xl font-bold">Subtotal: ${calculateSubtotal()}</h2>
      </div>
      <div className="mt-4">
        <Link to="/" className="text-blue-600 hover:underline">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default CartPage;
