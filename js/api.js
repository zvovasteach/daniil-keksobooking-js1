import { showAllert } from './util.js';

export const getData = (onSuccess) => {
  fetch('https://25.javascript.htmlacademy.pro/keksobooking/data')
    .then ((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAllert('Произошла ошибка при загрузки данных с сервера');
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch('https://25.javascript.htmlacademy.pro/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then ((response) => {
      if (response.ok) {
        return onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
