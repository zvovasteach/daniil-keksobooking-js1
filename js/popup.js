import { getMockData } from './data.js';
const offers = getMockData();
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const getTypeOfHome = (item) => {
  if (item === 'flat') {
    return 'Квартира';
  }
  if (item === 'bungalow') {
    return 'Бунгало';
  }
  if (item === 'house') {
    return 'Дом';
  }
  if (item === 'palace') {
    return 'Дворец';
  }
  if (item === 'hotel') {
    return 'Отель';
  }
};
offers.forEach(({
  author, offer }) => {
  const cardClone = cardTemplate.cloneNode(true);
  const featureList = cardClone.querySelector('.popup__features');
  featureList.innerHTML = '';
  const title = cardClone.querySelector('.popup__title');
  if (offer?.title) {
    title.textContent = offer.title;
  } else {
    title.remove();
  }
  const address = cardClone.querySelector('.popup__text--address');
  if (offer?.address) {
    address.textContent = offer.address;
  } else {
    address.remove();
  }
  const price = cardClone.querySelector('.popup__text--price');
  if (offer?.price) {
    price.textContent = `${offer.price}₽/ночь`;
  } else {
    price.remove();
  }
  const type = cardClone.querySelector('.popup__type');
  if (offer?.type) {
    type.textContent = getTypeOfHome(offer.type);
  } else {
    type.remove();
  }
  const capacity = cardClone.querySelector('.popup__text--capacity');
  if (offer?.rooms && offer?.guests) {
    capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    capacity.remove();
  }
  const time = cardClone.querySelector('.popup__text--time');
  if (offer?.checkin && offer?.checkout) {
    time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    time.remove();
  }
  if (offer?.features) {
    offer.features.forEach((item) => {
      const element = document.createElement('li');
      element.classList.add(`popup__feature--${item}`, 'popup__feature');
      featureList.appendChild(element);
    });
  } else {
    featureList.remove();
  }
  const description = cardClone.querySelector('.popup__description');
  if (offer?.description) {
    description.textContent = offer.description;
  } else {
    description.remove();
  }
  const photoList = cardClone.querySelector('.popup__photos');
  if (offer?.photos) {
    const photoItem = photoList.querySelector('.popup__photo');
    photoItem.remove();
    offer.photos.forEach((link) => {
      const photoCopy = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      photoCopy.src = link;
      photoList.appendChild(photoCopy);
    });
  } else {
    photoList.remove();
  }
  const avatar = cardClone.querySelector('.popup__avatar');
  if (author?.avatar) {
    avatar.src = author.avatar;
  } else {
    avatar.remove();
  }
  console.log(cardClone);
  mapCanvas.appendChild(cardClone);
});
