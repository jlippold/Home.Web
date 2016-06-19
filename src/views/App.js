import React, {
	Component
} from 'react';

export default class App extends Component {

	constructor(props) {
		super(props);
	}

	loadCommentsFromServer() {
		$.ajax({
			url: 'https://jed.bz/camera/events.aspx?DT=2016-06-14',
			dataType: 'json',
			type: 'GET',
			success: (data) => {
				this.setState({
					data: data
				});
			},
			error: (xhr, status, err) => {
				console.error(this.props.url, status, err.toString());
			}
		});
	}

	componentDidMount() {
		this.loadCommentsFromServer()
		this.loadCommentsFromServer.bind(this);
	}

	render() {
		return (
			<div className="list-group">
				<ListItems data={this.state.data} />
    		</div>
		);
	}

}


