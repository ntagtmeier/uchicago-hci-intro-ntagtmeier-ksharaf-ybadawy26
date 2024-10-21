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
    hammertime.off('swipe');
    console.log(results);
    hammertime.on('tap', () => {
      callback();
      hammertime.destroy();
    });
  };
};
