'use strict';

//  Количество объявлений
var NUMBER_OF_ADS = 8;

//  Всё содержимое объявления
var TYPE_OF_HOUSING = ['palace','flat','house','bungalo'];
var CHECKIN = ['12:00','13:00','14:00'];
var CHECKOUT = ['12:00','13:00','14:00'];
var OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];
var PRICE = {
  MIN: 200,
  MAX: 10000
};
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var CURRENCY = '₽';
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TITLE = [
  'Отличное расположение!',
  'Дёшево и сердито',
  'Рядом с метро!',
  'Дизайнерский ремонт!',
  'Тихий район',
  'Красивый район!',
  'Самая выгодная цена!',
  'Своя закрытая территория!'
];
var DESCRIPTION = [
  'Новый ремонт, техника, тихие соседи, закрытая территория',
  'Красивый вид из окна, удобное расположение (5 минут от метро), шумные соседи',
  'Детский сад прямо в доме, магазин на первом этаже, требует ремонта, рядом с метро (50 мин. на автобусе)',
  'Выезд без пробок, своя парковка, поликлиника рядом, вся мебель и техника в отличном состоянии',
  'Требует ремонта, большая лоджия, хорошая транспортная доступность',
  'Лучший вариант, красивый ремонт, дорогая техника, просторная ванная, большая кровать в спальне',
  'Самое дорогое предложение, без торга, своя парковка, фитнес зал, бессейн прямо в доме, беседка и мангал на территории',
  'Предложение для тех кто хочет сэкономить, раскладушка, обогреватель, холодная вода (горячая у соседей), холодильник за окном'
];

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

//  Переменная задающая размер блока где будет находится метка на карте
var maxWidth = document.querySelector('.map__pins').offsetWidth;

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

//  Функция создающая объекты в массиве
var getAdList = function (number) {
  var adList = [];
  for (var i = 0; i < number; i++) {
    var X = getRandomElement(LOCATION_Y_MIN, maxWidth);
    var Y = getRandomElement(LOCATION_Y_MIN, LOCATION_Y_MAX);
    adList.push({
      author: {
//  Случайная адресная строка для "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png,
//  где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются.
        avatar: 'img/avatars/user' + '0' + getRandomNumber(1, 8) + '.png'
      }
      location: {
        x: X,
        y: Y
        // "x": случайное число, координата x метки на карте, ограничено размерами блока, в котором перетаскивается метка.
        // "y": случайное число, координата y метки на карте от 130 до 630 (в переменных: LOCATION_Y_MIN = 130 LOCATION_Y_MAX = 630)
      },
      offer: {
        title: TITLE[getRandomElement(TITLE.length)],
        address: coordinateX + ' , ' + coordinateY,
        price: getRandomElement(MIN_PRICE, MAX_PRICE),

