import { ecs } from '../..';
import { Component } from '../../ecs';
import { Vector2 } from '../../math';
import { BoxCollider } from '../../physics';

export type Alignment = 'start' | 'end' | 'center';
export type Baseline = 'top' | 'bottom' | 'middle';

export class LayoutBoxComponent implements Component {
  public name: symbol;
  public sortedEntities: ecs.Entity[];
  public boxCollider: BoxCollider;
  public spaceBetween: number;
  public margin: Vector2;
  public alignChildren: Alignment;
  public baselineChildren: Baseline;

  public static symbol = Symbol('LayoutBox');

  constructor(
    sortedEntities: Array<ecs.Entity>,
    boxCollider: BoxCollider,
    spaceBetween: number = 0,
    margin: Vector2 = Vector2.zero,
    alignChildren: Alignment = 'start',
    baselineChildren: Baseline = 'middle',
  ) {
    this.name = LayoutBoxComponent.symbol;
    this.sortedEntities = sortedEntities;
    this.boxCollider = boxCollider;
    this.spaceBetween = spaceBetween;
    this.margin = margin;
    this.alignChildren = alignChildren;
    this.baselineChildren = baselineChildren;
  }
}
