import { curry } from 'ramda';

export const shuffler = curry((random, list) => {
  let idx = -1;
  const len = list.length;
  let position;
  const result = [];
  while (++idx < len) {
    position = Math.floor((idx + 1) * random());
    result[idx] = result[position];
    result[position] = list[idx];
  }
  return result;
});
export const shuffle = shuffler(Math.random);
