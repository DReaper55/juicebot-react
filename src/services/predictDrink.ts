import * as tf from "@tensorflow/tfjs";
import { FoodItem } from "../models/FoodEntity";
import { DrinkItem } from "../models/DrinkEntity";
import { store } from "../data/redux/store/reduxStore";
import { Regularizer } from "@tensorflow/tfjs-layers/dist/regularizers";
import { fetchDrinks } from "../data/redux/actions/drinkActions";


const loadScalerData = async () => {
  const meanResponse = await fetch('src/assets/mean.json');
  const scaleResponse = await fetch('src/assets/scale.json');

  const mean = await meanResponse.json();
  const scale = await scaleResponse.json();

  return { mean, scale };
};

const scaleFeatures = (features: any, mean: any, scale: any) => {
  return features.map((feature: any, index: number) => {
    return (feature - mean[index]) / scale[index];
  });
};

class L2 extends Regularizer {
  l2: number;
  static className = "L2";

  constructor(config: { l2?: number }) {
    super();
    this.l2 = config.l2 == null ? 0.01 : config.l2;
  }

  apply(x: tf.Tensor): tf.Scalar {
    const sumOfSquares = tf.sum(tf.square(x));
    return tf.mul(this.l2, sumOfSquares) as tf.Scalar;
  }

  getConfig() {
    return { l2: this.l2 };
  }
}

// Register the L2 regularizer
tf.serialization.registerClass(L2);

let model: tf.LayersModel;

const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel("src/assets/model.json");
  }
  return model;
};

export const predictDrink = async (food: FoodItem): Promise<DrinkItem> => {
  // Load model if not already loaded
  await loadModel();

  // Prepare the features array
  const features: number[] = [
    food.calories,
    food.protein,
    food.fat,
    food.carbs,
    food.fiber,
    food.sugar,
  ];

  const { mean, scale } = await loadScalerData();

  // Scale the features
  const scaledFeatures = scaleFeatures(features, mean, scale);

  // Convert the features array to a tensor and reshape it as necessary
  const inputTensor = tf.tensor3d(
    [scaledFeatures.map((f) => [f])],
    [1, scaledFeatures.length, 1]
  );

  // Perform prediction
  let prediction = model.predict(inputTensor);

  if (Array.isArray(prediction)) {
    // Handle the case where prediction is an array of tensors
    prediction = tf.stack(prediction); // Combine tensors into a single tensor if needed
  }

  store.dispatch(fetchDrinks());
  const drinkStore = store.getState().drinkStore;

  // Assuming you have a mapping of index to drink names
  const drinks = drinkStore.list;

  // Function to calculate Euclidean distance
  const calculateDistance = (a: number[], b: number[]): number => {
    return Math.sqrt(
      a.reduce((sum, value, index) => sum + Math.pow(value - b[index], 2), 0)
    );
  };

  // Find the closest drink
  const distances = drinks.map((drink) => {
    return calculateDistance([...prediction.dataSync()], drink.composition);
  });

  // Find the index of the closest drink
  const closestIndex = distances.indexOf(Math.min(...distances));

  const predictedDrink = drinks[closestIndex];

  // Clean up tensors to avoid memory leaks
  inputTensor.dispose();
  prediction.dispose();

  return predictedDrink;
};
