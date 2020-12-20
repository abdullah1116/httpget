const down = require('./download');
const data = {
  totalCount: process.argv[2] ? process.argv[2] : 3,
  loopCount: [],
  logText: '',
};

checkLoops();

function start(i) {
  data.loopCount[i] = 3;
  down(i, onEnd, onLoad);
}
function onEnd(i) {
  data.loopCount[i] = false;
  checkLoops();
}
function onLoad(i) {
  data.loopCount[i] = true;
  logs();
}
function checkLoops() {
  logs();

  for (let i = 0; i < data.totalCount; i++) {
    // global.loopCount.push(true);
    switch (data.loopCount[i]) {
      case true:
        break;

      default:
        start(i);
        break;
    }
  }
  logs();
}
function logs() {
  //   process.stdout.write('\033c');

  let text = '';
  data.loopCount.forEach((v, i) => {
    text += v
      ? v == true
        ? `${i + 1} Loading\n`
        : `${i + 1} Connecting\n`
      : `${i + 1} Reconnecting\n`;
  });
  data.logText = text;
  //   console.log(text);
}
setInterval(() => {
  process.stdout.write('\033c');
  console.log(data.logText);
}, 500);
