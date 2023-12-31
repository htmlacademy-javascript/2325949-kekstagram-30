
import { showBigPicture } from './popup.js';

const picList = document.querySelector('.pictures');
const picTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.createDocumentFragment();

const clearPics = () => {
  const picsRendered = picList.querySelectorAll('.picture');
  if (picsRendered) {
    picsRendered.forEach((picture) => picture.remove());
  }
};

const renderPic = (picture) => {
  const pictureElement = picTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(picture);
  });

  return pictureElement;
};


const renderPics = (pics) => {
  pics.forEach((picture) => {
    const pictureElement = renderPic(picture);
    container.append(pictureElement);
  });
  clearPics();
  picList.append(container);
};

export {renderPics};
