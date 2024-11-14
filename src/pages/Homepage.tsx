import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchFoods } from '../data/redux/actions/foodActions';
import { FoodItem, FoodState } from '../models/FoodEntity';
import FoodModal from '../components/Homepage/FoodCard';
import { store } from '../data/redux/store/reduxStore';

const Homepage = () => {
  const foods: FoodItem[] = useSelector((state: FoodState) => state.foods.list);

  useEffect(() => {
    store.dispatch(fetchFoods())
  }, []);

  return (
    <div className="container mx-auto">
      {/* <SearchBar /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {foods.map((food, index) => (
          <FoodModal key={index} food={food} onClose={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
