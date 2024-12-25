import { IdGenerator } from "./id-generator";

export abstract class UIElement<TElement extends HTMLElement, TOptions = null> {
  public id: string;
  public element: TElement;

  constructor(options: TOptions, classNames: string[]) {
    this.id = IdGenerator.generateNewId();
    this.element = this.createElement(classNames, options);
  }

  public addElement<T extends HTMLElement>(uiElement: UIElement<T, unknown>): void {
    this.element.appendChild(uiElement.element);
  }

  protected abstract createElement(
    classNames: string[],
    options: TOptions,
  ): TElement;
}
