import { generatePics } from './data';

const pics = generatePics();

const picList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.createDocumentFragment();

const renderPics = () => {
  pics.forEach(({url, description, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    container.append(picture);
  });
  picList.append(container);
};

export {renderPics};

