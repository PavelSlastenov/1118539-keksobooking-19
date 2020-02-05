'use strict';

//  Количество объявлений
var NUMBER_OF_ADS = 8;

//  Всё содержимое объявления
var TYPE_OF_HOUSING = ['palace','flat','house','bungalo'];
var CHECKIN = ['12:00','13:00','14:00'];
var CHECKOUT = ['12:00','13:00','14:00'];
var OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];
var MIN_PRICE = 5000;
var MAX_PRICE = 100000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var CURRENCY = '₽';
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Размеры метки
var PIN_WIDTH = 100;
var PIN_HEIGHT = 100;

//  Координаты метки
var LOCATION_X_MIN = 0;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

//  Метка объявления
var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinWidth = document.querySelector('.map__pin').offsetWidth;
var pinHeight = document.querySelector('.map__pin').offsetHeight;

//  Функция выбора случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//  Функция выбора элемента из массива (можно применить к любому масиву)
var getRandomElement = function (arr) {
  if (!arr) {
    return null;
  } else {
    var random = Math.floor(Math.random() * arr.length);
    return arr[random];
  }
};


