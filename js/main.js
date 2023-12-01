import { loadData } from './fetch.js';
import { renderPics } from './render.js';
import { showDataErrorMessage } from './status-messages.js';
import { deployFilter } from './sortout.js';

const loadPics = (data) => {
  renderPics(data);
  deployFilter(data);
};

loadData(loadPics, showDataErrorMessage);


