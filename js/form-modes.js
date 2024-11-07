const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const formElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = mapForm.querySelectorAll('.map__filter');

export const disableForm = () => {
  adForm.classList.add('ad-form--disabled');

  adForm.querySelector('.ad-form-header__input').setAttribute('disabled', '');
  formElements.forEach((element) => {
    element.setAttribute('disabled', '');
  });
  mapForm.classList.add('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.setAttribute('disabled', '');
  });
  mapForm.querySelector('.map__features').setAttribute('disabled', '');
};

export const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelector('.ad-form-header__input').removeAttribute('disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapForm.classList.remove('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.removeAttribute('disabled');
  });
  mapForm.querySelector('.map__features').removeAttribute('disabled');
};
