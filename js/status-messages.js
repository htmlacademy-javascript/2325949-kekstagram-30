import { isEscapeKey } from './util.js';
import { closeForm, unblockSubmitBtn } from './form.js';

const DATA_ERROR_SHOWN_TIME = 5000;

const dataErrorMessage = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const closeMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
};

const onEscKeyPush = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeMessage();

    document.removeEventListener('keydown', onEscKeyPush);
    document.removeEventListener('click', onMouseButtonClick);

    document.querySelector('.img-upload__submit').blur();
  }
};

function onMouseButtonClick (evt) {
  if (!evt.target.classList.contains('error__inner') &&
      !evt.target.classList.contains('error__title') &&
      !evt.target.classList.contains('success__inner') &&
      !evt.target.classList.contains('success__title')) {
    closeMessage();

    document.removeEventListener('click', onMouseButtonClick);
    document.removeEventListener('keydown', onEscKeyPush);
  }
}

const showStatusMessage = (messageType) => {
  const fragment = document.createDocumentFragment();

  fragment.append(messageType);
  document.body.append(fragment);

  document.addEventListener('keydown', onEscKeyPush);
  document.addEventListener('click', onMouseButtonClick);
};

const onSuccess = () => {
  showStatusMessage(successMessage);
  unblockSubmitBtn();
  closeForm();
};

const onFail = () => {
  showStatusMessage(errorMessage);
  unblockSubmitBtn();
};

const showDataErrorMessage = () => {
  const fragment = document.createDocumentFragment();

  fragment.append(dataErrorMessage);
  document.body.append(fragment);

  setTimeout(() => {
    dataErrorMessage.remove();
  }, DATA_ERROR_SHOWN_TIME);
};

export {showDataErrorMessage, onSuccess, onFail};
