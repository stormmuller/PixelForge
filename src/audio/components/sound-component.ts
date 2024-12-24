import { Howl, HowlOptions } from 'howler';
import { Component } from '../../ecs';

export class SoundComponent implements Component {
  public name: symbol;
  public sound: Howl;
  public playSound: boolean;

  static symbol = Symbol('Sound');

  constructor(options: HowlOptions, playSound = false) {
    this.name = SoundComponent.symbol;
    this.sound = new Howl(options);
    this.playSound = playSound;
  }
}
