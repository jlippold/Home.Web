import React from 'react';
import ReactDOM from 'react-dom';
import ListItems from '../views/ListItems';
import LiveCams from '../views/LiveCams';
import Motion from './Motion';
import Saved from './Saved';
import Recordings from './Recordings';

import {
	MainMenu
} from './MainMenu';

export class Page {

	steer(nav, back) {

		document.getElementById("loader").style.display = 'block';

		var p = this;

		if (nav && nav.hasOwnProperty("params")) {
			
			if (nav.params.page == "back") {
				return window.history.go(-1);
			} else if (nav.params.page == "play") {
				p.render(null, nav.params.file, nav, back);
			} else if (nav.params.page == "saved") {
				var saved = new Saved.Events();
				saved.generate(function(err, data) {
					p.render(err, data, nav, back);
				});
			} else if (nav.params.page == "recordings") {
				if (nav.params.hasOwnProperty("date") && nav.params.hasOwnProperty("hour")) {
					var recordings = new Recordings.Events(nav.params.date, nav.params.hour);
					recordings.generate(function(err, data) {
						p.render(err, data, nav, back);
					});
				} else if (nav.params.hasOwnProperty("date")) {
					var recordings = new Recordings.Hours(nav.params.date);
					recordings.generate(function(err, data) {
						p.render(err, data, nav, back);
					});
				} else {
					var recordings = new Recordings.Menu();
					recordings.generate(function(err, data) {
						p.render(err, data, nav, back);
					});
				}

			} else if (nav.params.page == "motion") {
				if (!nav.params.hasOwnProperty("date")) {
					var motion = new Motion.Menu();
					motion.generate(function(err, data) {
						p.render(err, data, nav, back);
					});
				} else {
					var motion = new Motion.Events(nav.params.date);
					motion.generate(function(err, data) {
						p.render(err, data, nav, back);
					});
				}
			} else if (nav.params.page == "live") {
				ReactDOM.render(<LiveCams />, document.getElementById('root'));
			}

		} else {
			nav = {};
			var mainMenu = new MainMenu();
			this.data = mainMenu.generate(function(err, data) {
				p.render(err, data, nav, back);
			});
		}


	}

	render(err, data, nav, back) {
		var p = this
		if (data.hasOwnProperty("FilePath")) { //video file
			p.requestVideo(data, function() {
				setTimeout(function() {
					ReactDOM.render(<ListItems data={data} />, document.getElementById('root'));
					p.finalizeView(nav, back);
				}, 2000);
			});
		} else {
			ReactDOM.render(<ListItems data={data} />, document.getElementById('root'));
			p.finalizeView(nav, back);
		}
	}

	finalizeView(nav, back) {

		if (!back) {
			localStorage.setItem("scrollTop", document.documentElement.scrollTop);
			history.pushState(nav, "", "");
		}

		if (back) {
			window.scrollTo(0, localStorage.getItem("scrollTop"));
			localStorage.setItem("scrollTop", 1);
		} else {
			window.scrollTo(0, 1);
		}

		document.getElementById("loader").style.display = 'none';
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

window.addEventListener('popstate', function(e) {
	var page = new Page();
	page.steer(e.state, true);
});