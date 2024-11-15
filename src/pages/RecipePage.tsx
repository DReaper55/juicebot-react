import { useLocation } from 'react-router-dom';
import { DrinkItem } from '../models/DrinkEntity';
import RecipeTitle from '../components/Recipe/RecipeTitle';
import RecipeIngredients from '../components/Recipe/RecipeIngredients';

const RecipePage = () => {
  const { state } = useLocation();
  const drink: DrinkItem = state?.drink;

  return (
    <div className="container mx-auto my-auto p-4">
      <div className="flex flex-col md:flex-row justify-center align-center gap-8">
        <div className="md:w-1/2 flex flex-col gap-8 bg-white rounded-lg shadow-md">
          <RecipeTitle recipe={drink} />
          <RecipeIngredients ingredients={drink.ingredients} title='Ingredients' />
        </div>

        <div className="md:w-1/2 bg-white rounded-lg shadow-md">
          <RecipeIngredients ingredients={drink.steps} title='Recipe' />
        </div>
      </div>
    </div>
  );
};

export default RecipePage;