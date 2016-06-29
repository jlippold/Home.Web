import React, {
	Component
} from 'react';

import {
	Router
} from '../router';

import general from "../classes/general";
import NavBar from '../views/NavBar';

export default class ListItems extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(); // bind early
	}

	handleClick(evt, item, save) {

	}

	render() {
		var component = this;
		var data = component.props.data;
		var output = [];

		if (data.hasOwnProperty("FilePath")) { //video file
			var isWebkit = 'WebkitAppearance' in document.documentElement.style;
			output.push(<ListItem item={general.createListArray()[0]} key={"list1"} index={1} onClick={e => component.handleClick(e, item)} />);

			output.push(
				<a key={"video"} className="list-group-item">
      				<h4 className="list-group-item-heading" style={{textAlign: 'center'}}> 
      					{data.CamName} - {data.TimeRecorded} 
      					<br /> 
      					{data.DateRecorded}
      				</h4>
      				<br />
      				<div style={{textAlign: 'center'}}>

						{isWebkit ? (
							<video width="100%" height="auto" id="video" preload="none" src="https://jed.bz/stream/cam.m3u8">
							</video>
						) : (
							<embed width="100%"  
								height="auto"
								target="https://jed.bz/stream/cam.m3u8" 
								autoPlay="yes" 
								id="video" 
								version="VideoLAN.VLCPlugin.2" 
								pluginspage="http://www.videolan.org" 
								type="application/x-vlc-plugin">
							</embed>
						)} 

					</div>
				</a>
			);
		} else {
			data.forEach((item, index) => {
				output.push(<ListItem item={item} key={"list" + index} index={index} onClick={e => component.handleClick(e, item)} />);
			});
		}

		return (
			<div>
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

class ListItem extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(); // bind early
	}

	handleClick(evt, item, save) {
		
		if (save) {
			var file = item.params.file.FilePath;
			var opts = {
				method: 'get',
				url: "https://jed.bz/camera/recordings.aspx?action=save&file=" + file,
				json: true
			};

			var request = require('browser-request');
			request(opts, function(err, resp) {
				if (err) {
					alert("error saving");
				} else {
					alert("saved");
				}
			});

			evt.preventDefault();
			evt.stopPropagation();
		} else {
			var r = new Router();
			r.navigate(item);
		}
	}

	render () {
		
		var component = this;
		var index = component.props.index;
		var item = component.props.item;
		
		return (
			<a tabIndex="1" href="javascript:;" key={"li" + index} onClick={e => component.handleClick(e, item)} className="list-group-item">
				<h4 className="list-group-item-heading">
					{item.icon ? (
						<span className={"icon icon-" + item.icon} style={{marginRight: 6}}></span>    
					) : null} 
					{item.title}
				</h4>
				<p className="list-group-item-text">
				{item.subTitle}
				</p>

				{item.hasSaveIcon ? (
					<span 
						style={{marginTop: '-44px', fontSize: '2em'}} 
						className="pull-right icon icon-saved"
						onClick={e => component.handleClick(e, item, true)} >
					</span>
				) : (<span></span>)}
			</a>
		);
	}
}