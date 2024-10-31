const TITLES = [
  'АирБНБ-Квартира',
  'Хата 10 на 10',
  'Студия на Замоскворечной',
  'Подьезд в Хамовниках',
  'Обычная квартира',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTION_LIST = [
  'Пожалуйста не сьезжайте',
  'Электрического чайника нет',
  'Премиум квартира, но кнопка включение бойлера вырубает рубильник',
  'В этой квартире не работает холодильник',
  'В этой квартире нету сковородки',
  'Сделаем все возможное для вашего комфортного отдыха',
];
const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomNumber = (min, max) => {
  const result = min + Math.random() * (max + 1 - min);
  return Math.floor(result);
};

const getRandomPureNumber = (min, max, amount) => {
  const result = min + Math.random() * (max - min);
  return Number(result.toFixed(amount));
};

const getRandomArrayElement = (elements) => elements[
  getRandomNumber(0, elements.length - 1)
];

const getRandomAmountElements = (elements) => {
  const times = getRandomNumber(0, elements.length - 1);
  const array = [];
  for (let i = 0; i <= times; i++) {
    const number = getRandomNumber(0, elements.length - 1);
    if (array.includes(`${elements[number]} `)) {
      break;
    }
    array.push(`${elements[number]} `);
  }
  return array;
};

const getImageLink = (index) => {
  const number = index + 1;
  return (number > 9) ? `img/avatars/user${number}.png` : `img/avatars/user0${number}.png`;
};

const createAvatar = (index) => ({
  avatar: getImageLink(index),
});

const createObject = (_, index) => ({
  author: createAvatar(index),
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${getRandomPureNumber(-90, 90, 5)} ${getRandomPureNumber(-180, 180, 5)}`,
    price: getRandomNumber(500, 10000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomNumber(1, 8),
    guests: getRandomNumber(1, 16),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: `${getRandomAmountElements(FEATURES_LIST)}`,
    description: getRandomArrayElement(DESCRIPTION_LIST),
    photos: `${getRandomAmountElements(PHOTOS_LIST)}`,
  },
  location: {
    lat: getRandomPureNumber(35.65000, 35.70000, 5),
    lng: getRandomPureNumber(139.70000, 139.80000, 5),
  },
});
const resultArray = Array.from({ length: 10 }, createObject);
console.log(resultArray);
