import '../vendor/pristine/pristine.min.js';
import { getErrorMessage, validateHashtags } from './hashrag-pristine.js';
import { onMinusBtnClick, onPlusBtnClick } from './zoom.js';
import { sliderField, image } from './effects.js';
import { isEscapeKey } from './util.js';
import { onSuccess, onFail } from './status-messages.js';
import { uploadData } from './fetch.js';


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


const onEscKeyDown = (evt) => {
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
  document.removeEventListener('keydown', onEscKeyDown);
}


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

const uplaodFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if(isValid) {
      const formData = new FormData(evt.target);

      uploadData(onSuccess, onFail, 'POST', formData);
    }
  });
};

export {uplaodFormSubmit, closeForm};
