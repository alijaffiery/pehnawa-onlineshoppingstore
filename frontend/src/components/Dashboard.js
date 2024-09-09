import React from 'react';
import { useNavigate } from 'react-router-dom';
import SHOP_DATA from '../shop-data';
import Image1 from '../assets/image1.png';

const Dashboard = () => {
    const navigate = useNavigate();
    const firstThreeCategories = SHOP_DATA.slice(0, 3);
    const lastTwoCategories = SHOP_DATA.slice(3);

    const handleCategoryClick = (categoryTitle) => {
        navigate(`/category/${categoryTitle.toLowerCase()}`);
    };

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="w-full">
                    <img src={Image1} alt="image1" className="w-full h-auto" />
                </div>
            </div>

            <div className='flex justify-center items-center h-full'>
                <h1 className='text-center text-3xl font-bold'>Season Collections</h1>
            </div>

            <div className='flex justify-center items-center'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 m-8">
                    {firstThreeCategories.map((category) => (
                        <div
                            key={category.title}
                            className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95"
                            onClick={() => handleCategoryClick(category.title)}
                        >
                            <img src={category.items[0].imageUrl} alt={category.title} className="w-full h-auto md:h-96 object-cover rounded-t-lg" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2 text-center">{category.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex justify-center items-center'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 m-8">
                    {lastTwoCategories.map((category) => (
                        <div
                            key={category.title}
                            className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95"
                            onClick={() => handleCategoryClick(category.title)}
                        >
                            <img src={category.items[0].imageUrl} alt={category.title} className="w-full h-auto md:h-96 object-cover rounded-t-lg" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2 text-center">{category.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
