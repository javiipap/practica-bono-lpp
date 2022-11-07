export type Position = [number, number];

export type Side = undefined | 'up' | 'down' | 'left' | 'right';

export enum CellType {
  wall = 'pared',
  empty = 'vacío',
  enemy = 'enemigo',
  void = 'hueco',
  outOfBound = 'exterior',
}

export interface RawData {
  dimensions: { cols: number; rows: number };
  start: Position;
  end: Position;
  obstacles: { position: Position; type: CellType }[];
}

export interface ICell {
  type: CellType;
  background: string;
}
