import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DrinkItem } from "../../models/DrinkEntity";
import { FoodItem } from "../../models/FoodEntity";
import { predictDrink } from "../../services/predictDrink";
import RecipeTitle from "../Recipe/RecipeTitle";

interface FoodModalProps {
  food: FoodItem;
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const FoodModal: React.FC<FoodModalProps> = ({ food, onClose }) => {
  const navigate = useNavigate();
  const [drink, setDrink] = useState<DrinkItem | null>(null);

  useEffect(() => {
    getDrink();
  });

  const getDrink = async () => {
    // Logic to predict drink pairing based on `food` features
    // Assume `predictDrink` is a function that takes food and returns a drink
    const predictedDrink = await predictDrink(food);
    setDrink(predictedDrink);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <p className="mb-4 text-xl font-semibold">Best paired drink for {food.name}</p>
        {drink && <RecipeTitle recipe={drink!} />}
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          onClick={onClose}
        >
          Close
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/recipe", { state: { drink } })}
        >
          See Recipe
        </button>
      </div>
    </div>
  );  
};

export default FoodModal;
