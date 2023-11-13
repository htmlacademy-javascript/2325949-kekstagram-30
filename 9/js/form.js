import '../vendor/pristine/pristine.min.js';
import { isEscapeKey } from './util.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_NUMBER = 5;

const uploadForm = document.querySelector('.img-upload__form');

const formOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCloseBtn = uploadForm.querySelector('.img-upload__cancel');

const formInput = uploadForm.querySelector('.img-upload__input');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const hashtagRegExp = /^#[\wа-яё]{1,19}$/i;

const closeForm = () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formCloseBtn.removeEventListener('click',closeForm);
  document.removeEventListener('keydown',closeFormOnEsc);

  resetFrom();
};

const openForm = () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCloseBtn.addEventListener('click',closeForm);
  document.addEventListener('keydown',closeFormOnEsc);
};

function closeFormOnEsc (evt) {
  if (isEscapeKey(evt)) {
    closeForm();
  }
}

function resetFrom() {
  formInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
}

formInput.addEventListener('change',openForm);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtag = (value) => {
  const hashtagArr = value.split(' ');

  return !(hashtagArr.find((item) => !hashtagRegExp.test(item))) &&
        !(hashtagArr.length > MAX_HASHTAG_NUMBER) &&
        (new Set(hashtagArr).size === hashtagArr.length);
};

const getHashtagErrorMessage = () => {
  const hashtagArr = hashtagInput.value.split(' ');

  if (hashtagArr.find((item) => !hashtagRegExp.test(item))) {
    return 'Введён невалидный хэш-тег';
  }
  if (hashtagArr.length > MAX_HASHTAG_NUMBER) {
    return 'Превышено количество хэш-тегов';
  }
  if (new Set(hashtagArr).size !== hashtagArr.length) {
    return 'Хэш-теги не должны повторяться';
  }
};

pristine.addValidator(hashtagInput, validateHashtag, getHashtagErrorMessage);

const validateComment = (value) => value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(commentInput, validateComment, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

