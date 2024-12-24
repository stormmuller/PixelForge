import { IdGenerator } from "./id-generator";

export abstract class UIElement<TElement extends HTMLElement, TOptions = null> {
  id: string;
  element: TElement;

  constructor(options: TOptions, classNames: string[]) {
    this.id = IdGenerator.generateNewId();
    this.element = this.createElement(classNames, options);
  }

  addElement<T extends HTMLElement>(uiElement: UIElement<T, unknown>): void {
    this.element.appendChild(uiElement.element);
  }

  protected abstract createElement(
    classNames: string[],
    options: TOptions,
  ): TElement;
}
