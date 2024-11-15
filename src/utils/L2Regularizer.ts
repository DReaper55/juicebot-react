import * as tf from '@tensorflow/tfjs';
import { Regularizer } from '@tensorflow/tfjs-layers/dist/regularizers';

// Define the L2 regularizer class
class L2 extends Regularizer {
    l2: number;
    static className = 'L2'; 

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
