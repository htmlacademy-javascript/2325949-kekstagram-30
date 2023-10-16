// Первая функция

const bob = 1010101;

function lengthCheck (string, maxLength) {
  string += '';
  return string.length <= maxLength;
}
lengthCheck(bob, 10);

// Вторая функция

const mary = 'А роза упала на лапу Азора';

function palyCheck (string) {
  string += '';
  string = string.replaceAll(' ','');
  string = string.toUpperCase();
  let stringReverse = '';
  for (let i = string.length - 1; i >= 0; i--) {
    stringReverse += string[i];
  }
  return string === stringReverse;
}

palyCheck(mary);

// Третья функция

const jean = 'rh101М01  0101';

function digitParse (string) {
  string += '';
  let char;
  let digit = '';
  for (let i = 0; i <= string.length; i++) {
    char = parseInt(string[i],10);
    if (Number.isNaN(char) !== true) {
      digit += string[i];
    }
  }
  return +digit;
}

digitParse(jean);

// Четвертая функция

const timeConvert = (stringTime) => {
  const dots = stringTime.indexOf(':');
  const intTime = parseInt(stringTime.slice(0,dots),10) * 60 + parseInt(stringTime.slice(dots + 1),10);
  return intTime;
};

const overtime = (dayBegin,dayEnd,meetupBegin,duration) => {
  duration = +duration;
  const beginTime = timeConvert(dayBegin);
  const endTime = timeConvert(dayEnd);
  const meetupTime = timeConvert(meetupBegin);
  return (meetupTime >= beginTime) && ((meetupTime + duration) <= endTime);
};

overtime('08:5','17:05','14:00','90');
