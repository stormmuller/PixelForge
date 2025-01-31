import { ecs } from '../../../../src';

export class StarfieldComponent implements ecs.Component {
  public name: symbol;
  public targetNumberOfStars: number;
  public numberOfStars: number;

  public static symbol = Symbol('StarField');

  constructor(numberOfStars: number) {
    this.name = StarfieldComponent.symbol;

    this.targetNumberOfStars = numberOfStars;
    this.numberOfStars = 0;
  }
}
