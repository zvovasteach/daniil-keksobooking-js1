import './util.js';
import './popup.js';
import './constants.js';
import './form-modes.js';
import './form_validation.js';
import { getMockData } from './data.js';
import { getRandomArrayElement } from './util.js';
import { createCard } from './popup.js';
import { disableForm } from './form-modes.js';
import { enableForm } from './form-modes.js';

const randomObject = getRandomArrayElement(getMockData());
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(createCard(randomObject));
disableForm();
enableForm();
