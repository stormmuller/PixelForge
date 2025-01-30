type Listener<T> = (eventData: T) => Promise<void>;

export class ParameterisedEvent<TInput = null> {
  public name: string;
  private _listeners: Listener<TInput>[];

  get listeners() {
    return this._listeners;
  }

  constructor(name: string) {
    this.name = name;
    this._listeners = [];
  }

  public registerListener = (listener: Listener<TInput>) => {
    this._listeners.push(listener);
  };

  public deregisterListener = (listener: Listener<TInput>) => {
    this._listeners = this._listeners.filter((l) => l !== listener);
  };

  public clear = () => {
    this._listeners = [];
  };

  public raise = (input: TInput) => {
    for (const listener of this._listeners) {
      listener(input).catch((error) => {
        console.error(`Error in listener for event ${this.name}:`, error);
        throw error;
      });
    }
  };
}
