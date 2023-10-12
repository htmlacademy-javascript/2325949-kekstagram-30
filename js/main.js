const desriptions = [
  'Анталия 2009',
  'Геленджик 2005',
  'Дербент 2011',
  'Девушка с фотоаппаратом',
  'Рисовый оверпрайс',
  'Бумер',
  'Клубничный фудстайлинг',
  'Прохладительные напитки',
  'Чудеса на виражах',
  'Ikea Осенняя колекция',
  'Тропические огороды',
  'Новый мерин',
  'Фудстайлинг 2',
  'Неешь подумой',
  'На лабутенах',
  'Starfield релиз',
  'Kunteynir Лужники',
  'Черная молния',
  'Подкрадули',
  'Южный Централ'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'BOBAH1995rus',
  'Евпатий Коловрат',
  'EvilArthas',
  'Дементий',
  'Стив Джобс',
  'Сергей Мавроди',
  'Аннигиляторная Пушка',
  'Бот-454822',
  'Петька Петьков',
  'Дмитрий Нагиев'
];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const getRandomArrayEl = (array) => array[getRandomInteger(0, array.length - 1)];

function createUniqueNumber (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const genPicId = createUniqueNumber (1,25);
const genCommentId = createUniqueNumber (1,999999);
const genUrlId = createUniqueNumber (1,25);

const genCommentObject = () => ({
  id: genCommentId,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayEl(messages),
  name: getRandomArrayEl(names)});

const genPicObject = () => ({
  id: genPicId(),
  url: `photos/${genUrlId}.jpg`,
  description: getRandomArrayEl(desriptions),
  likes: getRandomInteger(15,200),
  comments: Array.from({length:25},genCommentObject)
});

const pics = Array.from({length:25},genPicObject);

export{pics};
