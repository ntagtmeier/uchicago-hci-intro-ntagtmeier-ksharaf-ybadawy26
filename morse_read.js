export const morse_read = (callback) => {
  var hammertime = new Hammer(window);
  var results = [];

  hammertime.on('tap', function () {
    results.push(0);
    if (results.length == 15) {
      finish();
    }
  });
  hammertime.on('press', function () {
    results.push(1);
    if (results.length == 15) {
      finish();
    }
  });
  const finish = () => {
    hammertime.off('tap');
    hammertime.off('press');
    console.log(results);
    hammertime.on('tap', () => {
      hammertime.destroy();
      callback();
    });
  };
};
