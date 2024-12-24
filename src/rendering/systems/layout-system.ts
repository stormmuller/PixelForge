import { PositionComponent } from '../../common';
import { Entity, System } from '../../ecs';
import { Vector2 } from '../../math';
import { SpriteComponent } from '../components';
import { LayoutBoxComponent } from '../components/layout-box-component';

export class LayoutSystem extends System {
  constructor() {
    super('layout', [
      LayoutBoxComponent.symbol,
      SpriteComponent.symbol, // TODO: need a bounding box, but not necessarily a sprite
      PositionComponent.symbol,
    ]);
  }

  async run(entity: Entity): Promise<void> {
    const layoutBoxComponent = entity.getComponentRequired<LayoutBoxComponent>(
      LayoutBoxComponent.symbol,
    );

    const layoutPositionComponent =
      entity.getComponentRequired<PositionComponent>(PositionComponent.symbol);

    const layoutSpriteComponent = entity.getComponentRequired<SpriteComponent>(
      SpriteComponent.symbol,
    );

    const { sortedEntities } = layoutBoxComponent;
    const { renderSource: layoutRenderSource } = layoutSpriteComponent;

    // The maximum height we can use for laying out entities.
    const maxHeight = layoutRenderSource.boundingBox.maxY;
    const margin = layoutBoxComponent.margin;
    const spaceBetween = layoutBoxComponent.spaceBetween;
    const count = sortedEntities.length;

    // We measure from the top (start of the array) and determine how many entities fit.
    let totalHeightUsed = 0;
    let visibleCount = 0;

    for (let i = 0; i < count; i++) {
      const entity = sortedEntities[i];
      const sprite = entity.getComponentRequired<SpriteComponent>(
        SpriteComponent.symbol
      );
      const entityHeight = sprite.renderSource.boundingBox.maxY + spaceBetween;

      if (totalHeightUsed + entityHeight > maxHeight) {
        break; // no more can fit
      }

      totalHeightUsed += entityHeight;
      visibleCount++;
    }

    // Only the first 'visibleCount' entities will be visible; the rest will be hidden.
    let offsetY = margin.y;

    for (let i = 0; i < count; i++) {
      const entity = sortedEntities[i];
      const spriteComponent = entity.getComponentRequired<SpriteComponent>(
        SpriteComponent.symbol,
      );
      const positionComponent = entity.getComponentRequired<PositionComponent>(
        PositionComponent.symbol,
      );

      if (i >= visibleCount) {
        // These entities do not fit, hide them.
        spriteComponent.enabled = false;
        continue;
      }

      // These entities are visible.
      spriteComponent.enabled = true;

      const entityHeight = spriteComponent.renderSource.boundingBox.maxY;

      const alignmentOffset =
        layoutBoxComponent.alignChildren === 'start'
          ? -(layoutRenderSource.boundingBox.maxX / 2)
          : layoutBoxComponent.alignChildren === 'end'
          ? layoutRenderSource.boundingBox.maxX / 2
          : 0;

      const baselineOffset =
        layoutBoxComponent.baselineChildren === 'top'
          ? -(entityHeight / 2)
          : layoutBoxComponent.baselineChildren === 'bottom'
          ? entityHeight / 2
          : 0;

      const newY =
        layoutPositionComponent.y -
        layoutSpriteComponent.anchor.y +
        offsetY + baselineOffset;

      const newX = layoutPositionComponent.x + margin.x + alignmentOffset;

      positionComponent.set(new Vector2(newX, newY));

      // Update offset for the next entity below
      offsetY += entityHeight + spaceBetween;
    }
  }
}
