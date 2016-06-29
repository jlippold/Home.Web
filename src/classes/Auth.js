var request = require('browser-request');

exports.validate = function(callback) {
	var opts = {
		method: 'get',
		url: "https://jed.bz/auth/check.aspx",
		json: true
	};

	request(opts, function(err, resp, user) {
		if (user && user.hasOwnProperty("userName")) {
			return callback(err, user);
		} else {
			return callback("Not logged in", null);
		}
	});
};