'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            console.log(xhr.response);
            break;
          default: console.error();
        }
      });

      xhr.open('GET', URL);
      xhr.send();
    },

    save: function () {

    }
  };
  window.backend.load();
})();
