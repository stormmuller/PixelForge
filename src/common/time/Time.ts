export class Time {
  frames: number;
  rawTime: number;
  rawDeltaTime: number;
  deltaTime: number;
  time: number;
  previousTime: number;
  timeScale: number;
  times: number[];

  constructor() {
    this.frames = 0;
    this.rawTime = 0;
    this.rawDeltaTime = 0;
    this.deltaTime = 0;
    this.time = 0;
    this.previousTime = 0;
    this.timeScale = 1;
    this.times = [];
  }

  update(time: number) {
    this.frames++;
    this.previousTime = this.rawTime;
    this.rawTime = time;
    this.rawDeltaTime = time - this.previousTime;
    this.deltaTime = this.rawDeltaTime * this.timeScale;
    this.time = this.time + this.deltaTime;

    while (this.times.length > 0 && this.times[0] <= time - 1000) {
      this.times.shift();
    }

    this.times.push(time);
  }
};
