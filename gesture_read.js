export const gesture_read = (callback) => {
  var hammertime = new Hammer(window);
  var results = [];
  hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  hammertime.get('pinch').set({ enable: true });

  hammertime.on('swipeup', function () {
    results.push(0);
    if (results.length == 5) {
      finish();
    }
  });
  hammertime.on('swiperight', function () {
    results.push(1);
    if (results.length == 5) {
      finish();
    }
  });
  hammertime.on('swipedown', function () {
    results.push(2);
    if (results.length == 5) {
      finish();
    }
  });
  hammertime.on('swipeleft', function () {
    results.push(3);
    if (results.length == 5) {
      finish();
    }
  });
  hammertime.on('pinchin', function () {
    results.push(4);
    if (results.length == 5) {
      finish();
    }
  });
  hammertime.on('pinchout', function () {
    results.push(5);
    if (results.length == 5) {
      finish();
    }
  });
  const finish = () => {
    hammertime.destroy();
    console.log(results);
    var results_translated = [];
    for (let result of results) {
      switch (result) {
        case 0:
          results_translated.push('👍');
          break;
        case 1:
          results_translated.push('❤️');
          break;
        case 2:
          results_translated.push('😂');
          break;
        case 3:
          results_translated.push('😃');
          break;
        case 4:
          results_translated.push('😢');
          break;
        case 5:
          results_translated.push('😠');
          break;
        default:
          results_translated.push('?');
      }
    }
    var next_button = document.getElementById('done');
    next_button.innerHTML = results_translated.toString();
    next_button.hidden = false;
    next_button.onclick = () => {
      callback();
      next_button.hidden = true;
    };
  };
};
