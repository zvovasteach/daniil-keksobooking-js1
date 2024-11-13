const MAX_PRICE = 100000;
const MIN_PRICES = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};
const TITLE_LENGTH = {
  MIN: 30,
  MAX: 100,
};
const ROOMS_VALUES = {
  1: '1',
  2: '2',
  3: '3',
  100: '100',
};
const CAPACITY_VALUES = {
  3: '3',
  2: '2',
  1: '1',
  0: '0',
};
const ERROR_MESSAGES = {
  ROOMS: 'Количество комнат не может быть меньше количества гостей',
  CAPACITY: 'Количество гостей не может быть больше количества комнат',
  NO_GUESTS_100: '100 комнат предназначены не для гостей',
  NO_GUESTS: 'Не для гостей - предназначены для 100 комнат',
};

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error',
});
const validateTitle = (value) =>
  value.length >= TITLE_LENGTH.MIN
  && value.length <= TITLE_LENGTH.MAX;

pristine.addValidator(adForm.querySelector('#title'), validateTitle);

const capacity = adForm.querySelector('#capacity');
const room = adForm.querySelector('#room_number');

pristine.addValidator(room, (value) => Number(value) >= Number(capacity.value)
&& Number(capacity.value) >= CAPACITY_VALUES[0], ERROR_MESSAGES.ROOMS);

pristine.addValidator(room, (value) => !(value === ROOMS_VALUES[100]
&& capacity.value !== CAPACITY_VALUES[0]), ERROR_MESSAGES.NO_GUESTS_100);

pristine.addValidator(capacity, (value) => Number(value) <= Number(room.value)
|| Number(value) === Number(CAPACITY_VALUES[0]), ERROR_MESSAGES.CAPACITY);

pristine.addValidator(capacity, (value) => !(value === CAPACITY_VALUES[0]
&& room.value !== ROOMS_VALUES[100]), ERROR_MESSAGES.NO_GUESTS);

room.addEventListener('change', () => {
  pristine.validate(capacity);
});
capacity.addEventListener('change', () => {
  pristine.validate(room);
});

const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
price.setAttribute('min', MIN_PRICES.FLAT);
type.addEventListener('change', () => {
  if (type.value === 'bungalow') {
    price.setAttribute('min', MIN_PRICES.BUNGALOW);
    price.setAttribute('placeholder', MIN_PRICES.BUNGALOW);
  }
  if (type.value === 'flat') {
    price.setAttribute('min', MIN_PRICES.FLAT);
    price.setAttribute('placeholder', MIN_PRICES.FLAT);
  }
  if (type.value === 'hotel') {
    price.setAttribute('min', MIN_PRICES.HOTEL);
    price.setAttribute('placeholder', MIN_PRICES.HOTEL);
  }
  if (type.value === 'house') {
    price.setAttribute('min', MIN_PRICES.HOUSE);
    price.setAttribute('placeholder', MIN_PRICES.HOUSE);
  }
  if (type.value === 'palace') {
    price.setAttribute('min', MIN_PRICES.PALACE);
    price.setAttribute('placeholder', MIN_PRICES.PALACE);
  }
});

const validateNumber = (value) => {
  const min = price.getAttribute('min');
  return Number(value) <= MAX_PRICE && Number(value) >= Number(min);
};
const getErrorPriceMessage = () => `Цена не может быть ниже ${price.getAttribute('min')}`;

pristine.addValidator(price, validateNumber, getErrorPriceMessage);
type.addEventListener('change', () => {
  pristine.validate(price);
});

const adFormTime = adForm.querySelector('.ad-form__element--time');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
adFormTime.addEventListener('change', (evt) => {
  if (evt.target.matches('#timein')) {
    timeout.value = timein.value;
  }
  if (evt.target.matches('#timeout')) {
    timein.value = timeout.value;
  }
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

const slider = document.querySelector('.ad-form__slider');
noUiSlider.create(slider, {
  start: [0],
  step: 10,
  connect: 'lower',
  range: {
    min: 0,
    max: 100000,
  },
});
slider.noUiSlider.on('update', (handle) => {
  let value = Number(slider.noUiSlider.get());
  if (handle) {
    value = Number(handle);
  }
  price.value = value.toFixed(0);
  pristine.validate(price);
});
price.addEventListener('change', () => {
  slider.noUiSlider.set([price.value]);
});
