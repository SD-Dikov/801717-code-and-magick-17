'use strict';

var setupBlock = document.querySelector('.setup');
var dialogHandler = document.querySelector('.upload');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupBlock.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');


var setupBlockOpen = function () {
  setupBlock.classList.remove('hidden'); // открытие блока с настройками
};
var setupBlocClose = function () {
  setupBlock.classList.add('hidden'); // открытие блока с настройками
  setupBlock.removeAttribute('style');
};

setupOpen.addEventListener('click', function () { // открытие блока кликом
  setupBlockOpen();
});
setupOpen.addEventListener('keydown', function (evt) { // открытие блока клавиатурой при фокусе на иконке
  if (evt.keyCode === 13) {
    setupBlockOpen();
  }
});

setupClose.addEventListener('click', function () { // закрытие блока кликом
  setupBlocClose();
});
document.addEventListener('keydown', function (evt) { // закрытие блока "Esc"
  if (evt.keyCode === 27) {
    if (setupUserName !== document.activeElement) { // отсутствие возможности закрыть блок пр фокусе на поле ввода имени
      setupBlocClose();
    }
  }
});
setupClose.addEventListener('keydown', function (evt) { // закрытие блока клавиатурой при фокусе на кнопке "крестик"
  if (evt.keyCode === 13) {
    setupBlocClose();
  }
});


dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setupBlock.style.top = (setupBlock.offsetTop - shift.y) + 'px';
    setupBlock.style.left = (setupBlock.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (onClickPreventDefaultEvt) {
        onClickPreventDefaultEvt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
