import vimeoPlayer from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new vimeoPlayer(iframe);

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    localStorage.setItem('videoplayer-current-time', seconds);
  }, 1000)
);
const timeFrame = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(timeFrame || 0.1).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      break;
    default:
      break;
  }
});
console.log(typeof timeFrame);
