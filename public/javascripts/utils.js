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

    app.debounce = function(f, ms) {
        var state = null;

        var COOLDOWN = 1;

        return function() {
            if (state) return;

            f.apply(this, arguments);

            state = COOLDOWN;

            setTimeout(function() { state = null }, ms);
        }
    }

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