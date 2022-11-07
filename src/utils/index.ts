export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const hashCode = (s: string) => {
  return s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};
