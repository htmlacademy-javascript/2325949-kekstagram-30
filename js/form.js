import '../vendor/pristine/pristine.min.js';
import { getErrorMessage, validateHashtags } from './hashtag-pristine.js';
import { onMinusBtnClick, onPlusBtnClick } from './zoom.js';
import { sliderField, image } from './effects.js';
import { isEscapeKey } from './util.js';
import { onSuccess, onFail } from './status-messages.js';
import { uploadData } from './fetch.js';

const COMMENT_FIELD_ERROR = 'Длина комментария больше 140 символов';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const formInput = uploadForm.querySelector('.img-upload__input');
const formOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCloseBtn = uploadForm.querySelector('.img-upload__cancel');
const formSubmitBtn = uploadForm.querySelector('.img-upload__submit');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const minusBtn = uploadForm.querySelector('.scale__control--smaller');
const plusBtn = uploadForm.querySelector('.scale__control--bigger');
const imgPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreview = uploadForm.querySelectorAll('.effects__preview');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function resetFrom() {
  uploadForm.reset();
  pristine.reset();

  formInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  formSubmitBtn.disabled = true;

  sliderField.classList.add('hidden');
  image.style.transform = 'scale(1)';
  image.style.filter = 'none';
}


const onEscKeyPush = (evt) => {
  if (isEscapeKey(evt) &&
  !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description') &&
  document.querySelector('.error') === null
  ) {
    evt.preventDefault();
    closeForm();
  }
};

const onFormCloseBtnClick = () => {
  closeForm();
};

function closeForm() {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetFrom();
  formCloseBtn.removeEventListener('click',onFormCloseBtnClick);
  document.removeEventListener('keydown', onEscKeyPush);
}


const openForm = () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onUploadFormChange = () => {
  openForm();

  const file = formInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);

    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${imgPreview.src})`;
    });
  }

  formCloseBtn.addEventListener('click', onFormCloseBtnClick);
  document.addEventListener('keydown',onEscKeyPush);
};


formInput.addEventListener('change', onUploadFormChange);

minusBtn.addEventListener('click', onMinusBtnClick);
plusBtn.addEventListener('click', onPlusBtnClick);

pristine.addValidator(hashtagInput,validateHashtags,getErrorMessage);

const validateCommentMessage = (value) => value.length <= 140;

pristine.addValidator(commentInput, validateCommentMessage, COMMENT_FIELD_ERROR);

const onHashtagInput = () => {
  if (pristine.validate()) {
    formSubmitBtn.disabled = false;
  } else {
    formSubmitBtn.disabled = true;
  }
};

hashtagInput.addEventListener('input',onHashtagInput);

const blockSubmitBtn = () => {
  formSubmitBtn.disabled = true;
};

const unblockSubmitBtn = () => {
  document.querySelector('.img-upload__submit').disabled = false;
};


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if(isValid) {
    const formData = new FormData(evt.target);
    blockSubmitBtn();

    uploadData(onSuccess, onFail, 'POST', formData);
  }
});

export {closeForm, unblockSubmitBtn};
