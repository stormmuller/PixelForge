import { Vector2 } from '../../math';
import { BoxCollider } from '../../physics';
import { Layout, LayoutContainer } from './layout';

export type GridLayoutOptions = {
  boxCollider: BoxCollider;
  itemWidth: number;
  itemHeight: number;
  itemGap?: number | Vector2;
  layoutPadding?: number | Vector2;
};

const defaultOptions = {
  itemGap: 10,
  layoutPadding: 10,
};

export class GridLayout implements Layout {
  private _layoutBox: BoxCollider;
  private _itemWidth: number;
  private _itemHeight: number;
  private _horizontalItemGap: number;
  private _verticalItemGap: number;
  private _layoutHorizontalPadding: number;
  private _layoutVerticalPadding: number;

  constructor(options: GridLayoutOptions) {
    const { boxCollider, itemWidth, itemHeight, itemGap, layoutPadding } = {
      ...defaultOptions,
      ...options,
    };

    this._layoutBox = boxCollider;
    this._itemWidth = itemWidth;
    this._itemHeight = itemHeight;
    this._horizontalItemGap = typeof itemGap === 'number' ? itemGap : itemGap.x;
    this._verticalItemGap = typeof itemGap === 'number' ? itemGap : itemGap.y;
    this._layoutHorizontalPadding =
      typeof layoutPadding === 'number' ? layoutPadding : layoutPadding.x;
    this._layoutVerticalPadding =
      typeof layoutPadding === 'number' ? layoutPadding : layoutPadding.y;
  }

  public update = (children: LayoutContainer[]): void => {
    const startX = this._layoutBox.minX + this._layoutHorizontalPadding;
    const startY = this._layoutBox.minY + this._layoutVerticalPadding;
    const horizontalSpacePerItem = this._itemWidth + this._horizontalItemGap;
    const verticalSpacePerItem = this._itemHeight + this._verticalItemGap;
    const itemSpace =
      this._layoutBox.dimentions.x - 2 * this._layoutHorizontalPadding;
    const numberOfItemsPerRow = Math.floor(itemSpace / horizontalSpacePerItem);

    for (let index = 0; index < children.length; index++) {
      const child = children[index];

      const rowIndex = Math.floor(index / numberOfItemsPerRow);
      const columnIndex = index % numberOfItemsPerRow;

      const x = startX + columnIndex * horizontalSpacePerItem;
      const y = startY + rowIndex * verticalSpacePerItem;

      child.position.x = x;
      child.position.y = y;
    }
  };
}
