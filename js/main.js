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
var adFormInput = adForm.querySelectorAll('input', 'select');
var mapPinMain = mapElement.querySelector('.map__pin--main');
var mapFilters = mapElement.querySelector('.map__filters');
var mapPinMainAdress = adForm.querySelector('input[name="address"]');
var selectType = adForm.querySelector('#type');
var selecTypePrice = adForm.querySelector('input[name="price"]');
var selectRoom = adForm.querySelector('#room_number');
var selectCapacity = adForm.querySelector('#capacity');
var adFormSubmit = adForm.querySelector('.ad-form__submit');

var elementTIme = adForm.querySelector('.ad-form__element--time');
var selectCheckIn = elementTIme.querySelector('#timein');
var selectCheckOut = elementTIme.querySelector('#timeout');

//  Массив для подстановки данных
var typeOfHousingPrice = {
  palace: '10000',
  flat: '1000',
  house: '5000',
  bungalo: '0'
};

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

listElement.appendChild(fragment);

//  mapElement.classList.remove('map--faded');
//  Вставляет полученный DOM-элемент в блок .map перед блоком.map__filters-container
mapElement.insertBefore(fragment.appendChild(renderCard(pins[0])), mapFiltersContainer);

//  Задание 4
//  Отключает форму
adForm.сlassList.add('ad-form--disabled');

//  Функция принимает массив и добавляет атрибут disabled
var adFormDisabled = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].disabled = true;
  }
};

//  Функция принимает массив и убирает атрибут disabled
var adFormEnabled = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].disabled = false;
  }
};

//  Блокирует все <input> и <select> формы .ad-form с помощью атрибута disabled
adFormDisabled(adFormInput);

//  Блокирует форму и форму с фильтрами
adForm.setAttribute('disabled', '');
mapFilters.setAttribute('disabled', '');

//  В зависимости от количества комнат, блокирует количество гостей
var onRoomSelectChange = function () {
  if (selectRoom.value === '1') {
    selectCapacity.options[0].setAttribute('disabled', '');
    selectCapacity.options[1].removeAttribute('disabled', '');
    selectCapacity.options[2].removeAttribute('disabled', '');
    selectCapacity.options[3].setAttribute('disabled', '');

  }
  if (selectRoom.value === '2') {
    selectCapacity.options[0].setAttribute('disabled', '');
    selectCapacity.options[1].removeAttribute('disabled', '');
    selectCapacity.options[2].removeAttribute('disabled', '');
    selectCapacity.options[3].setAttribute('disabled', '');
  }
  if (selectRoom.value === '3') {
    selectCapacity.options[0].removeAttribute('disabled', '');
    selectCapacity.options[1].removeAttribute('disabled', '');
    selectCapacity.options[2].removeAttribute('disabled', '');
    selectCapacity.options[3].setAttribute('disabled', '');
  }
  if (selectRoom.value === '100') {
    selectCapacity.options[0].setAttribute('disabled', '');
    selectCapacity.options[1].setAttribute('disabled', '');
    selectCapacity.options[2].setAttribute('disabled', '');
    selectCapacity.options[3].removeAttribute('disabled', '');
  }
};

//  Активация пина
var mapPinMainActive = function (evt) {
  if (evt.which === 1) {
    adForm.classList.remove('ad-form--disabled');
    adForm.removeAttribute('disabled', '');
    mapFilters.removeAttribute('disabled');
    // Возможно добавить отрисовку пина или как-то сделать единую функцию на открытие карты и отрисовку пина?
    adFormEnabled(adFormInput);
    // убираем обработчик кликов с mapPinMain
    mapPinMain.removeEventListener('mousedown', mapPinMainActive);
    onRoomSelectChange();
  }
};

//  Отрисовка координат пина
var mapPinMainCoordinate = function (evt) {
  if (evt.which === 1) {
    var pinX = Math.floor(evt.pageX + PIN_WIDTH / 2);
    var pinY = Math.floor(evt.pageY + PIN_HEIGHT / 2);
    mapPinMainAdress.value = pinX + ', ' + pinY;
    mapPinMainAdress.setAttribute('disabled', '');
    mapPinMain.removeEventListener('mousedown', mapPinMainCoordinate);
  }
};

var onTypeSelectChange = function () {
  var selectTypeValue = selectType.value;
  selecTypePrice.setAttribute('min', typeOfHousingPrice[selectTypeValue]);
  selecTypePrice.setAttribute('placeholder', typeOfHousingPrice[selectTypeValue]);
};

selecTypePrice.addEventListener('invalid', function () {
  if (selecTypePrice.validity.rangeOverflow) {
    selecTypePrice.setCustomValidity('Столько стоить не может');
  } else {
    selecTypePrice.setCustomValidity('');
  }
});

selectRoom.addEventListener('invalid', function () {
  // console.log('ошибка');
  if (selecTypePrice.validity.patternMismatch) {
    selecTypePrice.setCustomValidity('Выберите меньше гостей');
  } else {
    selecTypePrice.setCustomValidity('');
  }
});

var onCheckinSelectChange = function () {
  selectCheckOut.value = selectCheckIn.value;
};

var onCheckoutSelectChange = function () {
  selectCheckIn.value = selectCheckOut.value;
};

// Обработчики событий
mapPinMain.addEventListener('mousedown', mapPinMainActive);
mapPinMain.addEventListener('mousedown', mapPinMainCoordinate);
selectCheckIn.addEventListener('change', onCheckinSelectChange);
selectCheckOut.addEventListener('change', onCheckoutSelectChange);
selectRoom.addEventListener('change', onRoomSelectChange);
selectType.addEventListener('change', onTypeSelectChange);
adFormSubmit.addEventListener('click', onRoomSelectChange);
