import { curry } from 'ramda';

export const shuffler = curry((random, list) => {
  var idx = -1;
  var len = list.length;
  var position;
  var result = [];
  while (++idx < len) {
    position = Math.floor((idx + 1) * random());
    result[idx] = result[position];
    result[position] = list[idx];
  }
  return result;
});
export const shuffle = shuffler(Math.random);
