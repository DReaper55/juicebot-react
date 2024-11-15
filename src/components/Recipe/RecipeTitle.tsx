import React from "react";
import { DrinkItem } from "../../models/DrinkEntity";

interface RecipeTitleProps {
    recipe: DrinkItem
}

const RecipeTitle: React.FC<RecipeTitleProps> = ({ recipe }) => {
  return (
    <div className="flex items-center space-x-6 p-6 max-w-xl mx-auto">
      <div className="flex-1">
        <p className="text-sm text-gray-500">Recipe Tagline</p>
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-2">{recipe.name}</h1>
        {/* <h2 className="text-3xl font-sans font-semibold text-gray-900 mb-4">{recipe.subtitle}</h2> */}
        {/* <div className="flex space-x-4">
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Time: {recipe.time}</div>
          <div className="text-gray-600 font-medium">Difficulty: {recipe.difficulty}</div>
          <div className="text-gray-600 font-medium">Calories: {recipe.calories}</div>
        </div> */}
      </div>
      <div className="flex-shrink-0">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-48 h-48 rounded-full object-cover shadow-lg"
        />
      </div>
    </div>
  );
};

export default RecipeTitle;
