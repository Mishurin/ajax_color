var APP  = (function (app) {

    var requestList = [];
    var randomColors = app.getRandomColorArray(5);

    var _add = function(obj){
        return requestList.push(obj);
    };

    var _count = function(){
        return requestList.length;
    };

    var _get = function(index){
        if(index > -1 && index < requestList.length){
            return requestList[index];
        }
    };

    var _indexOf = function(obj, startIndex){
        var i = startIndex;

        while(i < requestList.length){
            if(requestList === obj){
                return i;
            }
            i++;
        }
        return -1;
    };

    var _removeAt = function(index){
        requestList.splice(index, 1);
    };

    var _successCallback = function (payload) {
        document.body.style.backgroundColor = payload.color;
    };

    var _errorCallback = function (err) {
        console.log('Request Error:', err);
    };

    var _doRequest = function () {
        var currentRandomColor = app.getRandomArrayItem(randomColors);
        app.ajax.post({color: currentRandomColor}, _successCallback, _errorCallback);
        _add({
            color: currentRandomColor,
            date: new Date()
        });
    };

    var _init = function() {
        window.onresize = app.throttle(function() {
            _doRequest();
        }, 1000);

    };
    window.onload = _init;
})(APP || {});