import React, {
	Component
} from 'react';


export default class Login extends Component {
	
	render() {
		var msg;
		if (window.location.hash == "#Err") {
			msg = "Invalid username or password";
		}

		return (
			<div id="login" className="row">
				<div className="col-md-4 col-md-offset-4">
					<div className="panel panel-default">
						<div className="panel-heading">
							<div className="row-fluid user-row">
								<button type="button" className="btn btn-default btn-circle"> <i className="icon icon-jed" /></button>
							</div>
						</div>
						<div className="panel-body">
							<form className="form-signin" role="form" acceptCharset="UTF-8" action="https://jed.bz/auth/" method="POST">
								<fieldset>
									<label className="panel-login">
										<div className="login_result">
											{msg}
										</div>
									</label>
									<input type="text" id="username" name="username" placeholder="Username" className="form-control" />
									<input type="password" id="password" name="password" placeholder="Password" className="form-control" />
									<label className="remember" checked="checked"><input type="checkbox" name="remember" /> Remember Me </label>
									<input type="submit" defaultValue="Login »" id="blnLogin" className="btn btn-lg btn-success btn-block" />
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}