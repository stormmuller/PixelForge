import { Random } from '../../math';

export const pickWeightedRandomElement = <T>(array: T[], weights: number[], random: Random): T => {
  if (array.length !== weights.length) {
    throw new Error("Array and weights must be of the same length");
  }

  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
  let randomWeight = random.randomFloat(0, 1) * totalWeight;

  for (let i = 0; i < array.length; i++) {
    if (randomWeight < weights[i]) {
      return array[i];
    }
    
    randomWeight -= weights[i];
  }

  throw new Error("Should never reach here if weights are properly configured");
};