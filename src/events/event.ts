type Listener = () => Promise<void>;

export class Event {
  public name: string;
  private _listeners: Listener[];

  get listeners() {
    return this._listeners;
  }

  constructor(name: string) {
    this.name = name;
    this._listeners = [];
  }

  public registerListener = (listener: Listener) => {
    this._listeners.push(listener);
  };

  public deregisterListener = (listener: Listener) => {
    this._listeners = this._listeners.filter((l) => l !== listener);
  };

  public clear = () => {
    this._listeners = [];
  };

  public raise = () => {
    for (const listener of this._listeners) {
      listener().catch((error) => {
        console.error(`Error in listener for event ${this.name}:`, error);
        throw error;
      });
    }
  };
}
