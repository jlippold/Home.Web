var request = require('browser-request');
import general from "./general"

class Events {

	constructor(dt) {
		this.dt = dt;
	}

	generate(callback) {

		var opts = {
			method: 'get',
			url: "https://jed.bz/camera/recordings.aspx?action=list&type=saved",
			json: true
		};

		request(opts, function(err, resp, json) {

			if (err) {
				return callback(err);
			}
			var items = json.map(item => {
				return {
					title: item.TimeRecorded + " " + item.CamName,
					subTitle: item.DateRecorded,
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

exports.Events = Events;