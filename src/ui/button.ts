import { ParameterisedEvent } from '../events';
import { UIElement } from './ui-element';

export class Button extends UIElement<HTMLButtonElement, string> {
  private _onClickEvent: ParameterisedEvent<MouseEvent>;

  constructor(text: string, classNames: string[] = []) {
    super(text, classNames);

    this._onClickEvent = new ParameterisedEvent<MouseEvent>(
      `${this.id}-button-click`,
    );
  }

  get onClickEvent() {
    return this._onClickEvent;
  }

  protected createElement(
    classNames: string[],
    text: string,
  ): HTMLButtonElement {
    const button = document.createElement('button');

    button.id = this.id;

    button.textContent = text;

    button.classList.add(...classNames);

    button.addEventListener('click', (event) => {
      this._onClickEvent.raise(event);
    });

    return button;
  }
}
