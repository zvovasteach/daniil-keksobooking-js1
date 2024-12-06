import { mainMarker } from './map-render.js';
import { pristine, sliderValidate } from './form-validation.js';
import { TOKYO_CENTER_COORDS, DEFAULT_MAP_ZOOM_VALUE } from './constants.js';
import { map } from './map-render.js';
import { resetValidation } from './form-validation.js';
import { sendData } from './api.js';
import { resetMapFilters } from './map-filter.js';

const SLIDER_MAX_VALUE = 100000;
const address = document.querySelector('#address');
address.setAttribute('value', `lat: ${TOKYO_CENTER_COORDS.LAT}, lng: ${TOKYO_CENTER_COORDS.LNG}`);
address.setAttribute('readonly', '');
const setAddressCoords = (evt) => {
  const coords = evt.target.getLatLng();
  const lat = coords.lat.toFixed(5);
  const lng = coords.lng.toFixed(5);
  address.value = `lat: ${lat}, lng: ${lng}`;
};
mainMarker.on('moveend', setAddressCoords);

const slider = document.querySelector('.ad-form__slider');
const price = document.querySelector('#price');
noUiSlider.create(slider, {
  start: [0],
  step: 1,
  connect: 'lower',
  range: {
    min: 0,
    max: SLIDER_MAX_VALUE,
  },
});

slider.noUiSlider.on('update', (handle) => {
  let value = Number(slider.noUiSlider.get());
  if (handle) {
    value = Number(handle);
  }
  price.value = value.toFixed(0);
  sliderValidate();
});
price.addEventListener('change', () => {
  slider.noUiSlider.set([price.value]);
});

const resetFormButton = document.querySelector('.ad-form__reset');

const adForm = document.querySelector('.ad-form');
export const formReset = () => {
  adForm.reset();
  slider.noUiSlider.updateOptions({
    start: [0],
    step: 1,
    connect: 'lower',
    range: {
      min: 0,
      max: SLIDER_MAX_VALUE,
    },
  });
  mainMarker.setLatLng({
    lat: TOKYO_CENTER_COORDS.LAT,
    lng: TOKYO_CENTER_COORDS.LNG,
  });
  map.setView({
    lat: TOKYO_CENTER_COORDS.LAT,
    lng: TOKYO_CENTER_COORDS.LNG,
  }, DEFAULT_MAP_ZOOM_VALUE);
  map.closePopup();
  resetMapFilters();
  resetValidation();
};
resetFormButton.addEventListener('click', formReset);

const successInfoBlock = document.querySelector('#success').content.querySelector('.success');
const showFormSuccessInfo = () => {
  document.body.append(successInfoBlock);
};
const removeFormSuccessInfo = () => {
  document.body.removeChild(successInfoBlock);
  if (successInfoBlock !== null) {
    onSuccessEscDown();
    onSuccessClick();
  }
};

// eslint-disable-next-line func-style,prefer-arrow/prefer-arrow-functions
function onSuccessClick() {
  document.removeEventListener('click', removeFormSuccessInfo);
}

// eslint-disable-next-line func-style,prefer-arrow/prefer-arrow-functions
function onSuccessEscDown() {
  document.removeEventListener('keydown', removeFormSuccessInfo);
}
const handleSuccess = () => {
  formReset();
  showFormSuccessInfo();
  document.addEventListener('keydown', removeFormSuccessInfo);
  document.addEventListener('click', removeFormSuccessInfo);
};

const errorInfoBlock = document.querySelector('#error').content.querySelector('.error');
const showFormErrorInfo = () => {
  document.body.append(errorInfoBlock);
};
const errorFormButton = document.querySelector('.error-button');
const removeFormErrorInfo = () => {
  document.body.removeChild(errorInfoBlock);
  if (errorInfoBlock !== null) {
    onErrorEscDown();
    onErrorClick();
  }
};

// eslint-disable-next-line func-style,prefer-arrow/prefer-arrow-functions
function onErrorEscDown() {
  document.removeEventListener('keydown', removeFormErrorInfo);
}

// eslint-disable-next-line func-style,prefer-arrow/prefer-arrow-functions
function onErrorClick() {
  document.removeEventListener('click', removeFormErrorInfo);
}
const onErrorButtonClick = () => {
  if (errorFormButton !== null) {
    errorFormButton.addEventListener('click', removeFormErrorInfo);
  }
};
const handleError = () => {
  showFormErrorInfo();
  document.addEventListener('keydown', removeFormErrorInfo);
  document.addEventListener('click', removeFormErrorInfo);
  onErrorButtonClick();
};

const submitButton = adForm.querySelector('.ad-form__submit');
const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};
const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    disableSubmitButton();
    sendData(
      () => {
        handleSuccess();
        enableSubmitButton();
      },
      () => {
        handleError();
        enableSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});
