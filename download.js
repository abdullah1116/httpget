const download = (i = undefined, onEnd, onLoad) => {
  const path = process.argv[3]
    ? process.argv[3]
    : `https://raw.githubusercontent.com/BitDoctor/speed-test-file/master/1mb.txt`;

  const http = require(path.slice(0, 5) == `https` ? 'https' : 'http');
  http
    .get(path, (resp) => {
      let onData = () => {
        onLoad(i);
        onData = () => {};
      };
      resp.on('data', () => onData());

      // resp.on('connect', () => {
      //   onLoad(i);
      // });
      resp.on('end', () => {
        onEnd(i);
      });
    })
    .on('error', () => {
      onEnd(i);
    });
};
module.exports = download;
