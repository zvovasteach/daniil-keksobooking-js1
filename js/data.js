import { getRandomNumber, getRandomPureNumber, getRandomArrayElement, getRandomElements } from './util.js';
import { TYPES, CHECK_IN_OUT_TIMES, FEATURES_LIST } from './constants.js';

const TITLES = [
  'АирБНБ-Квартира',
  'Хата 10 на 10',
  'Студия на Замоскворечной',
  'Подьезд в Хамовниках',
  'Обычная квартира',
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

const getImageLink = (index) => {
  const number = index + 1;
  return (number > 9) ? `img/avatars/user${number}.png` : `img/avatars/user0${number}.png`;
};

const createObject = (_, index) => {
  const location = {
    lat: getRandomPureNumber(35.65000, 35.70000, 5),
    lng: getRandomPureNumber(139.70000, 139.80000, 5),
  };
  return {
    author: {
      avatar: getImageLink(index),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat},${location.lng}`,
      price: getRandomNumber(0, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 8),
      guests: getRandomNumber(1, 16),
      checkin: getRandomArrayElement(CHECK_IN_OUT_TIMES),
      checkout: getRandomArrayElement(CHECK_IN_OUT_TIMES),
      features: getRandomElements(FEATURES_LIST,
        getRandomNumber(0, FEATURES_LIST.length)),
      description: getRandomArrayElement(DESCRIPTION_LIST),
      photos: getRandomElements(PHOTOS_LIST,
        getRandomNumber(0, PHOTOS_LIST.length)),
    },
    location,
  };
};
const getMockData = () => Array.from({ length: 10 }, createObject);
export { getMockData };
export { createObject };
