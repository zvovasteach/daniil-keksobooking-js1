const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelectorAll('.map__filter');

export const disableForm = () => {
  form.classList.add('ad-form--disabled');

  form.querySelector('.ad-form-header__input').setAttribute('disabled', '');
  formElements.forEach((element) => {
    element.setAttribute('disabled', '');
  });

  document.querySelector('.map__filters').classList.add('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.setAttribute('disabled', '');
  });
  document.querySelector('.map__features').setAttribute('disabled', '');
};

export const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  form.querySelector('.ad-form-header__input').removeAttribute('disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  document.querySelector('.map__filters').classList.remove('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.removeAttribute('disabled');
  });
  document.querySelector('.map__features').removeAttribute('disabled', '');
};
