var APP  = (function (app) {

    app.ajax = app.ajax || {};

    var Request = function (params, cb, errb) {
        this.params = params;
        this.cb = cb;
        this.errb = errb;
    };

    Request.prototype.send = function () {
        var worker = new Worker('javascripts/sleep.js'),
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
                            color: _this.params.color
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
        return new Request(params, cb, errb).send();
    };

    return app;

})(APP || {});