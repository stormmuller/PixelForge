import { ecs } from '../..';
import { Component } from '../../ecs';
import { BoundingBox, Vector2 } from '../../math';

export type Alignment = 'start' | 'end' | 'center';
export type Baseline = 'top' | 'bottom' | 'middle';

export class LayoutBoxComponent implements Component {
  public name: symbol;
  sortedEntities: ecs.Entity[];
  boundingBox: BoundingBox;
  spaceBetween: number;
  margin: Vector2;
  alignChildren: Alignment;
  baselineChildren: Baseline;

  static symbol = Symbol('LayoutBox');

  constructor(
    sortedEntities: Array<ecs.Entity>,
    boundingBox: BoundingBox,
    spaceBetween: number = 0,
    margin: Vector2 = Vector2.zero(),
    alignChildren: Alignment = 'start',
    baselineChildren: Baseline = 'middle'
  ) {
    this.name = LayoutBoxComponent.symbol;
    this.sortedEntities = sortedEntities;
    this.boundingBox = boundingBox;
    this.spaceBetween = spaceBetween;
    this.margin = margin;
    this.alignChildren = alignChildren;
    this.baselineChildren = baselineChildren;
  }
}
