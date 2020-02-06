'use strict';
//  Количество объявлений
var NUMBER_OF_ADS = 8;
//  Всё содержимое объявления
var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];
var PRICE = {
  Min: 200,
  Max: 10000
};
var ROOMS = {
  Min: 1,
  Max: 5
};
var GUESTS = {
  Min: 1,
  Max: 10
};
var ADDRESS = {
  Max_1: 300,
  Max_2: 1000
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
  Min: 130,
  Max: 630
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
var getAdList = function (number) {
  return {
    author: {
      //  Случайная адресная строка для "avatar", число от 1-8 с ведущим 0 (адрес изображения не повторяетсся)
      avatar: 'img/avatars/user' + '0' + (number + 1) + '.png'
    },
    offer: {
      title: TITLE[getRandomNumber(TITLE.length - 1)],
      address: getRandomNumber(0, ADDRESS.Max_1) + ',' + getRandomNumber(0, ADDRESS.Max_2),
      price: getRandomNumber(PRICE.Min, PRICE.Min),
      type: TYPE_OF_HOUSING[getRandomNumber(TYPE_OF_HOUSING.length - 1)],
      rooms: getRandomNumber(ROOMS.Min, ROOMS.Max),
      guests: getRandomNumber(GUESTS.Min, GUESTS.Max),
      checkin: CHECKIN[getRandomNumber(CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomNumber(CHECKOUT.length - 1)],
      features: OPTIONS[getRandomNumber(OPTIONS.length - 1)],
      description: DESCRIPTION[getRandomNumber(DESCRIPTION.length - 1)],
      photos: PHOTOS[getRandomNumber(PHOTOS.length - 1)],

      //  "x": случайное число, координата x метки на карте, ограничено размерами блока, в котором перетаскивается метка.
      //  "y": случайное число, координата y метки на карте от 130 до 630 (в переменной: Y)
      location: {
        x: getRandomNumber(0, MAP_WIDTH) - PIN_WIDTH / 2 + 'px',
        y: getRandomNumber(coordinateY.Min, coordinateY.Max) - PIN_HEIGHT + 'px'
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
  var pinElement = pinTemplate.cloneNode(true);
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
listElement.appendChild(fragment);

mapElement.classList.remove('map--faded');
