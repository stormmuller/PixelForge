import { Time } from '../../common';

/**
 * Represents an object that can be updated over time.
 */
export interface Updatable {
  /**
   * Updates the object with the given time.
   * @param time - The current time.
   */
  update: (time: Time) => void;
}
