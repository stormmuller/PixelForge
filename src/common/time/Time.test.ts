import { beforeEach, describe, expect, it } from 'vitest';
import { Time } from './Time';

describe('Time', () => {
  let time: Time;

  beforeEach(() => {
    time = new Time();
  });

  it('should initialize with default values', () => {
    expect(time.frames).toBe(0);
    expect(time.rawTime).toBe(0);
    expect(time.rawDeltaTime).toBe(0);
    expect(time.deltaTime).toBe(0);
    expect(time.time).toBe(0);
    expect(time.previousTime).toBe(0);
    expect(time.timeScale).toBe(1);
    expect(time.times).toEqual([]);
  });

  it('should update time-related information', () => {
    const currentTime = 1000;
    time.update(currentTime);

    expect(time.frames).toBe(1);
    expect(time.rawTime).toBe(currentTime);
    expect(time.rawDeltaTime).toBe(currentTime);
    expect(time.deltaTime).toBe(currentTime);
    expect(time.time).toBe(currentTime);
    expect(time.previousTime).toBe(0);
    expect(time.times).toEqual([currentTime]);
  });

  it('should update time-related information with time scale', () => {
    const currentTime = 1000;
    const deltaTime = 16;
    const nextFrameTime = currentTime + deltaTime;

    time.update(currentTime);
    time.update(nextFrameTime);

    expect(time.frames).toBe(2);
    expect(time.rawTime).toBe(nextFrameTime);
    expect(time.rawDeltaTime).toBe(deltaTime);
    expect(time.deltaTime).toBe(deltaTime);
    expect(time.time).toBe(nextFrameTime);
    expect(time.previousTime).toBe(currentTime);
    expect(time.times).toEqual([currentTime, nextFrameTime]);
  });

  it('should remove old times from the times array', () => {
    const currentTime = 1000;
    time.update(currentTime);
    time.update(currentTime + 2000);

    expect(time.times).toEqual([currentTime + 2000]);
  });

  it('should update time-related information with reduced time scale', () => {
    const currentTime = 1000;
    const deltaTime = 16;
    const nextFrameTime = currentTime + deltaTime;

    time.update(currentTime);

    time.timeScale = 0.5;
    time.update(nextFrameTime);

    expect(time.frames).toBe(2);
    expect(time.rawTime).toBe(nextFrameTime);
    expect(time.rawDeltaTime).toBe(16);
    expect(time.deltaTime).toBe(8); // 50% of rawDeltaTime
    expect(time.time).toBe(1008); // 1000 (initial) + 8 (scaled deltaTime)
    expect(time.previousTime).toBe(currentTime);
    expect(time.times).toEqual([currentTime, nextFrameTime]);
  });
});
