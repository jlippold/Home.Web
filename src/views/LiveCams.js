import React, {
	Component
} from 'react';

import general from "../classes/general"
import moment from 'moment'

export default class LiveCams extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(); // bind early
	}

	handleClick() {
		window.history.go(-1);
	}

	render() {
		var component = this;
		var data = component.props.data;
		var output = [];

		for (var i = 0; i <= 3; i++) {
			output.push(
				<div key={"cam" + i} className="col-xs-12 col-md-6">
					<CamImage cam={i} />
				</div>
			);
		}

		return (
			<div>
				<div className="list-group">
					<a href="javascript:;" onClick={e => component.handleClick()} className="list-group-item">
						<h4 className="list-group-item-heading">
							<span className="icon icon-back" style={{paddingRight: 6}} />
							<span>back</span>
						</h4>
						<p className="list-group-item-text" />
					</a>
				</div>
				<div className="row">
					{output}
				</div>
			</div>
		);

	}
}

class CamImage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			camIndex: this.props.cam,
			name: moment().format('dddd, MMMM Do YYYY [at] h:mm:ss a'),
			url: "https://jed.bz/camera/live/loadcam.aspx?cam=" + this.props.cam + "&r=" + Math.random()
		};
	}


	loaded(e) {
		var component = this;
		setTimeout(function() {
			try {
				component.setState({
					camIndex: component.state.camIndex,
					name: moment().format('dddd, MMMM Do YYYY [at] h:mm:ss a'),
					url: "https://jed.bz/camera/live/loadcam.aspx?cam=" + component.state.camIndex + "&r=" + Math.random()
				});
			} catch (e) {
				//this will throw an error if 
				//you hit back before the timeout completes
			}
		}, 250);
	}

	render() {
		return (
			<div className="thumbnail">
				<p style={{textAlign: 'center'}}>{this.state.name}</p>
				<img src={this.state.url} 
					onLoad={this.loaded.bind(this)} 
					onError={this.loaded.bind(this)} />
				<p>&nbsp;</p>
			</div>
		);
	}
}