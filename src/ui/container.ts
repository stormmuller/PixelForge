import { UIElement } from './ui-element';

export class Container extends UIElement<HTMLElement, string> {
  constructor(selector: string, classNames: string[] = []) {
    super(selector, classNames);
  }

  protected createElement(classNames: string[], selector: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(selector);

    if (!element) {
      throw new Error(`Cannot find element with selector ${selector}.`);
    }

    element.classList.add(...classNames);

    return element;
  }
}
