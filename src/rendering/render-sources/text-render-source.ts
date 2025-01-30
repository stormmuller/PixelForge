import { RenderLayer } from '../render-layer';
import { RenderEffects, RenderSource } from './render-source';

export type TextRenderSourceOptions = {
  text: string;
  fontFamily?: string;
  color?: string;
  fontSize?: number;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  maxWidth?: number;
  overflowWidth?: number;
};

export const defaultTextRenderSourceOptions = {
  fontFamily: 'Arial',
  color: 'black',
  fontSize: 16,
  textAlign: 'center' as CanvasTextAlign,
  textBaseline: 'middle' as CanvasTextBaseline,
  maxWidth: 1000,
  overflowWidth: 1000,
};

export class TextRenderSource implements RenderSource {
  public text: string;
  public fontFamily: string;
  public color: string;
  public fontSize: number;
  public textAlign: CanvasTextAlign;
  public textBaseline: CanvasTextBaseline;
  public maxWidth: number;
  public overflowWidth: number;
  public renderEffects: RenderEffects;

  constructor(
    options: TextRenderSourceOptions,
    renderEffects: RenderEffects = {},
  ) {
    this._validateText(options.text);

    const {
      text,
      fontFamily,
      fontSize,
      color,
      textAlign,
      textBaseline,
      maxWidth,
      overflowWidth,
    } = {
      ...defaultTextRenderSourceOptions,
      ...options,
    };

    this.text = text;
    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.color = color;
    this.textAlign = textAlign;
    this.textBaseline = textBaseline;
    this.maxWidth = maxWidth;
    this.overflowWidth = overflowWidth;

    this.renderEffects = renderEffects;
  }

  public render = (layer: RenderLayer): void => {
    const context = layer.context;

    context.font = `${this.fontSize}px ${this.fontFamily}`;
    context.textAlign = this.textAlign;
    context.textBaseline = this.textBaseline;

    let renderText = this.text;
    const metrics = context.measureText(this.text);
    const width = metrics.width;

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
  };

  public update = (options: Partial<TextRenderSourceOptions>): void => {
    const {
      text,
      fontFamily,
      fontSize,
      color,
      textAlign,
      textBaseline,
      maxWidth,
      overflowWidth,
    } = {
      text: this.text,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      color: this.color,
      textAlign: this.textAlign,
      textBaseline: this.textBaseline,
      maxWidth: this.maxWidth,
      overflowWidth: this.overflowWidth,
      ...options,
    };

    this._validateText(text);

    this.text = text;
    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.color = color;
    this.textAlign = textAlign;
    this.textBaseline = textBaseline;
    this.maxWidth = maxWidth;
    this.overflowWidth = overflowWidth;
  };

  public resize = (width: number, height: number): void => {
    this.maxWidth = width;
    this.overflowWidth = width;
    this.fontSize = height;
  }

  private _validateText = (text: string): void => {
    if (!text) {
      throw new Error('Text must be provided');
    }
  };
}
