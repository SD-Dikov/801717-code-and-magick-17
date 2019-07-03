'use strict';

var setupBlock = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupBlock.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');
var wizardList = document.querySelector('.setup-similar-list');
var setupSimilar = document.querySelector('.setup-similar');
var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatInput = setupBlock.querySelector('input[name="coat-color"]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesInput = setupBlock.querySelector('input[name="eyes-color"]');
var setupFireball = document.querySelector('.setup-fireball-wrap');
var setupFireballImput = setupFireball.querySelector('input[name="fireball-color"]');
var firstNameList = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNameList = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColorList = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorList = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColorList = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizardListLenght = 4; // длинна массива в задании

var randomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}; // функция получения случайного числа в диапазоне

var setupBlockOpen = function () {
  setupBlock.classList.remove('hidden'); // открытие блока с настройками
};
var setupBlocClose = function () {
  setupBlock.classList.add('hidden'); // открытие блока с настройками
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

wizardCoat.addEventListener('click', function () { // изменение цвета и внесение его в значение скрытого поля по клику
  var randomCoatColor = coatColorList[randomInteger(0, coatColorList.length - 1)];
  wizardCoat.style.fill = randomCoatColor;
  wizardCoatInput.value = randomCoatColor;
});
wizardEyes.addEventListener('click', function () { // изменение цвета и внесение его в значение скрытого поля по клику
  var randomEyesColor = eyesColorList[randomInteger(0, eyesColorList.length - 1)];
  wizardEyes.style.fill = randomEyesColor;
  wizardEyesInput.value = randomEyesColor;
});
setupFireball.addEventListener('click', function () { // изменение цвета и внесение его в значение скрытого поля по клику
  var randomFireballColor = fireballColorList[randomInteger(0, fireballColorList.length - 1)];
  setupFireball.style.background = randomFireballColor;
  setupFireballImput.value = randomFireballColor;
});

var getDataArray = function (firstNameArr, secondNameArr, firstColorArr, secondColorArr, arrLenght) { // функция генерирующая JS объекты, которые описывают похожих персонажей
  var dataArray = [];

  for (var i = 0; i < arrLenght; i++) { // исправил 4ку в условии выхода на переменную для дополнительной универсальности функции
    dataArray.push({
      name: firstNameArr[randomInteger(0, firstNameArr.length - 1)] + ' ' + secondNameArr[randomInteger(0, secondNameArr.length - 1)],
      coatColor: firstColorArr[randomInteger(0, firstColorArr.length - 1)],
      eyesColor: secondColorArr[randomInteger(0, secondColorArr.length - 1)]
    });
  }
  return dataArray;
};

var wizardDataArray = getDataArray(firstNameList, lastNameList, coatColorList, eyesColorList, wizardListLenght);

var getWizardElement = function (dataArray) { // функция создающая елемент по шаблону, и наполняющая его данными
  var wizardTamplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardElement = wizardTamplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = dataArray.name;
  wizardElement.querySelector('.wizard-coat').style.fill = dataArray.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = dataArray.eyesColor;
  return wizardElement;
};

var getFragment = function (dataArray) { // функция создающая фрагмент, и наполняющая его элементами
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataArray.length; i++) {
    fragment.appendChild(getWizardElement(dataArray[i]));
  }
  return fragment;
};

wizardList.appendChild(getFragment(wizardDataArray)); // добавление фрагмента в разметку

setupSimilar.classList.remove('hidden'); // "открытие" блока с персонажами
