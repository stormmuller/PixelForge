import { BoundingBox, Vector2 } from '../../math';
import { RenderLayer } from '../render-layer';
import { RenderEffects, RenderSource } from './render-source';

export class TextRenderSource implements RenderSource {
  text: string;
  fontFamily: string;
  color: string;
  boundingBox: BoundingBox;
  fontSize: number;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  maxWidth: number;
  overflowWidth: number;
  renderEffects: RenderEffects;

  constructor(
    text: string,
    maxWidth: number,
    overflowWidth: number = maxWidth,
    fontFamily: string = 'Arial',
    fontSize: number = 16,
    color: string = 'black',
    textAlign: CanvasTextAlign = 'center',
    textBaseline: CanvasTextBaseline = 'middle',
    renderEffects: RenderEffects = {},
  ) {
    this.text = text;
    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.color = color;
    this.textAlign = textAlign;
    this.textBaseline = textBaseline;
    this.maxWidth = maxWidth;
    this.overflowWidth = overflowWidth;
    this.renderEffects = renderEffects;

    const tempCanvas = document.createElement('canvas').getContext('2d')!;
    tempCanvas.font = `${this.fontSize}px ${this.fontFamily}`;
    const metrics = tempCanvas.measureText(this.text);
    const height =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    this.boundingBox = new BoundingBox(
      Vector2.zero(),
      new Vector2(maxWidth, height),
    );
  }

  render(layer: RenderLayer): void {
    const context = layer.context;

    context.font = `${this.fontSize}px ${this.fontFamily}`;
    context.textAlign = this.textAlign;
    context.textBaseline = this.textBaseline;

    let renderText = this.text;
    const metrics = context.measureText(this.text);
    let width = metrics.width;
    const height =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    // Handle maxWidth constraint
    if (width > this.overflowWidth) {
      const ellipsis = '…';

      let truncatedText = '';
      for (let i = 0; i < this.text.length; i++) {
        const testText = this.text.substring(0, i + 1) + ellipsis;
        const testWidth = context.measureText(testText).width;

        if (testWidth <= this.overflowWidth) {
          truncatedText = testText;
        } else {
          break;
        }
      }

      renderText = truncatedText;
    }

    this.boundingBox.dimentions = new Vector2(this.maxWidth, height);

    context.fillStyle = this.color;

    const x = this.textAlign === 'end' ? this.maxWidth : 0;

    // If baseline is 'middle', adjust to visually center the text
    if (this.textBaseline === 'middle') {
      context.textBaseline = 'alphabetic';
      const ascent = metrics.actualBoundingBoxAscent;
      const descent = metrics.actualBoundingBoxDescent;
      const verticalCenterOffset = (descent + ascent) / 2;
      context.fillText(renderText, x, verticalCenterOffset);
    } else {
      context.fillText(renderText, x, 0);
    }
  }
}
