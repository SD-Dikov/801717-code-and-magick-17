'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var HISTOGRAM_HEIGHT_MAX = 150;
var HISTOGRAM_HEIGHT_MIN = 10;
var HISTOGRAM_WIDTH = 40;
var GAP_X = 50;
var GAP_Y = 15;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hangling';
  ctx.fillText(text, x, y);
};

var randBlueColor = function () {
  var r = Math.floor(Math.random() * (0));
  var g = Math.floor(Math.random() * (0));
  var b = Math.floor(Math.random() * (256));
  return '#' + r.toString(16) + g.toString(16) + b.toString(16);
};

var getMaxTime = function (times) {
  var maxTime = times[0];
  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }
  return maxTime;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  renderText(ctx, 'Ура вы победили!', CLOUD_X + GAP_X, CLOUD_Y + GAP_Y * 2);
  renderText(ctx, 'Список результатов:', CLOUD_X + GAP_X, CLOUD_Y + GAP_Y * 3);

  for (var i = 0; i < names.length; i++) {
    var maxTime = Math.floor(getMaxTime(times));
    var histogramHeight = (HISTOGRAM_HEIGHT_MAX * times[i]) / maxTime;
    var histogramX = CLOUD_X + GAP_X + (HISTOGRAM_WIDTH * i) + (GAP_X * i);
    ctx.fillText(names[i], histogramX, CLOUD_HEIGHT - GAP_Y);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = randBlueColor();
    }
    if (histogramHeight < HISTOGRAM_HEIGHT_MIN) {
      histogramHeight = HISTOGRAM_HEIGHT_MIN;
    }
    ctx.fillRect(histogramX, CLOUD_HEIGHT - (GAP_Y * 2) - histogramHeight, HISTOGRAM_WIDTH, histogramHeight);
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.floor(times[i]), histogramX, CLOUD_HEIGHT - (GAP_Y * 3) - histogramHeight);
  }
};
