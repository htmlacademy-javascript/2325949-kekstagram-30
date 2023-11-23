// import { generatePics } from './data.js';
import { loadData } from './fetch.js';
import { renderPics } from './render.js';
import { uplaodFormSubmit } from './form.js';
import { showDataErrorMessage } from './status-messages.js';
import './form.js';

let pics = [];

const onSuccess = (data) => {
  pics = data.slice();
  renderPics(pics);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

loadData(onSuccess, showDataErrorMessage);

uplaodFormSubmit();


