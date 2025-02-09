/**
 * Represents a component in the Entity-Component-System (ECS) architecture.
 * Each component has a unique name represented by a symbol.
 */
export interface Component {
  /**
   * The unique name of the component.
   */
  readonly name: symbol;
}
