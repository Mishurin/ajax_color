var APP  = (function (app) {

    app.utils  = app.utils || {};

    app.throttle = function throttle(func, ms) {

        var isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {

            if (isThrottled) {
                savedArgs = arguments;
                savedThis = this;
                return;
            }

            func.apply(this, arguments);

            isThrottled = true;

            setTimeout(function() {
                isThrottled = false;
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    };

    app.debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function() {
            var last = new Date().getTime() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = new Date().getTime();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    };

    app.getRandomColor = function () {

        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    app.getRandomColorArray = function(len) {
        var res = [];
        while(len--) {
            res.push(app.getRandomColor());
        }
        return res;
    };

    app.getRandomArrayItem = function (arr) {
        return arr[Math.floor(Math.random()* arr.length)];
    };

    return app;

})(APP || {});