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
  var MAP_PIN_MAIN_WIDTH = 66;
  var MAP_PIN_MAIN_HEIGHT = 80;
  var adForm = document.querySelector('.ad-form');
  var fieldsetList = adForm.querySelectorAll('fieldset');
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');
  var fieldType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var inputRoomNumber = document.querySelector('#room_number');
  var inputCapacity = document.querySelector('#capacity');
  var inputCapacityOptionList = inputCapacity.querySelectorAll('option');
  var mapFilters = document.querySelector('.map__filters');
  var mapBlock = document.querySelector('.map');
  var pinList = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainDefaultX = mapPinMain.style.left;
  var mapPinMainDefaultY = mapPinMain.style.top;
  var inputAddress = document.querySelector('#address');
  var resetButton = document.querySelector('.ad-form__reset');


  // ----------------------------------------------
  var getErrorBlock = function () {
    var mainBlock = document.querySelector('main');
    var errorTamplate = document.querySelector('#error').content.querySelector('.error');
    mainBlock.appendChild(errorTamplate.cloneNode(true));

    var errorBlock = document.querySelector('.error');
    var removeErrorBlock = function () {
      mainBlock.removeChild(errorBlock);
    };

    errorBlock.addEventListener('click', function (evt) {
      evt.preventDefault();
      removeErrorBlock();
    });

    var onEscCloseErrorBlock = function (evt) {
      window.util.isEscEvent(evt, removeErrorBlock);
      document.removeEventListener('keydown', onEscCloseErrorBlock);
    };
    document.addEventListener('keydown', onEscCloseErrorBlock);
  };

  var getSuccessBlock = function () {
    var mainBlock = document.querySelector('main');
    var successTamplate = document.querySelector('#success').content.querySelector('.success');
    mainBlock.appendChild(successTamplate.cloneNode(true));

    var successBlock = document.querySelector('.success');
    var removeSuccessBlock = function () {
      mainBlock.removeChild(successBlock);
    };

    successBlock.addEventListener('click', function (evt) {
      evt.preventDefault();
      removeSuccessBlock();
    });

    var onEscCloseSuccessBlock = function (evt) {
      window.util.isEscEvent(evt, removeSuccessBlock);
      document.removeEventListener('keydown', onEscCloseSuccessBlock);
    };
    document.addEventListener('keydown', onEscCloseSuccessBlock);
  };

  // ----------------------------------------------
  var onSuccess = function () {
    returnDefaultView();
    getSuccessBlock();
  };

  var makeFieldsetDisabled = function (elementList) { // функция добавления элементам из коллекции атрибута disabled
    for (var i = 0; i < elementList.length; i++) {
      elementList[i].setAttribute('disabled', 'disabled');
    }
  };


  var setTime = function (evt) { // функция зависимости полей времени
    var select = evt.target === fieldTimeIn ? fieldTimeOut : fieldTimeIn;
    select.value = evt.target.value;
  };

  makeFieldsetDisabled(fieldsetList); // блокировка всех fieldset внутри формы ad-form

  var getMinPrice = function (house, placeType) { // функция получения минимальной цены, в зависимости от типа жилья
    var minPrice;
    for (var i = 0; i < placeType.length; i++) {
      if (house === placeType[i].house) {
        minPrice = placeType[i].minPrice;
      }
    }
    return minPrice;
  };

  var removeDisabled = function (node) {
    if (node.hasAttribute('disabled')) {
      node.removeAttribute('disabled');
    }
  };

  var returnDefaultView = function () {
    adForm.reset();
    mapBlock.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('ad-form--disabled');
    for (var i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].disabled = true;
    }
    var mapPins = document.querySelectorAll('.map__pin');
    for (var j = 0; j < mapPins.length; j++) {
      if (!mapPins[j].classList.contains('map__pin--main')) {
        pinList.removeChild(mapPins[j]);
      }
    }
    mapPinMain.style.left = mapPinMainDefaultX;
    mapPinMain.style.top = mapPinMainDefaultY;
    inputAddress.setAttribute('value', (parseInt(mapPinMain.style.left, 10) + parseInt((MAP_PIN_MAIN_WIDTH / 2), 10)) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT));
  };

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    returnDefaultView();
  });

  fieldType.addEventListener('change', function () { // изменить тип жилья
    inputPrice.min = getMinPrice(fieldType.value, window.util.PLACE_TYPE);
    inputPrice.placeholder = getMinPrice(fieldType.value, window.util.PLACE_TYPE);
  });

  fieldTimeIn.addEventListener('change', function (evt) { // обработчик измененения времени въезда, изменяющий время выезда
    setTime(evt);
  });
  fieldTimeOut.addEventListener('change', function (evt) { // обработчик измененения времени выезда, изменяющий время въезда
    setTime(evt);
  });

  inputRoomNumber.addEventListener('change', function () {
    if (inputRoomNumber.value === '1') {
      inputCapacityOptionList.forEach(function (it) {
        if (it.value === '1') {
          removeDisabled(it);
          it.selected = true;
        } else {
          it.disabled = true;
        }
      });
    } else if (inputRoomNumber.value === '2') {
      inputCapacityOptionList.forEach(function (it) {
        if (it.value === '1') {
          removeDisabled(it);
        } else if (it.value === '2') {
          removeDisabled(it);
          it.selected = true;
        } else {
          it.disabled = true;
        }
      });
    } else if (inputRoomNumber.value === '3') {
      inputCapacityOptionList.forEach(function (it) {
        if (it.value === '1') {
          removeDisabled(it);
        } else if (it.value === '2') {
          removeDisabled(it);
        } else if (it.value === '3') {
          removeDisabled(it);
          it.selected = true;
        } else {
          it.disabled = true;
        }
      });
    } else if (inputRoomNumber.value === '100') {
      inputCapacityOptionList.forEach(function (it) {
        if (it.value === '0') {
          removeDisabled(it);
          it.selected = true;
        } else {
          it.disabled = true;
        }
      });
    }
  });

  onSuccess();

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upLoad(new FormData(adForm), onSuccess, getErrorBlock);
  });

})();



'use strict';

(function () {
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  window.upLoad = function (data, upLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        upLoad();
      } else {
        onError();
      }
    });

    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  };
})();
