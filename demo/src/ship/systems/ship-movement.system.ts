import { common, ecs, input, math } from '../../../../src';
import { ShipComponent } from '../components';

export class ShipMovementSystem extends ecs.System {
  private _inputComponent: input.InputsComponent;
  private _time: common.Time;

  constructor(inputsEntity: ecs.Entity, time: common.Time) {
    super('ship-movement', [
      ShipComponent.symbol,
      common.PositionComponent.symbol,
      common.RotationComponent.symbol,
    ]);

    const inputComponent =
      inputsEntity.getComponentRequired<input.InputsComponent>(
        input.InputsComponent.symbol,
      );

    this._inputComponent = inputComponent;
    this._time = time;
  }

  public run = async (entity: ecs.Entity): Promise<void> => {
    const player = entity.getComponentRequired<ShipComponent>(
      ShipComponent.symbol,
    );

    const position = entity.getComponentRequired<common.PositionComponent>(
      common.PositionComponent.symbol,
    );

    const rotation = entity.getComponentRequired<common.RotationComponent>(
      common.RotationComponent.symbol,
    );

    const forwardVector = new math.Vector2(
      Math.sin(rotation.radians),
      -Math.cos(rotation.radians),
    );

    if (this._inputComponent.keyPressed(input.keyCodes.w)) {
      position.x += forwardVector.x * player.speed * this._time.deltaTime;
      position.y += forwardVector.y * player.speed * this._time.deltaTime;
    }

    if (this._inputComponent.keyPressed(input.keyCodes.s)) {
      position.x -= forwardVector.x * player.speed * this._time.deltaTime;
      position.y -= forwardVector.y * player.speed * this._time.deltaTime;
    }

    if (this._inputComponent.keyPressed(input.keyCodes.a)) {
      rotation.radians -= (player.rotationSpeed / 100) * this._time.deltaTime;
    }

    if (this._inputComponent.keyPressed(input.keyCodes.d)) {
      rotation.radians += (player.rotationSpeed / 100) * this._time.deltaTime;
    }
  };

  public stop = (): void => {};
}
