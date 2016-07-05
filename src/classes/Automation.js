var request = require('browser-request');
import general from "./general"
import moment from 'moment'
import React from 'react';
import ReactDOM from 'react-dom';
import AutomationItems from '../views/AutomationItems';

var items = [];
var socket;

class Menu {

	generate(callback) {

		request({
			method: 'get',
			url: "https://jed.bz/home/api/refresh",
			withCredentials: true
		}, function(error, response, body) {
			if (error) {
				console.log(error);
			}
		});

		if (!socket) {
			socket = io.connect("https://jed.bz/");
			socket.on('devices', function(devices) {
				gotDevices(devices, callback);
			});

			socket.on('device', function(device) {
				items = items.map(function(item) {
					if (item.params.device.id == device.id) {
						item.params.device.status = device.status;
					}
					return item;
				});

				if (document.getElementById("automationMenu")) {
					var data = general.createListArray().concat(items);
					ReactDOM.render(<AutomationItems data={data} />, document.getElementById('root'));
				}
			});
		} else {
			var data = general.createListArray().concat(items);
			ReactDOM.render(<AutomationItems data={data} />, document.getElementById('root'));
		}

	}
}

exports.Menu = Menu;

function gotDevices(devices, callback) {

	Object.keys(devices).forEach(function(key) {
		var device = devices[key];
		device.id = key;
		var cssClass = "card-info";
		var icon = device.icon.replace("icon-", "");
		items.push({
			title: device.description,
			subTitle: device.group,
			icon: icon,
			params: {
				page: "toggle",
				device: device
			}
		});
	});

	return callback(null, general.createListArray().concat(items));
}