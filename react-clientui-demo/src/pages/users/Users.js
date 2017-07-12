import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ButtonGroup, Button, Modal, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import AddEmployeeModal from './AddUser';
import UpdateEmployeeModal from './UpdateUser';

var Users = React.createClass({

	getInitialState: function() {

		return {
			data: null,
			selectedUserId: null,
			showAddModal: false,
			showUpdateModal: false
		}
    },

	componentDidMount: function() {
		this.refreshTable();
	},

	render: function() {

		var selectRowProp = {
			mode: "radio",
			clickToSelect: true,
			className: "selected-row",
			bgColor: 'rgb(101, 148, 255)',
			onSelect: this.onRowSelect
		};

		if(!this.state.data){
			return (<div></div>);
		}

		return (
			<div>
				<ButtonGroup className="m-10">
					<Button bsStyle="primary" onClick={this.openAddModal}><Glyphicon glyph="plus" />Add</Button>
					<Button bsStyle="warning" disabled={this.state.selectedUserId === null} onClick={this.openUpdateModal}><Glyphicon glyph="refresh" />Update</Button>
					<Button bsStyle="danger" disabled={this.state.selectedUserId === null} onClick={this.onDeleteBtnClicked}><Glyphicon glyph="trash" />Delete</Button>
				</ButtonGroup>

				<BootstrapTable data={this.state.data}
								striped={true}
								hover={true}
								//pagination={true}
								search={true}
								selectRow={selectRowProp}>
					<TableHeaderColumn dataField="userId" isKey={true} dataAlign="center" dataSort={true}>User ID</TableHeaderColumn>
					<TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
					<TableHeaderColumn dataField="age">Age</TableHeaderColumn>
					<TableHeaderColumn dataField="address" dataFormat={this.priceFormatter}>Address</TableHeaderColumn>
				</BootstrapTable>

				<AddEmployeeModal parent={this} ref="addUser" />

				<UpdateEmployeeModal parent={this} ref="updateUser"/>
			</div>
		);
	},

	// Keep selected row
	onRowSelect: function(row, isSelected) {
		if(isSelected) {
			this.setState({ selectedUserId: row.userId });
		}else {
			this.setState({ selectedUserId: null });
		}
	},

	//Add modal open/close
	closeAddModal: function() {
		this.setState({ showAddModal: false });
		this.refs.addUser.clearAddObject();
	},
	openAddModal: function() {
		this.refs.addUser.clearAddObject();
		this.setState({ showAddModal: true });
	},

	//Update modal open/close
	closeUpdateModal: function() {
		this.setState({showUpdateModal: false});
		this.refs.updateUser.clearUpdateObject();
	},
	openUpdateModal: function() {
		this.refs.updateUser.fillUpdateObject();
		this.setState({showUpdateModal: true});
	},

	//BEGIN: Delete Employee
	onDeleteBtnClicked: function() {
		alert(this.state.selectedUserId);
		axios.delete('http://localhost:8080/users/' + this.state.selectedUserId)
			.then(function (response) {
				this.refreshTable();
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	},
	//END: Delete Employee

	priceFormatter: function(cell, row){
		return cell;
	},

	getUserById: function(id) {
		for(var i in this.state.data) {
			if(this.state.data[i].userId === id) {
				return this.state.data[i];
			}
		}
		return '';
	},

	getUsers: function() {
	  return axios.get('http://localhost:8080/users');
	},

	//Get table data and update the state to render
	refreshTable: function() {
		axios.all([this.getUsers()])
		.then(axios.spread(function (users) {
			this.setState({data: users.data,
			});
		}.bind(this)));
	}
});

export default Users;
