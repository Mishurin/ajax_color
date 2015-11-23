var APP  = (function (app) {

	var config = app.config = app.config || {};

	config.ECHO_SERVER_REMOTE_URL = 'https://http-echo-server.herokuapp.com';

	return app;

})(APP || {});