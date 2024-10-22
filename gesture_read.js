export const gesture_read = (callback) => {
  var hammertime = new Hammer(window);
  var results = [];
  // Added swipe sensitivity adjustment
  hammertime.get('swipe').set({
    direction: Hammer.DIRECTION_ALL,
    threshold: 10,
    velocity: 0.2,
  });
  hammertime.get('pinch').set({ enable: true });

  hammertime.on('swipeup', function () {
    console.log('Swipe Up detected'); // Log swipe
    results.push(0);
    console.log(`Current Gesture Sequence: ${results.join(', ')}`);
    if (results.length == 5) {
      finish();
    }
  });

  hammertime.on('swiperight', function () {
    console.log('Swipe Right detected');
    results.push(1);
    console.log(`Current Gesture Sequence: ${results.join(', ')}`);
    if (results.length == 5) {
      finish();
    }
  });

  hammertime.on('swipedown', function () {
    console.log('Swipe Down detected');
    results.push(2);
    console.log(`Current Gesture Sequence: ${results.join(', ')}`);
    if (results.length == 5) {
      finish();
    }
  });

  hammertime.on('swipeleft', function () {
    console.log('Swipe Left detected');
    results.push(3);
    console.log(`Current Gesture Sequence: ${results.join(', ')}`);
    if (results.length == 5) {
      finish();
    }
  });

  hammertime.on('pinchin', function () {
    console.log('Pinch In detected');
    results.push(4);
    console.log(`Current Gesture Sequence: ${results.join(', ')}`);
    if (results.length == 5) {
      finish();
    }
  });

  hammertime.on('pinchout', function () {
    console.log('Pinch Out detected');
    results.push(5);
    console.log(`Current Gesture Sequence: ${results.join(', ')}`);
    if (results.length == 5) {
      finish();
    }
  });

  const finish = () => {
    hammertime.destroy();
    console.log('Gesture Sequence Completed:', results); // Log the final results
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
