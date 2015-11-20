var APP  = (function (app) {

    app.ajax = app.ajax || {};

    app.ajax.post = function (payload, cb, errb) {

        var worker = new Worker('javascripts/sleep.js');
        worker.addEventListener('message', function (e) {
            switch (e.data) {
                case 'READY':
                    console.log('Loading...');
                    break;
                case 'COMPLETED':
                    console.log('OK');
                    cb(payload);
                    worker.terminate();
                    break;
                case 'ERROR':
                    console.log('ERROR');
                    errb(e);
                    break;
                default:
                    console.log('UNCOVERED CASE');
            }
        });
    };

    return app;

})(APP || {});