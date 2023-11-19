import '../vendor/pristine/pristine.min.js';
import { getErrorMessage, validateHashtags } from './hashrag-pristine.js';
import { onMinusBtnClick, onPlusBtnClick } from './zoom.js';
import { sliderField, image } from './effects.js';
import { isEscapeKey } from './util.js';


const uploadForm = document.querySelector('.img-upload__form');
const formInput = uploadForm.querySelector('.img-upload__input');
const formOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCloseBtn = uploadForm.querySelector('.img-upload__cancel');
const formSubmitBtn = uploadForm.querySelector('.img-upload__submit');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const minusBtn = uploadForm.querySelector('.scale__control--smaller');
const plusBtn = uploadForm.querySelector('.scale__control--bigger');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

function resetFrom() {
  uploadForm.reset();
  pristine.reset();

  formInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';

  sliderField.classList.add('hidden');
  image.style.transform = 'scale(1)';
  image.style.filter = 'none';
}

const closeForm = () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetFrom();
};

const onFormCloseBtnClick = () => {
  closeForm();

  formCloseBtn.removeEventListener('click',onFormCloseBtnClick);
};

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt) &&
  !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    closeForm();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};


const openForm = () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onUploadFormChange = () => {
  openForm();

  formCloseBtn.addEventListener('click', onFormCloseBtnClick);
  document.addEventListener('keydown',onEscKeyDown);
};


formInput.addEventListener('change', onUploadFormChange);

minusBtn.addEventListener('click', onMinusBtnClick);
plusBtn.addEventListener('click', onPlusBtnClick);

pristine.addValidator(hashtagInput,validateHashtags,getErrorMessage);

const onHashtagInput = () => {
  if (pristine.validate()) {
    formSubmitBtn.disabled = false;
  } else {
    formSubmitBtn.disabled = true;
  }
};

hashtagInput.addEventListener('input',onHashtagInput);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

