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
    for (let ind = 0; ind < count; ind++) {
      randomElements.add(getRandomArrayElement(array));
    }
  }
  return Array.from(randomElements);
};
export { getRandomNumber, getRandomPureNumber,
  getRandomArrayElement, getRandomElements };
