export const normalizeName = (str: string): string =>
  str.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
