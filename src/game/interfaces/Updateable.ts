import { Time } from '../../common';

export interface Updatable {
  update: (time: Time) => void;
}
