// encoding_pluses_f1
export function vibrate_emoticon(emoticon) {
    switch(emoticon) {
        case 'like': 
            navigator.vibrate([100, 50, 100, 50, 100]);
            break;
        case 'love': 
            navigator.vibrate([200, 100, 200, 100, 200]);
            break;
        case 'haha':
            navigator.vibrate([50, 30, 50, 30, 50]);
            break;
        case 'yay':
            navigator.vibrate([150, 50, 150, 50, 150]);
            break;
        case 'sad':
            navigator.vibrate([300, 100, 300, 100, 300]);
            break;
        case 'angry': 
            navigator.vibrate([100, 20, 100, 20, 100]);
            break;
        default:
            console.log('Invalid emoticon');
    }
}
