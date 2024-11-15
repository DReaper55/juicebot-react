import * as tf from "@tensorflow/tfjs";
import { FoodItem } from "../models/FoodEntity";
import { DrinkItem } from "../models/DrinkEntity";
import { store } from "../data/redux/store/reduxStore";
import { Regularizer } from "@tensorflow/tfjs-layers/dist/regularizers";
import { fetchDrinks } from "../data/redux/actions/drinkActions";

interface ScalerData {
  mean: number[];
  scale: number[];
}

const loadScalerData = async (): Promise<ScalerData> => {
  const [meanResponse, scaleResponse] = await Promise.all([
    fetch("src/assets/mean.json"),
    fetch("src/assets/scale.json"),
  ]);

  const mean = await meanResponse.json();
  const scale = await scaleResponse.json();

  return { mean, scale };
};

const scaleFeatures = (features: number[], mean: number[], scale: number[]): number[] => {
  return features.map((feature, index) => (feature - mean[index]) / scale[index]);
};

class L2 extends Regularizer {
  l2: number;
  static className = "L2";

  constructor(config: { l2?: number }) {
    super();
    this.l2 = config.l2 ?? 0.01;
  }

  apply(x: tf.Tensor): tf.Scalar {
    return tf.mul(this.l2, tf.sum(tf.square(x))) as tf.Scalar;
  }

  getConfig() {
    return { l2: this.l2 };
  }
}

// Register the L2 regularizer
tf.serialization.registerClass(L2);

let model: tf.LayersModel | null = null;

const loadModel = async (): Promise<tf.LayersModel> => {
  if (!model) {
    model = await tf.loadLayersModel("src/assets/model.json");
  }
  return model;
};

const calculateDistance = (a: number[], b: number[]): number => {
  return Math.sqrt(a.reduce((sum, value, index) => sum + Math.pow(value - b[index], 2), 0));
};

export const predictDrink = async (food: FoodItem): Promise<DrinkItem> => {
  // Load model and scaler data
  const [loadedModel, { mean, scale }] = await Promise.all([loadModel(), loadScalerData()]);

  // Prepare and scale features
  const features: number[] = [food.calories, food.protein, food.fat, food.carbs, food.fiber, food.sugar];
  const scaledFeatures = scaleFeatures(features, mean, scale);

  // Create input tensor
  const inputTensor = tf.tensor3d([scaledFeatures.map(f => [f])], [1, scaledFeatures.length, 1]);

  // Perform prediction
  let prediction = loadedModel.predict(inputTensor) as tf.Tensor;

  // Handle prediction if it is an array
  if (Array.isArray(prediction)) {
    prediction = tf.stack(prediction);
  }

  // Fetch drinks data from Redux store
  store.dispatch(fetchDrinks());
  const drinks: DrinkItem[] = store.getState().drinkStore.list;

  // Find the closest drink based on Euclidean distance
  const distances = drinks.map(drink => calculateDistance([...prediction.dataSync()], drink.composition));
  const closestIndex = distances.indexOf(Math.min(...distances));

  const predictedDrink = drinks[closestIndex];

  // Clean up tensors to avoid memory leaks
  inputTensor.dispose();
  prediction.dispose();

  return predictedDrink;
};
