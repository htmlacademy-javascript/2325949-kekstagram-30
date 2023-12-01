import {debounce, getRandomSet} from './util.js';
import {renderPics} from './render.js';

const RANDOM_PICS_LENGTH = 10;
const DELAY = 500;

const filterContainerElement = document.querySelector('.img-filters');
const filterElement = filterContainerElement.querySelector('.img-filters__form');

let pics = [];

const getHotPics = (data) => {
  const sortPics = data.slice().sort((first, second) => second.comments.length - first.comments.length);
  return sortPics;
};

const changeActiveFilterBtnClass = (evt) => {
  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const setFilter = (cb) => {
  filterElement.addEventListener('click', (evt) => {
    let newPics = pics.slice();
    changeActiveFilterBtnClass(evt);
    switch (evt.target.id) {
      case 'filter-random':
        newPics = getRandomSet(pics, RANDOM_PICS_LENGTH);
        break;
      case 'filter-discussed':
        newPics = getHotPics(pics);
    }
    cb(newPics);
  });
};

const deployFilter = (data) => {
  pics = data.slice();
  filterContainerElement.classList.remove('img-filters--inactive');
  setFilter(debounce(renderPics, DELAY));
};

export { deployFilter };
