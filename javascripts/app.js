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

    var _successCallback = function (data) {
        var serverColor = data.payload.color,
            size = data.payload.size;
        var indexOfCurrentRequest = requestList.indexOf(this);
        _deregisterAt(indexOfCurrentRequest);
        if(!_count()) {
            document.body.style.backgroundColor = serverColor;
            resultTag.innerHTML = size;
        }
    };

    var _errorCallback = function (err) {
        _deregisterAt(requestList.indexOf(this));
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