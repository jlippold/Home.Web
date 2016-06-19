var request = require('browser-request');
import general from "./general"

class Menu {

	generate(callback) {

		var opts = {
			method: 'get',
			url: "https://jed.bz/camera/events.aspx",
			json: true
		};

		request(opts, function(err, resp, json) {

			if (err) {
				return callback(err);
			}
			var items = json.map(item => {
				return {
					title: item.date,
					icon: "calendar",
					params: {
						page: "motion",
						date: item.log
					}
				}
			});

			return callback(err, general.createListArray().concat(items));
		});


	}
}

class Events {

	constructor(dt) {
		this.dt = dt;
	}

	generate(callback) {

		var opts = {
			method: 'get',
			url: "https://jed.bz/camera/events.aspx?DT=" + this.dt,
			json: true
		};

		request(opts, function(err, resp, json) {

			if (err) {
				return callback(err);
			}
			var items = json.map(item => {
				return {
					title: item.TimeRecorded,
					subTitle: item.CamName + " " + item.DateRecorded,
					icon: "play",
					params: {
						page: "play",
						file: item
					}
				}
			});

			return callback(err, general.createListArray().concat(items));
		});


	}
}

exports.Menu = Menu;
exports.Events = Events;