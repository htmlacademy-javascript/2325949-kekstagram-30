const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayEl = (array) => array[getRandomInteger(0, array.length - 1)];

const isEscapeKey = (evt) => evt.code === 'Escape';

const getRandomSet = (data, length) => {
  const randomSet = new Set();
  while (randomSet.size < length) {
    randomSet.add(getRandomArrayEl(data));
  }
  return randomSet;
};

const debounce = (callback, timeoutDelay = 500) => {

  let timeoutId;

  return (...rest) => {

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
};


export {getRandomInteger, getRandomArrayEl, isEscapeKey, debounce, getRandomSet};
