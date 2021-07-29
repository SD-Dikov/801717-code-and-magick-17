'use strict';
(function () {
  var MAP_PIN_MAIN_WIDTH = 66;
  var MAP_PIN_MAIN_HEIGHT = 80;
  var Y_TOP_BORDER = 130;
  var Y_BOTTOM_BORDER = 630;
  var X_LEFT_BORDER = 0;
  var X_RIGHT_BORDER = 1200;
  var dataList = [];
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var inputAddress = document.querySelector('#address');
  var mapBlock = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetList = document.querySelectorAll('fieldset');
  var pinList = document.querySelector('.map__pins');
  var housingTypeFilter = document.querySelector('#housing-type');

  var renderPins = function (data) {
    pinList.appendChild(window.pins.getPinsFragment(window.pins.getPinList(data)));
  };

  var renderCard = function (data, index) {
    mapBlock.insertBefore(window.cards.getCardsFragment(window.cards.getCardElement(data[index])), document.querySelector('.map__filters-container'));
  };

  var getErrorBlock = function () {
    var mainBlock = document.querySelector('main');
    var errorTamplate = document.querySelector('#error').content.querySelector('.error__message');
    var errorBlock = errorTamplate.cloneNode(true);
    mainBlock.appendChild(errorBlock);
  };

  var makeFieldsetAnabled = function (elementList) { // функция удаления элементам из коллекции атрибута disabled
    for (var i = 0; i < elementList.length; i++) {
      elementList[i].removeAttribute('disabled', 'disabled');
    }
  };

  var openPopup = function () {
    mapBlock.addEventListener('click', function (evt) {
      var mapBlockChildren = mapBlock.children;
      var target = evt.target;
      while (!target.classList.contains('map')) {
        if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
          for (var i = 0; i < mapBlockChildren.length; i++) {
            if (mapBlockChildren[i].classList.contains('map__card')) {
              closePopup();
            }
          }
          renderCard(dataList, target.name);
          var popupCloseButton = document.querySelector('.popup__close');
          popupCloseButton.addEventListener('click', function () { // закрытие блока кликом
            closePopup();
          });
        }
        target = target.parentNode;
      }
    });
  };

  var closePopup = function () {
    mapBlock.removeChild(document.querySelector('.map__card'));
  };

  var onSuccess = function (data) {
    renderPins(data);
    dataList = data;
    openPopup();
  };

  housingTypeFilter.addEventListener('change', function () {
    var delPins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < delPins.length; i++) {
      if (!delPins[i].classList.contains('map__pin--main')) {
        pinList.removeChild(delPins[i]);
      }
    }
    renderPins(dataList);
  });

  inputAddress.setAttribute('value', (parseInt(mapPinMain.style.left, 10) + parseInt((MAP_PIN_MAIN_WIDTH / 2), 10)) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT)); // внесение координат конца метки в поле адреса

  mapFilters.classList.add('ad-form--disabled'); // добавление mapFilters класса ad-form--disabled

  mapPinMain.addEventListener('mousedown', function (evt) { // отслеживание нажатия кнопки мыши
    evt.preventDefault();

    if (mapBlock.classList.contains('map--faded')) { // условие ограничивающее повление меток при каждом нажатии
      window.load(onSuccess, getErrorBlock); // добавление созданного фрагмента в разметку
      // ------
      // renderCard(dataList); // массив не успевает получить данные и функция срабатывает со второго раза, но в дальнейшем эта  функция будет вызываться по щелчку по пинам
      // ------
    }

    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('ad-form--disabled');
    makeFieldsetAnabled(fieldsetList);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) { // отслеживание премещения мыши
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      if (parseInt(mapPinMain.style.top, 10) <= (Y_TOP_BORDER - MAP_PIN_MAIN_HEIGHT)) { // условие ограничивающее поле перемещения
        mapPinMain.style.top = (Y_TOP_BORDER - MAP_PIN_MAIN_HEIGHT) + 'px';
      } else if (parseInt(mapPinMain.style.top, 10) >= Y_BOTTOM_BORDER) {
        mapPinMain.style.top = Y_BOTTOM_BORDER + 'px';
      }
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      if (parseInt(mapPinMain.style.left, 10) <= (X_LEFT_BORDER - (MAP_PIN_MAIN_WIDTH / 2))) { // условие ограничивающее поле перемещения
        mapPinMain.style.left = (X_LEFT_BORDER - (MAP_PIN_MAIN_WIDTH / 2)) + 'px';
      } else if (parseInt(mapPinMain.style.left, 10) >= X_RIGHT_BORDER - (MAP_PIN_MAIN_WIDTH / 2)) {
        mapPinMain.style.left = (X_RIGHT_BORDER - (MAP_PIN_MAIN_WIDTH / 2)) + 'px';
      }

      inputAddress.setAttribute('value', (parseInt(mapPinMain.style.left, 10) + parseInt((MAP_PIN_MAIN_WIDTH / 2), 10)) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT)); // внесение координат конца метки в поле адреса
    };
    var onMouseUp = function (upEvt) { // отслеживание отпускания кнопки мыши
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  document.addEventListener('keydown', function (evt) { // закрытие блока "Esc"
    window.util.isEscEvent(evt, closePopup);
  });
})();






