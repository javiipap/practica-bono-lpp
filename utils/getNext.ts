import mockData, { MAX_LEVELS } from 'res/mockData';

const pages = Object.keys(mockData);

export default function getNext(uid: string = '', prev: boolean = false) {
  if (!uid) return pages[0];
  if (convertToInteger(uid) >= MAX_LEVELS) return undefined;
  const offset = !prev ? 1 : -1;
  return pages[pages.indexOf(uid) + offset];
}

export const convertToInteger = (uid: string = '') => {
  return pages.indexOf(uid) + 1;
};
