import React from 'react';
import ReactDOM from 'react-dom';
import ListItems from '../views/ListItems';
import Motion from './Motion';

import {
	MainMenu
} from './MainMenu';



export class Page {
	constructor() {

	}

	back() {

		var history = this.getHistory();
		var lastItem = history.pop();
		lastItem = history.pop();
		this.saveHistory(history);
		this.steer(lastItem, true);
	}

	steer(nav, isBack) {

		document.getElementById("loader").style.display = 'block';

		var p = this;

		if (nav && nav.hasOwnProperty("params")) {

			if (nav.params.page == "back") {
				return p.back();
			} else if (nav.params.page == "play") {
				//return p.playVideo(nav.params.file);
				return p.render(null, nav.params.file, nav, isBack);
			} else if (nav.params.page == "motion") {

				if (!nav.params.hasOwnProperty("date")) {
					var motion = new Motion.Menu();
					motion.generate(function(err, data) {
						p.render(err, data, nav, isBack);
					});
				} else {
					var motion = new Motion.Events(nav.params.date);
					motion.generate(function(err, data) {
						p.render(err, data, nav, isBack);
					});
				}
			}

		} else {
			var mainMenu = new MainMenu();
			this.data = mainMenu.generate(function(err, data) {
				p.render(err, data, nav, isBack);
			});
		}
	}

	addHistory(item) {
		var history = this.getHistory();
		history.push(item);
		this.saveHistory(history);
	}

	getHistory() {
		var history = localStorage.getItem("history");
		if (history) {
			return JSON.parse(history);
		} else {
			return [];
		}
	}

	saveHistory(history) {
		history = history || [];
		localStorage.setItem("history", JSON.stringify(history));
	}


	clearHistory() {
		localStorage.setItem("history", "[]");
	}

	render(err, data, nav, isBack) {
		if (nav && !isBack) {
			this.addHistory(nav);
		}

		if (data.hasOwnProperty("FilePath")) { //video file
			this.requestVideo(data, function() {
				//if (!err) {
				setTimeout(function() {
					ReactDOM.render(<ListItems data={data} />, document.getElementById('root'));
					document.getElementById("loader").style.display = 'none';
				}, 2000);
				//}
			});
		} else {
			ReactDOM.render(<ListItems data={data} />, document.getElementById('root'));
			document.getElementById("loader").style.display = 'none';
		}

	}

	requestVideo(file, callback) {

		var url = "https://jed.bz/camera/play.aspx?action=playRecorded"
		url += "&FileName=" + file.FilePath;
		url += "&offset=" + file.offset;
		url += "&mobile=1";

		var opts = {
			method: 'get',
			url: url
		};

		var request = require('browser-request');
		request(opts, callback);
	}
}