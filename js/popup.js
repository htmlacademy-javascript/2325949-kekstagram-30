import {isEscapeKey} from './util.js';

const COMMENTS_COUNT_AT_ONCE = 5;

const bigPicture = document.querySelector('.big-picture');
const closeBtn = document.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const loadBtn = bigPicture.querySelector('.comments-loader');

const renderComment = ({avatar, name, message}) => `
  <li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>
`;

const renderCurrentComments = (maxIndex, comments) => {
  let currentIndex = commentsList.children.length;
  if (maxIndex >= comments.length) {
    maxIndex = comments.length;
    loadBtn.classList.add('hidden');
  }
  while (currentIndex < maxIndex) {
    const comment = renderComment(comments[currentIndex]);
    commentsList.insertAdjacentHTML('beforeend', comment);
    currentIndex++;
  }
};

let onloadCommentsBtnClick;

const renderComments = (comments) => {
  let maxIndex = COMMENTS_COUNT_AT_ONCE;

  onloadCommentsBtnClick = () => {
    renderCurrentComments(maxIndex, comments);
    bigPicture.querySelector('.social__comment-shown-count').textContent = maxIndex > comments.length ? comments.length : maxIndex;
    maxIndex += COMMENTS_COUNT_AT_ONCE;
  };

  commentsList.innerHTML = '';
  loadBtn.classList.remove('hidden');
  onloadCommentsBtnClick();
  loadBtn.addEventListener('click', onloadCommentsBtnClick);
};

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  renderComments(comments);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  loadBtn.removeEventListener('click', onloadCommentsBtnClick);
  closeBtn.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', closeBigPictureByEsc);
};

function closeBigPictureByEsc (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const showBigPicture = (pic) => {
  renderBigPicture(pic);
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  closeBtn.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', closeBigPictureByEsc);
};
export {showBigPicture};
