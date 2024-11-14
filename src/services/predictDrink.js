import * as tf from '@tensorflow/tfjs';
import predModel from '../assets/model.json';

let model;

const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel(predModel);
  }
  return model;
};

export const predictDrink = async (food) => {
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
  const prediction = model.predict(inputTensor);
  const predictedDrinkIndex = prediction.argMax(-1).dataSync()[0];

  // Assuming you have a mapping of index to drink names
  const drinks = ["Drink 1", "Drink 2", "Drink 3"]; // Replace with your actual drink names
  const predictedDrink = drinks[predictedDrinkIndex];

  // Clean up tensors to avoid memory leaks
  inputTensor.dispose();
  prediction.dispose();

  return predictedDrink;
};
