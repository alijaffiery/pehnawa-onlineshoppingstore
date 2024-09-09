import React from 'react';
import { useParams } from 'react-router-dom';
import SHOP_DATA from '../shop-data';

const CategoryDetails = ({ addToCart }) => {
  const { categoryTitle } = useParams();
  const category = SHOP_DATA.find(cat => cat.title.toLowerCase() === categoryTitle.toLowerCase());

  if (!category) return <div>Category not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">{category.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {category.items.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden text-center p-4 relative">
            <div className="relative group">
              <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover rounded-t-lg mb-4" />
              <button
                onClick={() => addToCart(item)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
                style={{ backgroundColor: '#4c5f7f' }}
              >
                Add to Cart
              </button>
            </div>
            <h2 className="text-xl font-semibold my-2">{item.name}</h2>
            <p className="text-gray-700">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
