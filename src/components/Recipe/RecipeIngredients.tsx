import React from "react";

interface RecipeIngredientsProps {
  ingredients: string[];
  title: string
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
  title
}) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      {ingredients.map((ing, i) => {
        return (
          <div className="flex items-start space-x-4 pt-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
              {i}
            </div>
            <p className="text-gray-700 leading-relaxed">
              {ing}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeIngredients;
