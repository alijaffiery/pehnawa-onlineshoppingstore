import React from 'react';
import SHOP_DATA from '../shop-data';

const Categories = ({ addToCart }) => {
  return (
    <div>
      <div className="container mx-auto p-4">
        {SHOP_DATA.map((category) => (
          <div key={category.title}>
            <h2 className="text-4xl font-bold mb-12 mt-12 text-center">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 relative text-center transform hover:scale-105 transition duration-300 ease-in-out">
                  <div className="relative group">
                    <img src={item.imageUrl} alt={item.name} className="w-64 h-64 object-cover mb-4 mx-auto relative" />
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
                      style={{ backgroundColor: '#4c5f7f' }}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-700">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
