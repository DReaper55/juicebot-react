import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DrinkItem } from "../../models/DrinkEntity";
import { FoodItem } from "../../models/FoodEntity";
import { predictDrink } from "../../services/predictDrink";

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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{food.name}</h2>
        <p>Best paired drink: {drink?.name}</p>
        <button onClick={onClose}>Close</button>
        <button onClick={() => navigate("/recipe", { state: { drink } })}>
          See Recipe
        </button>
      </div>
    </div>
  );
};

export default FoodModal;
