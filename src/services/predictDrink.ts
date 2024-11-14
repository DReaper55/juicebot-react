import * as tf from '@tensorflow/tfjs';
import { FoodItem } from '../models/FoodEntity';
import { DrinkItem } from '../models/DrinkEntity';
import { store } from '../data/redux/store/reduxStore';

let model: tf.LayersModel;

const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel('../assets/model.json');
  }
  return model;
};

export const predictDrink = async (food: FoodItem): Promise<DrinkItem> => {
  // Load model if not already loaded
  await loadModel();

  // Prepare the features array
  const features = [
    food.calories,
    food.protein,
    food.fat,
    food.carbs,
    food.fiber,
    food.sugar,
  ];

  // Convert the features array to a tensor and reshape it as necessary
  const inputTensor = tf.tensor2d([features], [1, features.length]);

  // Perform prediction
  let prediction = model.predict(inputTensor);

  if (Array.isArray(prediction)) { // Handle the case where prediction is an array of tensors
     prediction = tf.stack(prediction); // Combine tensors into a single tensor if needed 
  }

  const predictedDrinkIndex = (prediction as tf.Tensor).argMax(-1).dataSync()[0];

  const drinkStore = store.getState().drinkStore;

  // Assuming you have a mapping of index to drink names
  const drinks = drinkStore.list;
  const predictedDrink = drinks[predictedDrinkIndex];

  // Clean up tensors to avoid memory leaks
  inputTensor.dispose();
  prediction.dispose();

  return predictedDrink;
};
