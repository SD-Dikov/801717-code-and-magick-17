'use strict';

var setupBlock = document.querySelector('.setup');
var wizardList = document.querySelector('.setup-similar-list');
var setupSimilar = document.querySelector('.setup-similar');
var firstNameList = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNameList = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColorList = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorList = ['black', 'red', 'blue', 'yellow', 'green'];

setupBlock.classList.remove('hidden');

var getDataArray = function (firstNameArr, secondNameArr, firstColorArr, secondColorArr) {
  var dataArray = [];
  var randomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };
  for (var i = 0; i < 4; i++) {
    dataArray.push({
      name: firstNameArr[randomInteger(0, firstNameArr.length - 1)] + ' ' + secondNameArr[randomInteger(0, secondNameArr.length - 1)],
      coatColor: firstColorArr[randomInteger(0, firstColorArr.length - 1)],
      eyesColor: secondColorArr[randomInteger(0, secondColorArr.length - 1)]
    });
  }
  return dataArray;
};

var wizardDataArray = getDataArray(firstNameList, lastNameList, coatColorList, eyesColorList);

var getWizardElement = function (dataArray) {
  var wizardTamplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardElement = wizardTamplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = dataArray.name;
  wizardElement.querySelector('.wizard-coat').style.fill = dataArray.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = dataArray.eyesColor;
  return wizardElement;
};

var getFragment = function (dataArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataArray.length; i++) {
    fragment.appendChild(getWizardElement(dataArray[i]));
  }
  return fragment;
};

wizardList.appendChild(getFragment(wizardDataArray));

setupSimilar.classList.remove('hidden');
