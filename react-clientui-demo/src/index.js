import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import MainTemplate from './pages/main_template/MainTemplate';
import Users from './pages/users/Users';
import Roles from './pages/roles/Roles';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={MainTemplate}>
			<Route path="users" components={{main: Users}} />
			<Route path="roles" components={{main: Roles}} />
		</Route>
	</Router>,
	document.getElementById('root')
);
