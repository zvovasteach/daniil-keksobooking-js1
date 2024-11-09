const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error',
});
const validateTitle = (value) => value.length >= 30 && value.length <= 100;

const validateNumber = (value) => value <= 100000;

pristine.addValidator(adForm.querySelector('#title'), validateTitle);
pristine.addValidator(adForm.querySelector('#price'), validateNumber);

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
