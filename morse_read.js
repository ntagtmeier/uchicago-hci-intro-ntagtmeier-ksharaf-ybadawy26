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
    hammertime.destroy();
    console.log(results);
    var results_translated = [];
    var i = 0;
    while (i < results.length) {
      var word = '';
      while (word.length < 3) {
        word += results[i];
        i += 1;
      }
      switch (word) {
        case '111':
          results_translated.push('👍');
          break;
        case '110':
          results_translated.push('❤️');
          break;
        case '011':
          results_translated.push('😂');
          break;
        case '010':
          results_translated.push('😃');
          break;
        case '101':
          results_translated.push('😢');
          break;
        case '000':
          results_translated.push('😠');
          break;
        default:
          results_translated.push('?');
      }
    }
    var next_button = document.getElementById('done');
    next_button.innerHTML = results_translated.toString();
    console.log(results_translated.toString());
    next_button.hidden = false;
    next_button.onclick = () => {
      callback();
      next_button.hidden = true;
    };
  };
};
