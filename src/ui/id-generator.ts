const ID_PADDING_AMOUNT = 10;

export class IdGenerator {
  private static _idCounter: number = 0;

  constructor() {
    throw new Error(`You cannot instantiate an instance of the ${IdGenerator.name} class as Ids need to be globally unique.`);
  }

  public static generateNewId() {
    IdGenerator._idCounter++;
    return `ui-${IdGenerator._idCounter.toString().padStart(ID_PADDING_AMOUNT, '0')}`
  }
}