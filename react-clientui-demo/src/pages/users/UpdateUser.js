import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var UpdateUser = React.createClass({

	getInitialState: function() {

		return {
			updateObject: {
				userId: '',
				name: '',
				age: '',
				address: ''
			}
		}
    },

    shouldComponentUpdate: function() {
    	//console.log('EU:shouldComponentUpdate');
    	//return this.props.parent.state.showUpdateModal;
    	return true;
    },

	render: function() {

		return (
			<Modal show={this.props.parent.state.showUpdateModal}>
				<Modal.Header>
					<Modal.Title>Update User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Name</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter name"
								value={this.state.updateObject.name}
								onChange={this.onUpdateUserNameChange} />
							<br />

							<ControlLabel>Age</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter Age"
								value={this.state.updateObject.age}
								onChange={this.onUpdateUserAgeChange} />
							<br />

							<ControlLabel>Address</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter Address"
								value={this.state.updateObject.address}
								onChange={this.onUpdateUserAdressChange} />
						</FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeUpdateModal}>Close</Button>
					<Button bsStyle="primary" onClick={this.onUpdateBtnClicked}>Update</Button>
				</Modal.Footer>
			</Modal>
		);
	},

	fillUpdateObject: function() {

    	var selectedUser = this.props.parent.getUserById(this.props.parent.state.selectedUserId);

		this.state.updateObject = {
			userId: selectedUser.userId,
			name: selectedUser.name,
			age: selectedUser.age,
			address: selectedUser.address,
		}
	},

	clearUpdateObject: function() {

		this.state.updateObject.userId = '';
		this.state.updateObject.name = '';
		this.state.updateObject.age = '';
		this.state.updateObject.address = '';
	},

	//Input changes
	onUpdateUserNameChange: function(event) {
		this.state.updateObject.name = event.target.value;
		this.forceUpdate();
	},

	onUpdateUserAgeChange: function(event) {
		this.state.updateObject.age = event.target.value;
		this.forceUpdate();
	},

	onUpdateUserAdressChange: function(event) {
		this.state.updateObject.address = event.target.value;
		this.forceUpdate();
	},

	onUpdateBtnClicked: function() {
		alert(this.state.updateObject.userId);
		//Update employee
		axios.put('http://localhost:8080/users/' + this.state.updateObject.userId, this.state.updateObject)
			.then(function (response) {
				this.props.parent.closeUpdateModal();
				this.props.parent.refreshTable();
				console.log(response);
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
});

export default UpdateUser;
