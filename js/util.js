const ALERT_SHOW_TIME = 10000;
const getRandomNumber = (min, max) => {
  const result = min + Math.random() * (max + 1 - min);
  return Math.floor(result);
};

const getRandomPureNumber = (min, max, amount) => {
  const result = min + Math.random() * (max - min);
  return Number(result.toFixed(amount));
};

const getRandomArrayElement = (elements) => elements[
  getRandomNumber(0, elements.length - 1)];

const getRandomElements = (array = [], count = 0) => {
  const randomElements = new Set();
  if (count && array.length !== 0) {
    for (let ind = 0; ind <= count; ind++) {
      randomElements.add(getRandomArrayElement(array));
    }
  }
  return Array.from(randomElements);
};
const showAllert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = '9%';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'grey';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = function (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
export {
  getRandomNumber,
  getRandomPureNumber,
  getRandomArrayElement,
  getRandomElements,
  showAllert,
  debounce,
};
