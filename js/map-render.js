import { enableForm } from './form-modes.js';
import { disableForm } from './form-modes.js';
import { createCard } from './popup.js';
disableForm();
import { TOKYO_CENTER_COORDS } from './constants.js';

export const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
  })
  .setView({
    lat: TOKYO_CENTER_COORDS.LAT,
    lng: TOKYO_CENTER_COORDS.LNG,
  }, 13);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
export const mainMarker = L.marker(
  {
    lat: TOKYO_CENTER_COORDS.LAT,
    lng: TOKYO_CENTER_COORDS.LNG,
  },
  {
    icon: mainPinIcon,
    draggable: true,
  },
);
mainMarker.addTo(map);
const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const createPins = (data) => {
  data.forEach((value) => {
    const lat = value.location.lat;
    const lng = value.location.lng;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(createCard(value));
  });
};
