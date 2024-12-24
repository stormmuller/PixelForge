type Listener = () => Promise<void>;

export class Event {
  name: string;
  private _listeners: Listener[];

  public get listeners() {
    return this._listeners;
  }

  constructor(name: string) {
    this.name = name;
    this._listeners = [];
  }

  registerListener(listener: Listener) {
    this._listeners.push(listener);
  }

  deregisterListener(listener: Listener) {
    this._listeners = this._listeners.filter((l) => l !== listener);
  }

  clear() {
    this._listeners = [];
  }

  raise = () => {
    for (const listener of this._listeners) {
      listener().catch((error) => {
        console.error(`Error in listener for event ${this.name}:`, error);
        throw error;
      });
    }
  }
}
