const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error',
});
const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(adForm.querySelector('#title'), validateTitle);

const capacity = adForm.querySelector('#capacity');
const room = adForm.querySelector('#room_number');

pristine.addValidator(room, (value) => Number(value) >= Number(capacity.value) && Number(capacity.value) >= 0, 'Количество комнат не может быть меньше количества гостей', false);

pristine.addValidator(room, (value) => {
  if (value === '100' && capacity.value !== '0') {
    return false;
  } else {
    return true;
  }
}, '100 комнат предназначены не для гостей', false);

pristine.addValidator(capacity, (value) => Number(value) <= Number(room.value) || Number(value) === 0, 'Количество гостей не может быть больше количества комнат', false);

pristine.addValidator(capacity, (value) => {
  if (value === '0' && room.value !== '100') {
    return false;
  } else {
    return true;
  }
}, 'Не для гостей - предназначены для 100 комнат', false);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
type.addEventListener('change', () => {
  if (type.value === 'bungalow') {
    price.setAttribute('min', '0');
    price.setAttribute('placeholder', '0');
  }
  if (type.value === 'flat') {
    price.setAttribute('min', '1000');
    price.setAttribute('placeholder', '1000');
  }
  if (type.value === 'hotel') {
    price.setAttribute('min', '3000');
    price.setAttribute('placeholder', '3000');
  }
  if (type.value === 'house') {
    price.setAttribute('min', '5000');
    price.setAttribute('placeholder', '5000');
  }
  if (type.value === 'palace') {
    price.setAttribute('min', '10000');
    price.setAttribute('placeholder', '10000');
  }
});

const validateNumber = (value) => {
  const min = price.getAttribute('min');
  if (Number(value) <= 100000 && Number(value) >= Number(min)) {
    return true;
  }
};
const getErrorNumberMessage = () => {
  if (price.value < 100000) {
    return `Цена не может быть ниже ${price.getAttribute('min')}`;
  }
};

pristine.addValidator(adForm.querySelector('#price'), validateNumber, getErrorNumberMessage);

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
