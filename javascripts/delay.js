var randomDelay = Math.floor(Math.random()* 3 + 1000);
self.postMessage('READY');
var timer = setTimeout(function () {
    self.postMessage('COMPLETED');
    timer.clearTimeout();
}, randomDelay);

