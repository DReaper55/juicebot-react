import React from "react";
import { FoodItem } from "../../models/FoodEntity";

export type OnClickType = (food: FoodItem) => void;

interface FoodModalProps {
    food: FoodItem;
    onClick: OnClickType;
  }

const FoodCard: React.FC<FoodModalProps> = ({ food, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(food)}
    >
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{food.name}</h2>
      </div>
    </div>
  );
};

export default FoodCard;
