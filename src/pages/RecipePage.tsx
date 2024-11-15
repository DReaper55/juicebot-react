import { useLocation } from 'react-router-dom';
import { DrinkItem } from '../models/DrinkEntity';

const RecipePage = () => {
  const { state } = useLocation();
  const drink: DrinkItem = state?.drink;

  return (
    <div className="container mx-auto">
      <h1>{drink.name}</h1>
      <p>Ingredients:</p>
      <ul>
        {drink.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p>Steps:</p>
      <ol>
        {drink.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipePage;