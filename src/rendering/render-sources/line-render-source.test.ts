import { describe, expect, it, vi } from 'vitest';
import { Vector2 } from '../../math';
import { Path } from '../../common/path/path';
import { LineRenderSource, LineRenderSourceOptions } from './line-render-source';
import { RenderEffects } from './render-source';
import { RenderLayer } from '../render-layer';

describe('LineRenderSource', () => {
  it('should initialize with default options', () => {
    const path = new Path([new Vector2(0, 0), new Vector2(1, 1)]);
    const options: LineRenderSourceOptions = { path };
    const lineRenderSource = new LineRenderSource(options);

    expect(lineRenderSource.path).toBe(path);
    expect(lineRenderSource.radius).toBe(0);
    expect(lineRenderSource.color).toBe('black');
    expect(lineRenderSource.lineWidth).toBe(1);
  });

  it('should initialize with provided options', () => {
    const path = new Path([new Vector2(0, 0), new Vector2(1, 1)]);
    const options: LineRenderSourceOptions = {
      path,
      radius: 5,
      color: 'red',
      lineWidth: 2,
    };
    const lineRenderSource = new LineRenderSource(options);

    expect(lineRenderSource.path).toBe(path);
    expect(lineRenderSource.radius).toBe(5);
    expect(lineRenderSource.color).toBe('red');
    expect(lineRenderSource.lineWidth).toBe(2);
  });

  it('should throw an error if path has less than 2 points', () => {
    const path = new Path([new Vector2(0, 0)]);
    const options: LineRenderSourceOptions = { path };

    expect(() => new LineRenderSource(options)).toThrow(
      'LineRenderSource requires at least 2 points to be defined in the path'
    );
  });

  it('should initialize with render effects', () => {
    const path = new Path([new Vector2(0, 0), new Vector2(1, 1)]);
    const options: LineRenderSourceOptions = { path };
    const renderEffects: RenderEffects = { opacity: 0.5 };
    const lineRenderSource = new LineRenderSource(options, renderEffects);

    expect(lineRenderSource.renderEffects).toBe(renderEffects);
  });

  it('should correctly render the path', () => {
    const path = new Path([new Vector2(0, 0), new Vector2(1, 1)]);
    const options: LineRenderSourceOptions = { path };
    const lineRenderSource = new LineRenderSource(options);

    const mockContext = {
      beginPath: vi.fn(),
      strokeStyle: '',
      lineWidth: 0,
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    const mockCanvas = {
      getContext: vi.fn(() => mockContext),
    } as unknown as HTMLCanvasElement;

    const mockLayer = new RenderLayer('mock-render-layer', mockCanvas);

    lineRenderSource.render(mockLayer);

    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.strokeStyle).toBe('black');
    expect(mockContext.lineWidth).toBe(1);
    expect(mockContext.lineTo).toHaveBeenCalledWith(0, 0);
    expect(mockContext.lineTo).toHaveBeenCalledWith(1, 1);
    expect(mockContext.stroke).toHaveBeenCalled();
  });
});