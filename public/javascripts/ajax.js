var APP  = (function (app) {

    app.ajax = app.ajax || {};

    app.ajax.post = function (params, cb, errb) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', app.config.ECHO_SERVER_REMOTE_URL, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                cb(JSON.parse(xhr.responseText), xhr);
            }
            if (xhr.status != 200) {
                errb(xhr);
            }
        };

        xhr.send(JSON.stringify(params));

        return xhr;
    };

    return app;

})(APP || {});