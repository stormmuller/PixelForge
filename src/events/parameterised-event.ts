type Listener<T> = (eventData: T) => Promise<void>;

export class ParameterisedEvent<TInput = null> {
  name: string;
  private _listeners: Listener<TInput>[];
  
  public get listeners() {
    return this._listeners;
  }

  constructor(name: string) {
    this.name = name;
    this._listeners = [];
  }

  registerListener(listener: Listener<TInput>) {
    this._listeners.push(listener);
  }

  deregisterListener(listener: Listener<TInput>) {
    this._listeners = this._listeners.filter((l) => l !== listener);
  }

  clear() {
    this._listeners = [];
  }

  raise(input: TInput) {
    for (const listener of this._listeners) {
      listener(input).catch((error) => {
        console.error(`Error in listener for event ${this.name}:`, error);
        throw error;
      });
    }
  }
}
