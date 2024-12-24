type Loadable = () => Promise<void>;
type ProgressUpdateCallback = (progress: number) => void;

export class LoadingGroup {
  loadables: Loadable[];
  onProgressUpdate: ProgressUpdateCallback;
  progress: number = 0;
  progressInterval: number;

  constructor(loadables: Loadable[], onProgressUpdate: ProgressUpdateCallback) {
    this.loadables = loadables;
    this.onProgressUpdate = onProgressUpdate;
    this.progressInterval = 1 / loadables.length;
  }

  Start = () => {
    for (const loadable of this.loadables) {
        loadable().then(() => {
            this.progress += this.progressInterval;
            this.onProgressUpdate(this.progress);
        });
    }
  }
}