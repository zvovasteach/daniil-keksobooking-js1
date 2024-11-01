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
const CHECK_IN_OUT_TIMES = [
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

const getRandomElements = (array = [], count = 0) => {
  const randomElements = new Set();
  if (count && array.length !== 0) {
    for (let ind = 0; ind < count; ind++) {
      randomElements.add(getRandomArrayElement(array));
    }
  }
  return Array.from(randomElements);
};

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
      price: getRandomNumber(500, 10000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 8),
      guests: getRandomNumber(1, 16),
      checkin: getRandomArrayElement(CHECK_IN_OUT_TIMES),
      checkout: getRandomArrayElement(CHECK_IN_OUT_TIMES),
      features: getRandomElements(FEATURES_LIST,
        getRandomNumber(1, FEATURES_LIST.length)),
      description: getRandomArrayElement(DESCRIPTION_LIST),
      photos: getRandomElements(PHOTOS_LIST,
        getRandomNumber(1, PHOTOS_LIST.length)),
    },
    location,
  };
};
const resultArray = Array.from({ length: 10 }, createObject);
console.log(resultArray);
