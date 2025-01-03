import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchFoods } from "../data/redux/actions/foodActions";
import { FoodItem, FoodState } from "../models/FoodEntity";
import FoodCard, { OnClickType } from "../components/Homepage/FoodCard";
import { store } from "../data/redux/store/reduxStore";
import SearchBar from "../components/Homepage/SearchBar";
import FoodModal from "../components/Homepage/FoodModal";

const Homepage = () => {
  const foods: FoodItem[] = useSelector(
    (state: FoodState) => state.foodStore.list
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  let filteredFoods = [] as FoodItem[];

  useEffect(() => {
    store.dispatch(fetchFoods());
  }, []);

  // setTimeout(() => {
  //   // Filter foods based on search term
  //   filteredFoods = foods.filter((food) =>
  //     food.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }, 500);

  filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleFoodClick: OnClickType = (food) => {
    setSelectedFood(food);
  };

  const closeModal = () => {
    setSelectedFood(null);
  };

  return (
    <div className="container mx-auto">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredFoods.map((food, index) => (
          <FoodCard key={index} food={food} onClick={handleFoodClick} />
        ))}
      </div>

      {selectedFood && <FoodModal food={selectedFood} onClose={closeModal} />}
    </div>
  );
};

export default Homepage;
