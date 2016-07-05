import React from 'react';
import ReactDOM from 'react-dom';
import ListItems from './views/ListItems';
import LiveCams from './views/LiveCams';
import Login from './views/Login';
import Motion from './classes/Motion';
import Saved from './classes/Saved';
import Automation from './classes/Automation';
import AutomationItems from './views/AutomationItems';
import Recordings from './classes/Recordings';
import auth from './classes/Auth';

import {
	MainMenu
} from './classes/MainMenu';

import {
	CamMenu
} from './classes/CamMenu';

export class Router {
	showLoader(show) {
		if (document.getElementById("loader")) {
			document.getElementById("loader").style.display = (show ? 'block' : 'none');
		}
	}

	navigate(nav, back) {

		var p = this;
		p.showLoader(true);

		if (nav && nav.hasOwnProperty("params")) {

			if (nav.params.page == "back") {
				return window.history.go(-1);
			} else if (nav.params.page == "cameras") {
				var camMenu = new CamMenu();
				camMenu.generate(function(err, data) {
					p.render(err, data, {}, back);
				});
			} else if (nav.params.page == "automation") {
				var automation = new Automation.Menu();
				automation.generate(function(err, data) {
					p.renderAutomation(err, data, {}, back);
				});
			} else if (nav.params.page == "url") {
				return window.location.href = nav.params.href;
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

			if (window.location.hash == "#Err") {
				return ReactDOM.render(<Login />, document.getElementById('root'));
			}

			auth.validate(function(err, user) {
				if (!err) {
					var mainMenu = new MainMenu();
					mainMenu.generate(user, function(err, data) {
						p.render(err, data, {}, back);
					});
				} else {
					ReactDOM.render(<Login />, document.getElementById('root'));
				}
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
				}, 1000);
			});
		} else {
			ReactDOM.render(<ListItems data={data} />, document.getElementById('root'));
			p.finalizeView(nav, back);
		}
	}

	renderAutomation(err, data, nav, back) {
		var p = this;
		ReactDOM.render(<AutomationItems data={data} />, document.getElementById('root'));
		p.finalizeView(nav, back);
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

		this.showLoader(false);
		document.activeElement.blur();
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
	var router = new Router();
	router.navigate(e.state, true);
});