var APP  = (function (app) {

    app.ajax = app.ajax || {};

    var Request = function (params, cb, errb) {
        this.params = params;
        this.cb = cb;
        this.errb = errb;
    };

    Request.prototype.send = function () {
        var worker = new Worker('javascripts/delay.js'),
            _this = this;
        worker.addEventListener('message', function (e) {
            switch (e.data) {
                case 'READY':
                    console.log('Loading...');
                    break;
                case 'COMPLETED':
                    console.log('OK');
                    _this.cb({
                        payload: {
                            color: _this.params.color,
                            size: _this.params.width + ':' + _this.params.height
                        }
                    });
                    worker.terminate();
                    break;
                case 'ERROR':
                    console.log('ERROR');
                    _this.errb(e);
                    break;
                default:
                    console.log('UNCOVERED CASE');
            }
        });
        return this;
    };

    app.ajax.post = function (params, cb, errb) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', app.config.ECHO_SERVER_REMOTE_URL, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8; Access-Control-Allow-Origin: *');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                cb({payload: JSON.parse(xhr.responseText), xhr: xhr});
            }
            if (xhr.status != 200) {
                errb(xhr);
            }
        };
        return xhr.send(JSON.stringify(params));
    };

    return app;

})(APP || {});