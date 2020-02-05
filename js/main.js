'use strict';
//  Количество объявлений
var NUMBER_OF_ADS = 8;
//  Всё содержимое объявления
var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
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
  MAX_1: 300,
  MAX_2: 1111
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

//  Размер карты
var MAP_WIDTH = 1200;

//  Размеры метки
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

//  Координаты метки
var coordinateY = {
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

//  Функция создающая объекты в массиве
var getAdList = function () {
  return {
    author: {
    //  Случайная адресная строка для "avatar", число от 1-8 с ведущим 0 (адрес изображения не повторяетсся)
      avatar: 'img/avatars/user' + '0' + getRandomNumber(1, 8) + '.png'
    },
    offer: {
      title: TITLE[getRandomNumber(TITLE.length)],
      address: getRandomNumber(0, ADDRESS.MAX_1) + ',' + getRandomNumber(0, ADDRESS.MAX_2),
      price: getRandomNumber(PRICE.MIN, PRICE.MAX),
      type: TYPE_OF_HOUSING[getRandomNumber(TYPE_OF_HOUSING.length)],
      rooms: getRandomNumber(ROOMS.MIN, ROOMS.MAX),
      guests: getRandomNumber(GUESTS.MIN, GUESTS.MAX),
      checkin: CHECKIN[getRandomNumber(CHECKIN.length)],
      checkout: CHECKOUT[getRandomNumber(CHECKOUT.length)],
      features: OPTIONS[getRandomNumber(OPTIONS.length)],
      description: DESCRIPTION[getRandomNumber(DESCRIPTION.length)],
      photos: PHOTOS[getRandomNumber(PHOTOS.length)],

      //  "x": случайное число, координата x метки на карте, ограничено размерами блока, в котором перетаскивается метка.
      //  "y": случайное число, координата y метки на карте от 130 до 630 (в переменной: Y)
      location: {
        x: getRandomNumber(0, MAP_WIDTH) - PIN_WIDTH / 2 + 'px',
        y: getRandomNumber(coordinateY.MIN, coordinateY.MAX) - PIN_HEIGHT + 'px'
      }
    }
  };
};

//  Функция с пустым массивом, куда будут добавляться элементы
var getAdLists = function () {
  var adLists = [];

  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    adLists.push(getAdList(i));
  }

  return adLists;
};

var pins = getAdLists();

var renderPin = function (pinData) {
  var pinElement = PinTemplate.cloneNode(true);
  var pinImgElement = pinElement.querySelector('img');

  pinElement.style.left = pinData.offer.location.x;
  pinElement.style.top = pinData.offer.location.y;
  pinImgElement.src = pinData.author.avatar;
  pinImgElement.alt = pinData.offer.title;

  return pinElement;
};

for (var i = 0; i < NUMBER_OF_ADS; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
ListElement.appendChild(fragment);

mapElement.classList.remove('map--faded');
