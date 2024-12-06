import { createPins } from './map-render.js';
import { getData } from './api.js';
import { debounce } from './util.js';
const RERENDER_DELAY = 500;
const FILTER_PRICES = {
  MIN_MIDDLE_PRICE: 10000,
  MAX_MIDDLE_PRICE: 50000,
  LOW_PRICE: 10000,
  HIGH_PRICE: 50000,
  ANY_PRICE: 0,
};
const AMOUNT_OF_PINS = 10;
const type = document.querySelector('[name="housing-type"]');
const price = document.querySelector('[name="housing-price"]');
const rooms = document.querySelector('[name="housing-rooms"]');
const capacity = document.querySelector('[name="housing-guests"]');
const filterByType = (item) => {
  if (item.offer.type === type.value) {
    return true;
  }
  if (type.value === 'any') {
    return true;
  }
};
const filterByPrice = (item) => {
  if (price.value === 'middle' && item.offer.price >= FILTER_PRICES.MIN_MIDDLE_PRICE && item.offer.price <= FILTER_PRICES.MAX_MIDDLE_PRICE) {
    return true;
  }
  if (price.value === 'low' && item.offer.price <= FILTER_PRICES.LOW_PRICE) {
    return true;
  }
  if (price.value === 'high' && item.offer.price >= FILTER_PRICES.HIGH_PRICE) {
    return true;
  }
  if (price.value === 'any' && item.offer.price >= FILTER_PRICES.ANY_PRICE) {
    return true;
  }
};
const filterByRooms = (item) => {
  if (item.offer.rooms === Number(rooms.value)) {
    return true;
  }
  if (rooms.value === 'any') {
    return true;
  }
};
const filterByGuests = (item) => {
  if (item.offer.guests === Number(capacity.value)) {
    return true;
  }
  if (capacity.value === 'any') {
    return true;
  }
};
const setTypeChange = (cb) => {
  type.addEventListener('change', () => {
    cb();
  });
};
const setPriceChange = (cb) => {
  price.addEventListener('change', () => {
    cb();
  });
};
const setRoomsChange = (cb) => {
  rooms.addEventListener('change', () => {
    cb();
  });
};
const setCapacityChange = (cb) => {
  capacity.addEventListener('change', () => {
    cb();
  });
};
const featuresList = document.querySelector('#housing-features');
let selectedFeatures = [];
const setFeatureListChange = (cb) => {
  featuresList.addEventListener('change', (evt) => {
    if (!selectedFeatures.includes(evt.target.value)) {
      selectedFeatures.push(evt.target.value);
    } else {
      const index = selectedFeatures.indexOf(evt.target.value);
      selectedFeatures.splice(index, 1);
    }
    cb();
  });
};
const filterByFeatures = (item) => {
  if (item.offer?.features) {
    return selectedFeatures.every((value) =>
      item.offer.features.includes(value));
  }
};
let copyData = [];
export const filterData = () => copyData
  .slice()
  .filter(filterByType)
  .filter(filterByPrice)
  .filter(filterByRooms)
  .filter(filterByGuests)
  .filter(filterByFeatures)
  .slice(0, AMOUNT_OF_PINS);
getData(async (data) => {
  copyData = await data;
  createPins(filterData());
});

const mapFilters = document.querySelector('.map__filters');
export const resetMapFilters = () => {
  mapFilters.reset();
  selectedFeatures = [];
  createPins(filterData());
};
const filterOnChange = () => {
  setTypeChange(debounce(() =>
    createPins(filterData()), RERENDER_DELAY));
  setPriceChange(debounce(() =>
    createPins(filterData()), RERENDER_DELAY));
  setRoomsChange(debounce(() =>
    createPins(filterData()), RERENDER_DELAY));
  setCapacityChange(debounce(() =>
    createPins(filterData()), RERENDER_DELAY));
  setFeatureListChange(debounce(() =>
    createPins(filterData()), RERENDER_DELAY));
};
filterOnChange();
