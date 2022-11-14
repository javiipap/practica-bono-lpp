const pages = ['b3JlbSBp', 'cHN1bSBk', 'b2xvciBz'];

export default function getNext(uid: string = '', prev: boolean = false) {
  if (!uid) return pages[0];
  const offset = !prev ? 1 : -1;
  return pages[pages.indexOf(uid) + offset];
}

export const convertToInteger = (uid: string = '') => {
  return pages.indexOf(uid);
};
