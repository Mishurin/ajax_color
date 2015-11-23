var APP  = (function (app) {

    var requestList = [];

    var randomColors = app.getRandomColorArray(5);

    var resultTag = null;

    var _register = function(obj){
        return requestList.push(obj);
    };

    var _count = function(){
        return requestList.length;
    };

    var _deregisterAt = function(index){
        requestList.splice(index, 1);
    };

    var _successCallback = function (data, xhr) {
        var payload = data.payload;
        var serverColor = payload.color,
            width = payload.width,
            height = payload.height;
        var indexOfCurrentRequest = requestList.indexOf(xhr);
        _deregisterAt(indexOfCurrentRequest);
        if(!_count()) {
            document.body.style.backgroundColor = serverColor;
            resultTag.innerHTML = width + "x" + height;
        }
    };

    var _errorCallback = function (err, xhr) {
        _deregisterAt(requestList.indexOf(xhr));
    };

    var _doRequest = function () {
        var currentRandomColor = app.getRandomArrayItem(randomColors);
        
        _register(app.ajax.post({
            color: currentRandomColor,
            height: window.innerHeight,
            width: window.innerWidth
        }, _successCallback, _errorCallback));

    };

    var _init = function() {
        resultTag = document.getElementById('result');
        window.onresize = app.throttle(function() {
            _doRequest();
        }, 1000);
    };

    window.onload = _init;

})(APP || {});