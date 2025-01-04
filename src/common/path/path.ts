import { Vector2 } from '../../math';

type MapPathCallback<T> = (point: Vector2, index: number, path: Vector2[]) => T;

export class Path implements Iterable<Vector2> {
  public path: Vector2[];

  constructor(path: Vector2[] = []) {
    this.path = path;
  }

  public at = (index: number) => {
    return this.path[index];
  };

  public push = (point: Vector2) => {
    this.path.push(point);
  };

  public map = <T>(callback: MapPathCallback<T>) => {
    return this.path.map(callback);
  };

  get first(): Vector2 {
    return this.at(0);
  }

  get last(): Vector2 {
    return this.at(-1);
  }

  get length(): number {
    return this.path.length;
  }

  public [Symbol.iterator] = (): Iterator<Vector2> => {
    let index = 0;
    const path = this.path;

    return {
      next(): IteratorResult<Vector2> {
        if (index < path.length) {
          return { value: path[index++], done: false };
        } else {
          return { done: true } as IteratorResult<Vector2>;
        }
      },
    };
  }
}
