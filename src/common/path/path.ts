import { Vector2 } from '../../math';

type MapPathCallback<T> = (point: Vector2, index: number, path: Vector2[]) => T;

export class Path {
  path: Vector2[];

  constructor(path: Vector2[] = []) {
    this.path = path;
  }

  at(index: number) {
    return this.path[index];
  }

  push(point: Vector2) {
    this.path.push(point);
  }

  map<T>(callback: MapPathCallback<T>) {
    return this.path.map(callback);
  }

  get first(): Vector2 {
    return this.at(0);
  }

  get last(): Vector2 {
    return this.at(-1);
  }

  get length(): number {
    return this.path.length;
  }
}
