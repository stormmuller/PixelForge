import { UIElement } from './ui-element';

export class FlexBox extends UIElement<HTMLDivElement> {
  constructor(classNames: string[] = []) {
    super(null, classNames);
  }

  protected createElement(classNames: string[]): HTMLDivElement {
    const flexBox = document.createElement('div');

    flexBox.id = this.id;

    flexBox.classList.add('flex');
    flexBox.classList.add(...classNames);

    return flexBox;
  }
}
