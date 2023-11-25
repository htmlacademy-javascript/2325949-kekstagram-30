const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayEl = (array) => array[getRandomInteger(0, array.length - 1)];

const isEscapeKey = (evt) => evt.code === 'Escape';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const sortByComments = (array) => {
  array.sort((a, b) => b.comments.length - a.comments.length);

  return array;
};


const debounce = (callback, timeoutDelay = 500) => {

  let timeoutId;

  return (...rest) => {

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
};

const throttle = (callback, delayBetweenFrames) => {

  let lastTime = 0;

  return (...rest) => {

    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

export {getRandomInteger, getRandomArrayEl, isEscapeKey, debounce, throttle, shuffleArray, sortByComments};
