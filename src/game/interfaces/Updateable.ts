import { Time } from '../../common';

export interface Updateable {
  update: (time: Time) => void;
}
