const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_NUMBER = 5;

let errorMessage = '';

const getErrorMessage = () => errorMessage;

const hashtagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtags = (hashtags) => {
  const stringHashtags = hashtags.toLowerCase().trim();
  const splitHashtags = stringHashtags.split(/\s+/);

  if (!stringHashtags) {
    return true;
  }

  if (splitHashtags.length === 0) {
    return true;
  }

  const rules = [
    {
      check: splitHashtags.some((hashtag) => hashtag.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами'
    },
    {
      check: splitHashtags.some((hashtag) => hashtag[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
    {
      check: splitHashtags.some((hashtag, index, array) => array.includes(hashtag, index + 1)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: splitHashtags.some((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH),
      error: `Длинна хэш-тега не должна превышать ${MAX_HASHTAG_LENGTH} символов, включая решетку`
    },
    {
      check: splitHashtags.length > MAX_HASHTAG_NUMBER,
      error: `К фото нельзя добавлять более ${MAX_HASHTAG_NUMBER} хэш-тегов`
    },
    {
      check: splitHashtags.some((hashtag) => !hashtagRegexp.test(hashtag)),
      error: 'Хэш-тег содержит запрещенные символы'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};


export {getErrorMessage, validateHashtags};