'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    PLACE_TYPE: [{house: 'bungalo', minPrice: 0}, {house: 'flat', minPrice: 1000}, {house: 'house', minPrice: 5000}, {house: 'palace', minPrice: 10000}],

    isEscEvent: function (evt, action) {
      evt.preventDefault();
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
  };
})();




'use strict';

(function () {
  var PinSize = {
    X: 50,
    Y: 70
  };
  var PINS_QUANTITY = 5;
  var housingTypeFilter = document.querySelector('#housing-type');

  window.pins = {

    getPinList: function (dataList) { // функция создания метки на основе шаблона и заполнения ее данными
      var numberedDataList = dataList;
      dataList.forEach(function (it, i) {
        numberedDataList[i].dataListIndex = i;
      });
      var filteredDataList;
      if (housingTypeFilter.value !== 'any') {
        filteredDataList = numberedDataList.filter(function (it) {
          return it.offer.type === housingTypeFilter.value;
        });
      } else {
        filteredDataList = numberedDataList;
      }
      var pinElements = [];
      for (var i = 0; i < filteredDataList.length; i++) {
        var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');
        var pinElement = pinTamplate.cloneNode(true);
        pinElement.style.left = filteredDataList[i].location.x - (PinSize.X / 2) + 'px';
        pinElement.style.top = filteredDataList[i].location.y - PinSize.Y + 'px';
        pinElement.name = filteredDataList[i].dataListIndex;
        pinElement.querySelector('img').src = filteredDataList[i].author.avatar;
        pinElement.querySelector('img').alt = filteredDataList[i].offer.title;
        pinElements.push(pinElement);
      }
      return pinElements;
    },
    getPinsFragment: function (pinsList) { // функция создания фрагмента, состоящего из заполненных данными шаблонов меток
      var pinsFragment = document.createDocumentFragment();
      var pinsOnMap;
      if (pinsList.length < PINS_QUANTITY) {
        pinsOnMap = pinsList.slice();
      } else {
        pinsOnMap = pinsList.slice(PINS_QUANTITY);
      }
      for (var i = 0; i < pinsOnMap.length; i++) { // цикл, на каждой итерации которого, вызывается функция создания метки на основе шаблона и заполнения ее данными, количество циклов ограниченно длиной массива с данными
        pinsFragment.appendChild(pinsOnMap[i]);
      }
      return pinsFragment;
    }
  };
})();




'use strict';

(function () {

  var houseTypeDictionary = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  window.cards = {
    getCardElement: function (dataObject) {
      var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
      var cardPhotoTamplate = document.querySelector('#card').content.querySelector('.popup__photo');
      var cardElement = cardTemplate.cloneNode(true);
      var cardPhotoElement = cardPhotoTamplate.cloneNode(true);
      cardElement.querySelector('.popup__avatar').src = dataObject.author.avatar;
      cardElement.querySelector('.popup__title').textContent = dataObject.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = dataObject.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = dataObject.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = houseTypeDictionary[dataObject.offer.type];
      cardElement.querySelector('.popup__text--capacity').textContent = dataObject.offer.rooms + ' комнаты для ' + dataObject.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataObject.offer.checkin + ', выезд до ' + dataObject.offer.checkout;


      cardElement.querySelectorAll('.popup__feature').forEach(function (it) { // удаление всех пунктов списка из шаблона
        cardElement.querySelector('.popup__features').removeChild(it);
      });
      dataObject.offer.features.forEach(function (it) { // добавление необходимого количество пунктов списка на основе данных
        var popupFeature = document.createElement('li');
        popupFeature.style = 'margin-right: 3px';
        popupFeature.classList.add('popup__feature');
        popupFeature.classList.add('popup__feature--' + it);
        cardElement.querySelector('.popup__features').appendChild(popupFeature);
      });


      cardElement.querySelector('.popup__description').textContent = dataObject.offer.description;
      cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));

      dataObject.offer.photos.forEach(function (it) { // добавления фото на основе шаблона и данных (Не могу понять, почему добавляется только одино фото)
        cardPhotoElement.src = it;
        cardElement.querySelector('.popup__photos').appendChild(cardPhotoElement);
      });

      return cardElement;
    },
    getCardsFragment: function (card) {
      var cardsFragment = document.createDocumentFragment();
      cardsFragment.appendChild(card);
      return cardsFragment;
    }
  };
})();
