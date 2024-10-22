export const gesture_read = (callback) => {
  var hammertime = new Hammer(window);
  var results = [];
  // Added swipe sensitivity adjustment
  hammertime.get('swipe').set({
    direction: Hammer.DIRECTION_ALL,  
    threshold: 10,  
    velocity: 0.2  
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
    hammertime.off('swipe');
    console.log('Gesture Sequence Completed:', results); // Log the final results
    hammertime.on('tap', () => {
      callback();
      hammertime.destroy();
    });
  };
};
