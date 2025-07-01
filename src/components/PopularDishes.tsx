import React, { useState } from 'react';
import DishCard from './DishCard';
import { useCart } from '../context/CartContext';

interface Dish {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  rating?: number;
}

const PopularDishes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dishesPerPage = 4; // Number of dishes to show at once
  const { addToCart } = useCart();

  const dishes: Dish[] = [
    {
      id: 'vegetable-fried-rice',
      name: 'Delicious Vegetable Fried Rice',
      image: '/delicious-homemade-vegetable-fried-rice.jpg',
      description: 'A vibrant plate of vegetable fried rice, featuring fluffy rice, scrambled eggs, and colorful veggies.',
      price: 28.00,
      rating: 5,
    },
    {
      id: 'pasta',
      name: 'Pasta',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      description: 'Pasta is a type of food typically made from an unleavened dough.',
      price: 35.00,
      rating: 5,
    },
    {
      id: 'french-fries',
      name: 'French Fries',
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      description: 'Crispy golden french fries made from fresh potatoes.',
      price: 55.00,
      rating: 5,
    },
    {
      id: 'chicken-shawarma',
      name: 'Chicken Shawarma',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      description: 'Delicious chicken shawarma with authentic Middle Eastern spices.',
      price: 35.00,
      rating: 5,
    },
    {
      id: 'fish-curry',
      name: 'Fish Curry',
      image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      description: 'Aromatic fish curry with rich spices and coconut milk.',
      price: 35.00,
      rating: 5,
    },
  ];

  const handleAddToCart = (dishId: string) => {
    const dish = dishes.find((d) => d.id === dishId);
    if (dish) {
      addToCart(dish);
      console.log(`Added ${dishId} to cart`); // Replace with toast notification in production
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - dishesPerPage, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + dishesPerPage, dishes.length - dishesPerPage)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  const visibleDishes = dishes.slice(
    currentIndex,
    currentIndex + dishesPerPage
  );

  return (
    <section
      className="max-w-7xl mx-auto mb-16 px-4"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">
          Popular Dishes
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-orange-400 hover:text-white transition ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Previous dishes"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= dishes.length - dishesPerPage}
            className={`w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center hover:bg-orange-500 transition ${
              currentIndex >= dishes.length - dishesPerPage
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            aria-label="Next dishes"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {visibleDishes.length > 0 ? (
          visibleDishes.map((dish) => (
            <DishCard
              key={dish.id}
              id={dish.id}
              name={dish.name}
              image={dish.image}
              description={dish.description}
              price={dish.price}
              rating={dish.rating}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="text-gray-600">No dishes available.</p>
        )}
      </div>
    </section>
  );
};

export default PopularDishes;