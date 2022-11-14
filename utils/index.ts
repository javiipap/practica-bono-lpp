import { CellType } from 'types';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const hashCode = (s: string) => {
  return s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

export const getBG = (type: CellType): string => {
  switch (type) {
    case CellType.void:
      return 'url("/void.png")';
    case CellType.wall:
      return 'url("/wall.png")';
    case CellType.enemy:
      return 'url("/enemy.png")';
    default:
      return 'black';
  }
};
