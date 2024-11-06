const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const getTypeOfHome = (item) => {
  switch (item) {
    case 'flat': return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    case 'hotel': return 'Отель';
  }
};

const createCard = (value) => {

  const cardClone = cardTemplate.cloneNode(true);
  const [author, offer] = [value.author, value.offer];

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
  if (offer.price !== 0 && offer?.price) {
    price.textContent = `${offer.price} ₽/ночь`;
  } else {
    price.textContent = 'Бесплатно';
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

  const featureList = cardClone.querySelector('.popup__features');
  featureList.innerHTML = '';
  if (offer?.features && offer.features.length !== 0) {
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
  photoList.innerHTML = '';
  if (offer?.photos && offer.photos.length !== 0) {
    offer.photos.forEach((link) => {
      const photoItem = document.createElement('img');
      photoItem.height = 40;
      photoItem.width = 45;
      photoItem.classList.add('popup__photo');
      photoItem.alt = 'Фотография жилья';
      photoItem.src = link;
      photoList.appendChild(photoItem);
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

  return cardClone;
};
export { createCard };
