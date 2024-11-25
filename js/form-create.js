import { mainMarker } from './map-render.js';
import { sliderValidate } from './form-validation.js';
import { TOKYO_CENTER_COORDS, DEFAULT_MAP_ZOOM_VALUE } from './constants.js';
import { map } from './map-render.js';
import { resetValidation } from './form-validation.js';
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
resetFormButton.addEventListener('click', () => {
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
  resetValidation();
});
