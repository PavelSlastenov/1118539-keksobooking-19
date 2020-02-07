'use strict';
//  Количество объявлений
var NUMBER_OF_ADS = 8;
//  Всё содержимое объявления
var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];

var Price = {
  MIN: 200,
  MAX: 10000
};

var Rooms = {
  MIN: 1,
  MAX: 5
};

var Guests = {
  MIN: 1,
  MAX: 10
};

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

//  Размеры метки
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

//  Координаты метки
var CoordinateX = {
  MIN: 0,
  MAX: 1200
};

var CoordinateY = {
  MIN: 130,
  MAX: 630
};

//  Метка объявления
var mapElement = document.querySelector('.map');
var listElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

//  Функция выбора случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

//  Функция создающая объекты в массиве
var getList = function (number) {
  var List = [];
  for (var i = 0; i < number; i++) {
    List.push({
      author: {
        //  Случайная адресная строка для "avatar", число от 1-8 с ведущим 0 (адрес изображения не повторяетсся)
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLE[getRandomNumber(TITLE.length - 1)],
        address: location.x + ', ' + location.y,
        price: getRandomNumber(Price.MIN, Price.MAX),
        type: TYPE_OF_HOUSING[getRandomNumber(TYPE_OF_HOUSING.length - 1)],
        rooms: getRandomNumber(Rooms.MIN, Rooms.MAX),
        guests: getRandomNumber(Guests.MIN, Guests.MAX),
        checkin: CHECKIN[getRandomNumber(CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandomNumber(CHECKOUT.length - 1)],
        features: OPTIONS[getRandomNumber(OPTIONS.length - 1)],
        description: DESCRIPTION[getRandomNumber(DESCRIPTION.length - 1)],
        photos: PHOTOS[getRandomNumber(PHOTOS.length - 1)],

        //  "x": случайное число, координата x метки на карте, ограничено размерами блока, в котором перетаскивается метка.
        //  "y": случайное число, координата y метки на карте от 130 до 630 (в переменной: Y)
        location: {
          x: getRandomNumber(CoordinateX),
          y: getRandomNumber(CoordinateY)
        }
      }
    }
    );

  }
  return List;
};

var pins = getList();

var renderPin = function () {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImgElement = pinElement.querySelector('img');

  pinElement.style.left = location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = location.y - PIN_HEIGHT + 'px';
  pinImgElement.src = avatar;
  pinImgElement.alt = title;

  return pinElement;
};

for (var i = 0; i < NUMBER_OF_ADS; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
listElement.appendChild(fragment);

mapElement.classList.remove('map--faded');
