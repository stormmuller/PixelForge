type Loadable = () => Promise<void>;
type ProgressUpdateCallback = (progress: number) => void;

export class LoadingGroup {
  public loadables: Loadable[];
  public onProgressUpdate: ProgressUpdateCallback;
  public progress: number = 0;
  public progressInterval: number;

  constructor(loadables: Loadable[], onProgressUpdate: ProgressUpdateCallback) {
    this.loadables = loadables;
    this.onProgressUpdate = onProgressUpdate;
    this.progressInterval = 1 / loadables.length;
  }

  public start = () => {
    for (const loadable of this.loadables) {
      loadable().then(() => {
        this.progress += this.progressInterval;
        this.onProgressUpdate(this.progress);
      });
    }
  };
}
