'use strict';

var NUMBER_OF_ADS = 8;
var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];

var Prices = {
  MIN: 3000,
  MAX: 15000
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
var CoordinatesX = {
  MIN: 0,
  MAX: 1200
};

var CoordinatesY = {
  MIN: 130,
  MAX: 630
};

var typeApartments = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  palace: 'Дворец',
  house: 'Дом'
};

var Address = {
  MIN: 100,
  MAX: 1000
};

//  Метка объявления
var mapElement = document.querySelector('.map');
var listElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = mapElement.querySelector('.map__filters-container');
var fragment = document.createDocumentFragment();

//  Переменные к заданию 4 (часть 1)
var adForm = document.querySelector('.ad-form');
var elementForm = document.querySelectorAll('.ad-form__element');
var mapPinMain = mapElement.querySelector('.map__pin--main');
var mapFilters = mapElement.querySelector('.map__filters');
var X_OFFSET = 33;
var Y_OFFSET = 65;
var checkoutTime = document.querySelector('#timeout');
var checkinTime = document.querySelector('#timein');
var capacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');
var type = document.querySelector('#type');
var apartmenttPrice = document.querySelector('#price');

//  Функция выбора случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

//  Выбор случайного массива
var getRandomArray = function (array) {
  var newArray = array.slice(Math.floor(Math.random() * array.length - 1));
  return newArray;
};

//  Выбор случайного элемента
var getRandomElement = function (arrayElements) {
  return arrayElements[Math.floor(Math.random() * arrayElements.length)];
};

var renderFeatures = function (element, item) {
  element.innerHTML = '';

  item.forEach(function (features) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + features);
    element.appendChild(featureItem);
  });
};

var renderPhotos = function (element, item) {
  var photoItemTemplate = element.querySelector('img');
  element.innerHTML = '';

  item.forEach(function (photos) {
    var photoItem = photoItemTemplate.cloneNode(true);
    photoItem.src = photos;
    element.appendChild(photoItem);
  });
};

//  Функция создающая объекты в массиве
var getList = function (number) {
  var appartments = [];
  for (var i = 0; i < number; i++) {
    appartments.push({
      author: {
        //  Случайная адресная строка для "avatar", число от 1-8 с ведущим 0 (адрес изображения не повторяетсся)
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLE[getRandomNumber(0, TITLE.length - 1)],
        address: getRandomNumber(0, Address.MIN) + ', ' + getRandomNumber(0, Address.MAX),
        price: getRandomNumber(Prices.MIN, Prices.MAX),
        type: typeApartments[getRandomElement(TYPE_OF_HOUSING)],
        rooms: getRandomNumber(Rooms.MIN, Rooms.MAX),
        guests: getRandomNumber(Guests.MIN, Guests.MAX),
        checkin: CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
        features: getRandomArray(OPTIONS),
        description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)],
        photos: getRandomArray(PHOTOS),

        //  "x": случайное число, координата x метки на карте, ограничено размерами блока, в котором перетаскивается метка.
        //  "y": случайное число, координата y метки на карте от 130 до 630 (в переменной: Y)
        location: {
          x: getRandomNumber(CoordinatesX.MIN, CoordinatesX.MAX),
          y: getRandomNumber(CoordinatesY.MIN, CoordinatesY.MAX)
        }
      }
    }
    );
  }
  return appartments;
};

var pins = getList(NUMBER_OF_ADS);

var renderPin = function (pinData) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImgElement = pinElement.querySelector('img');

  pinElement.style.left = pinData.offer.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = pinData.offer.location.y - PIN_HEIGHT + 'px';
  pinImgElement.src = pinData.author.avatar;
  pinImgElement.alt = pinData.offer.title;

  return pinElement;
};

var renderCard = function (pinData) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardFeatures = cardElement.querySelector('.popup__features');
  var cardPhotos = cardElement.querySelector('.popup__photos');

  cardElement.querySelector('.popup__title').textContent = pinData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pinData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pinData.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = pinData.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = pinData.offer.rooms + ' комнаты для ' + pinData.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  renderFeatures(cardFeatures, pinData.offer.features);
  cardElement.querySelector('.popup__description').textContent = pinData.offer.description;
  cardElement.querySelector('.popup__avatar').src = pinData.author.avatar;
  renderPhotos(cardPhotos, pinData.offer.photos);

  return cardElement;
};

