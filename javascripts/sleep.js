var randomDelay = Math.floor(Math.random()* 3 + 1000),
    sleep = function(miliseconds) {
        var startingTime = new Date().getTime();
        var stopTime = startingTime + miliseconds;
        while (stopTime >= new Date().getTime()) { }
    };
self.postMessage('READY');
sleep(randomDelay);
self.postMessage('COMPLETED');
