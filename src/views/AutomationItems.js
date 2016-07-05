import React, {
	Component
} from 'react';

import {
	Router
} from '../router';

import general from "../classes/general";
import NavBar from '../views/NavBar';
var request = require('browser-request');

export default class AutomationItems extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var component = this;
		var data = component.props.data;
		var output = [];

		var groups = [];
		data.forEach((item, index) => {
			if (item.params.hasOwnProperty("device")) {
				let group = item.params.device.group;
				if (groups.indexOf(group) == -1) {
					groups.push(group);
				}
			} else {
				item.icon = "home-1";
				output.push(<AutomationItem item={item} key={"back"} index={0} />);
			}
		});
		groups.sort();

		groups.forEach((group, i) => {
			output.push(<GroupHeader group={group} key={"group" + i} index={i} />);
			data.forEach((item, index) => {
				if (item.params.hasOwnProperty("device") &&
					item.params.device.group == group) {
					output.push(<AutomationItem item={item} key={"list" + index} index={index} />);
				}
			});
		});

		return (
			<div id="automationMenu">
				<NavBar />
				<div className="container">
					<div className="list-group">
						{output}
					</div>
				</div>
			</div>
		);

	}
}

class GroupHeader extends Component {
	render() {
		return (
			<a className="list-group-item heading" href="javascript:;" >
				<h4 className="list-group-item-heading">
					{this.props.group}
				</h4>
			</a>
		);
	}
}

class AutomationItem extends Component {
	constructor(props) {
		super(props);
		this.sendCommand = this.sendCommand.bind(); // bind early
	}

	sendCommand(evt, item, command) {

		function makeRequest(device, state, callback) {
			var url;

			if (state == "on") {
				url = device.onUrl;
			}
			if (state == "off") {
				url = device.offUrl;
			}
			if (state == "toggle") {
				url = device.toggle;
			}

			if (url) {
				request({
					method: 'get',
					url: "https://jed.bz/home/" + url,
					withCredentials: true
				}, function(error, response, body) {
					return callback(error);
				});
			} else {
				return callback("bad state");
			}
		}

		evt.stopPropagation();
		if (item.params.hasOwnProperty("device")) {
			var device = item.params.device;
			makeRequest(device, command, function(err) {
				if (err) {
					console.error(err);
				}
				document.activeElement.blur();
			});
		} else {
			var r = new Router();
			r.navigate(item);
		}
	}


	render() {

		var component = this;
		var index = component.props.index;
		var item = component.props.item;
		var device, status;

		if (item.params.hasOwnProperty("device")) {
			device = item.params.device;
		}

		if (device && device.status) {
			status = device.status;
		}

		return (
			<a href="javascript:;" className="list-group-item" onClick={e => component.sendCommand(e, item, "toggle")}>
				<div className="ha-container">
					<h4 className="list-group-item-heading ha-header">
						{item.icon ? (
							<span className={"icon icon-" + item.icon + " " + status}>
							</span>
						) : null} 
						{item.title}
					</h4>
					{device ? (
						<div role="group" className="btn-group">
							<button className="btn btn-default" type="button" onClick={e => component.sendCommand(e, item, "on")}>
								<span>On</span>
							</button>
							<button className="btn btn-default" type="button" onClick={e => component.sendCommand(e, item, "off")}>
								<span>Off</span>
							</button>
						</div>
					): null}
				</div>
			</a>
		);
	}
}