for (var i = 0; i < NUMBER_OF_ADS; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

//  Вставляет полученный DOM-элемент в блок .map перед блоком.map__filters-container
mapElement.insertBefore(fragment.appendChild(renderCard(pins[0])), mapFiltersContainer);

//  Задание 4
//  Функция включающая и отключющая форму
var enableForm = function (enable) {
  if (!enable) {
    elementForm.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    adForm.classList.add('ad-form--disabled');
  } else {
    elementForm.forEach(function (item) {
      item.removeAttribute('disabled');
      adForm.classList.remove('ad-form--disabled');
    });
  }
};

//  Функция автивирует или деактивирует страницу (enable - если true страница активируется, false - деактивируется)
var enableOrDisablePage = function (enable) {
  if (!enable) {
    enableForm(false);
    mapFilters.classList.add('map__filters--disabled');
    adForm.querySelector('#address').setAttribute('value', Math.floor((PIN_WIDTH + X_OFFSET) + (PIN_WIDTH / 2)) + ',' +
      Math.floor((PIN_HEIGHT + Y_OFFSET) + (PIN_HEIGHT / 2)));
  } else {
    mapFilters.classList.remove('map__filters--disabled');
    enableForm(true);
    listElement.appendChild(fragment);
    adForm.querySelector('#address').setAttribute('value', Math.floor(PIN_WIDTH + X_OFFSET) + ',' +
      Math.floor(PIN_HEIGHT + Y_OFFSET));
    mapElement.classList.remove('map--faded');
  }
  mapPinMain.removeEventListener('mousedown', mapPinMainActive);
  mapPinMain.removeEventListener('keydown', mapPinMainCoordinate);
};
enableOrDisablePage(false);

//  Функция которая активирует страницу при нажатии на основную кнопку мыши (обычно левая, указывается как "0")
var mapPinMainActive = function (evt) {
  if (evt.button === 0) {
    enableOrDisablePage(true);
  }
};

//  Функция которая активирует страницу при нажатии на клавишу "Enter"
var mapPinMainCoordinate = function (evt) {
  if (evt.key === 'Enter') {
    enableOrDisablePage(true);
  }
};

mapPinMain.addEventListener('mousedown', mapPinMainActive);
mapPinMain.addEventListener('keydown', mapPinMainCoordinate);

//  Валидация количества комнат и гостей
var roomGuestChangeHandler = function () {
  var RoomsForm = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var rooms = parseInt(roomNumber.value, 10);
  var guests = parseInt(capacity.value, 10);
  if ((RoomsForm[rooms].indexOf(guests)) === -1) {
    if (rooms < guests) {
      capacity.setCustomValidity('Увеличьте количество комнат для такого количества гостей');
    } else {
      capacity.setCustomValidity('Для такого количества комнат доступно только значение "не для гостей"');
    }
  } else {
    capacity.setCustomValidity('');
  }
};

roomNumber.addEventListener('change', roomGuestChangeHandler);
capacity.addEventListener('change', roomGuestChangeHandler);

//  Функция устанавливает зависимость между полями формы (время заезда и выезда)
var timesChangeHandler = function (evt) {
  var checkinIndexTime = checkinTime.selectedIndex;
  var checkoutIndexTime = checkoutTime.selectedIndex;
  if (evt.target.matches('#timein')) {
    checkoutTime.selectedIndex = checkinIndexTime;
  } else {
    checkinTime.selectedIndex = checkoutIndexTime;
  }
};

checkinTime.addEventListener('change', timesChangeHandler);
checkoutTime.addEventListener('change', timesChangeHandler);

//  Функция добавляет значение в атрибут 'min' в поле 'цена'
var setPrice = function (price) {
  apartmenttPrice.setAttribute('min', price);
  apartmenttPrice.setAttribute('placeholder', price);
};

//  Функция устанавливает зависимость поля  'цена' от  поля 'тип жилья'.
var apartmentPriceChangeHandler = function (evt) {
  var typeIndex = evt.target.selectedIndex;
  var PricesForm = {
    0: 0,
    1: 1000,
    2: 5000,
    3: 10000,
  };
  for (var j = 0; i < 4; i++) {
    if (typeIndex === j) {
      setPrice(PricesForm[j]);
    }
  }
};

type.addEventListener('change', apartmentPriceChangeHandler);
