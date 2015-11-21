var APP  = (function (app) {

    var requestList = [];
    var randomColors = app.getRandomColorArray(5);

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
        var serverColor = data.payload.color;
        var indexOfCurrentRequest = requestList.indexOf(this);
        _deregisterAt(indexOfCurrentRequest);
        if(!_count()) {
            document.body.style.backgroundColor = serverColor;
        }
    };

    var _errorCallback = function (err) {
        _deregisterAt(requestList.indexOf(this));
    };

    var _doRequest = function () {
        var currentRandomColor = app.getRandomArrayItem(randomColors);
        
        _register(app.ajax.post({
            color: currentRandomColor
        }, _successCallback, _errorCallback));

    };

    var _init = function() {
        window.onresize = app.throttle(function() {
            _doRequest();
        }, 1000);
    };

    window.onload = _init;
})(APP || {});