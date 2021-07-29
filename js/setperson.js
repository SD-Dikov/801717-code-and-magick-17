var RoomNumber = {
  ONE_ROOM: '1',
  TWO_ROOMS: '2',
  THREE_ROOMS: '3',
  HUNDRED_ROOMS: '100'
};
var PersonNumber = {
  ZERO_PERSON: '0',
  ONE_PERSON: '1',
  TWO_PERSONS: '2',
  THREE_PERSONS: '3'
};

var fieldRoomNumber = document.querySelector('#room_number');
var fieldCapacity = document.querySelector('#capacity');
var capacityVariantList = fieldCapacity.querySelectorAll('option');




var setPersonNumber = function () {
  fieldRoomNumber.addEventListener('change', function () {
    removeDisabled(capacityVariantList);
    switch (fieldRoomNumber.value) {
      case RoomNumber.ONE_ROOM:
        capacityVariantList.forEach(function (it) {
          if (it.value === PersonNumber.ONE_PERSON) {
            it.selected = true;
          } else {
            it.disabled = true;
          }
        });
        break;
      case RoomNumber.TWO_ROOMS:
        capacityVariantList.forEach(function (it) {
          if (it.value === PersonNumber.ONE_PERSON) {
            it.disabled = false;
          } else if (it.value === PersonNumber.TWO_PERSONS) {
            it.selected = true;
          } else {
            it.disabled = true;
          }
        });
        break;
      case RoomNumber.THREE_ROOMS:
        capacityVariantList.forEach(function (it) {
          if (it.value === PersonNumber.THREE_PERSONS) {
            it.selected = true;
          } else if (it.value === PersonNumber.ZERO_PERSON) {
            it.disabled = true;
          }
        });
        break;
      case RoomNumber.HUNDRED_ROOMS:
        capacityVariantList.forEach(function (it) {
          if (it.value === PersonNumber.ZERO_PERSON) {
            it.selected = true;
          } else {
            it.disabled = true;
          }
        });
        break;
    }
  });
};
