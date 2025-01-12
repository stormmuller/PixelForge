import { Component } from '../../ecs';
import { Vector2 } from '../../math';
import { Layout, LayoutContainer } from '../layouts';

export class LayoutRootComponent implements Component, LayoutContainer {
  public name: symbol;
  public children: LayoutContainer[];
  public layout: Layout;
  public position: Vector2;
  public scale: Vector2;

  public static symbol = Symbol('Layout Root');

  constructor(
    children: LayoutContainer[],
    layout: Layout,
    position: Vector2,
    scale: Vector2,
  ) {
    this.name = LayoutRootComponent.symbol;
    this.children = children;
    this.layout = layout;
    this.position = position;
    this.scale = scale;
  }
}
