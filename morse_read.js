export const morse_read = (callback) => {
  var hammertime = new Hammer(window);
  var results = [];

  hammertime.on('tap', function () {
    console.log('Tap detected'); // Log each tap
    results.push(0);
    console.log(`Current Morse Sequence: ${results.join(', ')}`);
    if (results.length == 15) {
      finish();
    }
  });

  hammertime.on('press', function () {
    console.log('Press detected'); // Log each press
    results.push(1);
    console.log(`Current Morse Sequence: ${results.join(', ')}`);
    if (results.length == 15) {
      finish();
    }
  });

  const finish = () => {
    hammertime.off('tap');
    hammertime.off('press');
    console.log('Morse Code Sequence Completed:', results); // Log the final results
    hammertime.on('tap', () => {
      hammertime.destroy();
      callback();
    });
  };
};
