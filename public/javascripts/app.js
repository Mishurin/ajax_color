var APP  = (function (app) {

    var randomColors = app.getRandomColorArray(5);

    var resultTag = null;


    var _successCallback = function (data, xhr) {
        var payload = data.payload;
        var serverColor = payload.color,
            width = payload.width,
            height = payload.height;
        document.body.style.backgroundColor = serverColor;
        resultTag.innerHTML = width + "x" + height;
    };


    var _errorCallback = function (err, xhr) {
        console.log(err, xhr);
    };

    var _doRequest = function () {

        var currentRandomColor = app.getRandomArrayItem(randomColors);


        app.ajax.post({
            color: currentRandomColor,
            height: window.innerHeight,
            width: window.innerWidth
        }, _successCallback, _errorCallback);

    };

    var _init = function() {
        resultTag = document.getElementById('result');
        window.onresize = app.debounce(function() {
            _doRequest();
        }, 1000);
    };

    window.onload = _init;

})(APP || {});