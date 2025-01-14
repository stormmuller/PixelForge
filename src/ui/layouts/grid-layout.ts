import { Vector2 } from '../../math';
import { BoxCollider } from '../../physics';
import { Layout, LayoutContainer } from './layout';

export type GridLayoutOptions = {
  boxCollider: BoxCollider;
  columns: number;
  rows: number;
  itemGap?: number | Vector2;
  layoutPadding?: number | Vector2;
};

const defaultOptions = {
  itemGap: 10,
  layoutPadding: 10,
};

export class GridLayout implements Layout {
  private _layoutBox: BoxCollider;
  private _columns: number;
  private _rows: number;
  private _horizontalItemGap: number;
  private _verticalItemGap: number;
  private _layoutHorizontalPadding: number;
  private _layoutVerticalPadding: number;

  constructor(options: GridLayoutOptions) {
    const { boxCollider, columns, rows, itemGap, layoutPadding } = {
      ...defaultOptions,
      ...options,
    };

    this._layoutBox = boxCollider;
    this._columns = columns;
    this._rows = rows;
    this._horizontalItemGap = typeof itemGap === 'number' ? itemGap : itemGap.x;
    this._verticalItemGap = typeof itemGap === 'number' ? itemGap : itemGap.y;
    this._layoutHorizontalPadding =
      typeof layoutPadding === 'number' ? layoutPadding : layoutPadding.x;
    this._layoutVerticalPadding =
      typeof layoutPadding === 'number' ? layoutPadding : layoutPadding.y;
  }

  public update = (children: LayoutContainer[], offset: Vector2): void => {
    const startX =
      this._layoutBox.minX + this._layoutHorizontalPadding + offset.x;
    const startY =
      this._layoutBox.minY + this._layoutVerticalPadding + offset.y;

    const avaliableHorizontalSpace =
      this._layoutBox.dimentions.x - 2 * this._layoutHorizontalPadding;
    const avaliableVerticalSpace =
      this._layoutBox.dimentions.y - 2 * this._layoutVerticalPadding;

    const horizontalSpacePerItem =
      (avaliableHorizontalSpace -
        this._horizontalItemGap * (this._columns - 1)) /
      this._columns;
    const verticalSpacePerItem =
      (avaliableVerticalSpace - this._verticalItemGap * (this._rows - 1)) /
      this._rows;

    const numberOfItemsPerRow = Math.floor(
      avaliableHorizontalSpace / horizontalSpacePerItem,
    );

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
