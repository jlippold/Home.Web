import React, {
	Component
} from 'react';

import {
	Page
} from '../classes/Page';

import general from "../classes/general"


export default class ListItems extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(); // bind early
	}

	handleClick(item) {
		var page = new Page();
		page.steer(item);
	}

	render() {
		var component = this;
		var data = component.props.data;
		var output = [];
		
		var getJSXforItem = function(component, item, index) {
			var jsx = (
				<a href="javascript:;" key={"li" + index} onClick={e => component.handleClick(item)} className="list-group-item">
					<h4 className="list-group-item-heading">
					{item.icon ? (
						<span className={"icon icon-" + item.icon} style={{paddingRight: 6}}></span>    
					) : null} 
						{item.title}
					</h4>
					<p className="list-group-item-text">
					{item.subTitle}
					</p>
				</a>
			);

			return jsx;
		};
		
		if (data.hasOwnProperty("FilePath")) { //video file
			var isWebkit = 'WebkitAppearance' in document.documentElement.style;
			output.push(getJSXforItem(component, general.createListArray()[0], 1) );

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
				var jsx = getJSXforItem(component, item, index);
				output.push(jsx);
			});
		}

		return (
			<div className="list-group">
				{output}
			</div>
		);

	}


}