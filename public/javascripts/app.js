var APP  = (function (app) {

    var randomColors = app.getRandomColorArray(5);

    var resultTag = null;

    var req = null;

    var _successCallback = function (data, xhr) {
        var payload = data.payload;
        var serverColor = payload.color,
            width = payload.width,
            height = payload.height;
        document.body.style.backgroundColor = serverColor;
        resultTag.innerHTML = width + "x" + height;
        req = null;
    };


    var _errorCallback = function (err, xhr) {
        req = null;
    };

    var _doRequest = function () {
        var currentRandomColor = app.getRandomArrayItem(randomColors);

        if(req) req.abort();

        req = app.ajax.post({
            color: currentRandomColor,
            height: window.innerHeight,
            width: window.innerWidth
        }, _successCallback, _errorCallback)

    };

    var _init = function() {
        resultTag = document.getElementById('result');
        window.onresize = app.debounce(function() {
            _doRequest();
        }, 1000);
    };

    window.onload = _init;

})(APP || {});