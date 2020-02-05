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
var ROOMS = {
  MIN: 1,
  MAX: 5
};
var GUESTS = {
  MIN: 1,
  MAX: 10
};
var ADDRESS = {
  MAX1: 300,
  MAX2: 1111
};
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

//  Размер карты
var MAP_WIDTH = 1200;

//  Размеры метки
var PIN_WIDTH = 100;
var PIN_HEIGHT = 100;

//  Координаты метки
var Y = {
  MIN: 130,
  MAX: 630
};

//  Метка объявления
var mapElement = document.querySelector('.map');
var ListElement = document.querySelector('.map__pins');
var PinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

//  Функция выбора случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
