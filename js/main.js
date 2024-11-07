import './util.js';
import './popup.js';
import './constants.js';
import { getMockData } from './data.js';
import { getRandomArrayElement } from './util.js';
const randomObject = getRandomArrayElement(getMockData());
import { createCard } from './popup.js';
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(createCard(randomObject));
