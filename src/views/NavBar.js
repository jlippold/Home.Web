import React, {
	Component
} from 'react';


export default class NavBar extends Component {
	
	render() {
		
		return (
			<nav className="navbar">
				<a className="pull-right" id="loader">
					<object data="https://jed.bz/img/loader.svg" type="image/svg+xml"></object>
				</a>

				<a href="https://jed.bz/auth/logout.aspx" className="pull-right navbar-link">
					logout
				</a>

				<div className="container">
					<ul className="nav navbar-nav">
						<li>
							<p className="navbar-btn">
								<a className="logo btn btn-default btn-circle" href="/"> <i className="icon icon-jed" /></a>
							</p>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}