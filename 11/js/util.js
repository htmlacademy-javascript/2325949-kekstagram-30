const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayEl = (array) => array[getRandomInteger(0, array.length - 1)];

const isEscapeKey = (evt) => evt.code === 'Escape';

export {getRandomInteger, getRandomArrayEl, isEscapeKey};
