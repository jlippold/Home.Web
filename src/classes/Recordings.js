var request = require('browser-request');
import general from "./general"
import moment from "moment"

class Menu {

	generate(callback) {

		var opts = {
			method: 'get',
			url: "https://jed.bz/camera/recordings.aspx?action=list&type=days",
			json: true
		};

		request(opts, function(err, resp, json) {

			if (err) {
				return callback(err);
			}
			var items = json.map(item => {
				return {
					title: item.CamDay,
					subTitle: moment(item.DrillTo, "MM/DD/YYYY").from( moment().format("YYYY-MM-DD") ),
					icon: "calendar",
					params: {
						page: "recordings",
						date: item.DrillTo
					}
				}
			});

			return callback(err, general.createListArray().concat(items));
		});


	}
}

class Hours {

	constructor(dt) {
		this.dt = dt;
	}

	generate(callback) {

		var opts = {
			method: 'get',
			url: "https://jed.bz/camera/recordings.aspx?action=list&type=hours&DT=" + this.dt,
			json: true
		};

		request(opts, function(err, resp, json) {

			if (err) {
				return callback(err);
			}
			var items = json.map(item => {
				return {
					title: item.CamHour,
					subTitle: moment(item.DrillTo + " " + item.CamHour, "MM/DD/YYYY hh:mm a").fromNow() + ": " + item.CamDay,
					icon: "calendar",
					params: {
						page: "recordings",
						hour: item.DrillToHour,
						date: item.DrillTo
					}
				}
			});

			items.reverse();

			return callback(err, general.createListArray().concat(items));
		});


	}
}

class Events {

	constructor(dt, hour) {
		this.dt = dt;
		this.hour = hour;
	}

	generate(callback) {

		var opts = {
			method: 'get',
			url: "https://jed.bz/camera/recordings.aspx?action=list&type=videos&cam=All&DT=" + this.dt + "&hour=" + this.hour,
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
					subTitle: dt.fromNow() + ", " + item.DateRecorded,
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
exports.Hours = Hours;
exports.Events = Events;