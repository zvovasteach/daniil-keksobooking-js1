import { createPins } from './map-render.js';
import { getData } from './api.js';
getData((data) => {
  createPins(data);
});
