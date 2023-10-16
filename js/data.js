import {getRandomInteger, getRandomArrayEl} from './util.js';

const DESCRIPTIONS = [
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

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
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

const PICS_COUNT = 25;

const Comments = {
  MIN: 1,
  MAX: 30
};

const Likes = {
  MIN: 15,
  MAX: 200
};

const Avatars = {
  MIN: 1,
  MAX: 6
};

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(Avatars.MIN, Avatars.MAX)}.svg`,
  message: getRandomArrayEl(MESSAGES),
  name: getRandomArrayEl(NAMES)
});

const generateComments = (amount) => {
  const comments = [];
  for (let i = 1; i <= amount; i++) {
    comments.push(createComment(i));
  }
  return comments;
};

const createPic = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayEl(DESCRIPTIONS),
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: generateComments(getRandomInteger(Comments.MIN, Comments.MAX))
});

const generatePics = () => {
  const pics = [];
  for (let i = 1; i <= PICS_COUNT; i++) {
    pics.push(createPic(i));
  }
  return pics;
};

export {generatePics};

