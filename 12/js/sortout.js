import {debounce, shuffleArray, sortByComments} from './util.js';
import {renderPics} from './render.js';
import {pics} from './main.js';

const SHUFFLED_PHOTOS_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

const availableFilters = {
  'filter-default': () => pics.slice(),
  'filter-random': () => shuffleArray(pics.slice()).slice(0, SHUFFLED_PHOTOS_COUNT),
  'filter-discussed': () => sortByComments(pics.slice())
};

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const onImgFiltersFormClick = debounce((evt) => {
  if (isButton(evt)) {
    renderPics(availableFilters[evt.target.id]());
  }
});

const onButtonClick = (evt) => {
  if (isButton(evt)) {
    const selectedButton = imgFiltersForm.querySelector(`.${ACTIVE_CLASS}`);

    if (selectedButton) {
      selectedButton.classList.remove(ACTIVE_CLASS);
    }

    evt.target.classList.add(ACTIVE_CLASS);
  }
};

imgFiltersForm.addEventListener('click', onImgFiltersFormClick);
imgFiltersForm.addEventListener('click', onButtonClick);
