var request = require('browser-request');
import general from "./general"
import moment from 'moment'

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

			json.sort(general.dynamicSort("-log"));

			var items = json.map(item => {
				return {
					title: moment(item.log, "YYYY-MM-DD").from(moment().format("YYYY-MM-DD")),
					subTitle: item.date,
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

			json.sort(general.dynamicSort("-EpochDateRecorded"));

			var json = json.filter(item => {
				var end = moment(item.FullDT, "MM/DD/YYYY h:mm a");
				var start = moment();
				return start.diff(end, "minutes") > 7;
			});

			var items = json.map(item => {
				var dt = moment(item.FullDT, "MM/DD/YYYY h:mm a");
				return {
					title: item.TimeRecorded + " " + item.CamName,
					subTitle: dt.fromNow() + ": " + item.DateRecorded,
					icon: "play",
					hasSaveIcon: true,
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