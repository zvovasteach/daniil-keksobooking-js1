import './util.js';
import './popup.js';
import './constants.js';
import './form-modes.js';
import './form-validation.js';
import './map.js';
import { mainMarker } from './map.js';
const address = document.querySelector('#address');
address.value = 'lat: 35.68, lng: 139.75';
address.setAttribute('readonly', '');
mainMarker.on('moveend', (evt) => {
  const coords = evt.target.getLatLng();
  const lat = coords.lat.toFixed(5);
  const lng = coords.lng.toFixed(5);
  address.value = `lat: ${lat}, lng: ${lng}`;
});
