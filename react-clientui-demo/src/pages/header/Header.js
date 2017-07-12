import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
	render: function() {
		
		return (
			<div className="header">
				<p className="header-info">
					Ascend React ClientUI Demo
				</p>
				<div className="menu">
					<Link to="/users" className="menu-link-item" activeClassName="active">List Users</Link>
					<Link to="/roles" className="menu-link-item" activeClassName="active">List Roles</Link>
				</div>
			</div>

		);
	}
});

export default Header;