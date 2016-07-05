var request = require('browser-request');

var user;

exports.validate = function(callback) {

	var opts = {
		method: 'get',
		url: "https://jed.bz/auth/check.aspx",
		json: true,
		withCredentials: true
	};
	if (!user) {
		request(opts, function(err, resp, auth) {
			if (auth && auth.hasOwnProperty("userName")) {
				loadSocketServer(function() {
					user = auth;
					return callback(err, auth);
				});
			} else {
				user = null;
				return callback("Not logged in", null);
			}
		});
	} else {
		return callback(null, user);
	}
};

function loadSocketServer(callback) {
	if (!document.getElementById("socket")) {
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.id = "socket";
		s.src = "https://jed.bz/socket.io/socket.io.js";
		s.onload = function() {
			console.log("socket loaded");
			callback();
		}
		document.body.appendChild(s);
	} else {
		callback();
	}
}