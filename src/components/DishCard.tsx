import React from 'react';
import VegetableFriedRice3D from './VegetableFriedRice3D';

interface DishCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  rating?: number;
  onAddToCart: (id: string) => void;
}

const DishCard: React.FC<DishCardProps> = ({
  id,
  name,
  image,
  description,
  price,
  rating,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300 group">
      <div className="w-24 h-24 mb-4 relative">
        {id === 'vegetable-fried-rice' ? (
          <div className="w-full h-full rounded-full overflow-hidden shadow-lg bg-gray-50">
            <VegetableFriedRice3D className="w-full h-full" />
          </div>
        ) : (
          <img
            src={image}
            alt={`Image of ${name}`}
            className="w-full h-full rounded-full object-cover shadow-lg"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/150';
            }}
          />
        )}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{name}</h3>
      <div className="flex items-center gap-1 mb-3">
        {rating && rating > 0 ? (
          [...Array(rating)].map((_, i) => (
            <span key={i} className="text-orange-400 text-sm" aria-hidden="true">
              ★
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">No rating</span>
        )}
      </div>
      <p className="text-gray-500 text-sm mb-6 text-center leading-relaxed">
        {description}
      </p>
      <div className="flex items-center gap-4 w-full justify-between mt-auto">
        <span className="text-gray-900 font-bold text-lg">${price.toFixed(2)}</span>
        <button
          onClick={() => onAddToCart(id)}
          className="bg-orange-400 text-white rounded-full px-4 py-2 font-semibold hover:bg-orange-500 transition text-sm"
          aria-label={`Add ${name} to cart`}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default DishCard;