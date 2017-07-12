import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var AddUser = React.createClass({

	getInitialState: function() {

		return {
			addObject: {
				id: '', 
				name: '', 
				age: '', 
				address: ''
			}
		}
    },

	render: function() {

		return (
			<Modal show={this.props.parent.state.showAddModal}>
				<Modal.Header>
					<Modal.Title>Add User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Name</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter name"
								value={this.state.addObject.name}
								onChange={this.onAddUserNameChange} />
							<br />
							
							<ControlLabel>Age</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter Age"
								value={this.state.addObject.age}
								onChange={this.onAddUserAgeChange} />
							<br />
							
							<ControlLabel>Employee Address</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter Address"
								value={this.state.addObject.address}
								onChange={this.onAddUserAdressChange} />
						</FormGroup>
					</form>						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeAddModal}>Close</Button>
					<Button bsStyle="primary" onClick={this.onAddBtnClicked}>Add</Button>						
				</Modal.Footer>				
			</Modal>
		);
	},

	clearAddObject: function() {
		
		this.state.addObject.id = '';
		this.state.addObject.name = '';
		this.state.addObject.age = '';
		this.state.addObject.address = '';
	},

	//Input changes
	onAddUserNameChange: function(event) {
		this.state.addObject.name = event.target.value;
		this.forceUpdate();
	},

	onAddUserAgeChange: function(event) {
		this.state.addObject.age = event.target.value;
		this.forceUpdate();
	},

	onAddUserAdressChange: function(event) {
		this.state.addObject.address = event.target.value;
		this.forceUpdate();
	},

	onAddBtnClicked: function() {
		//alert(this.state.addObject);
		//Save employee
		axios.post('http://localhost:8080/users/', this.state.addObject)
			.then(function (response) {
				this.props.parent.closeAddModal();
				this.props.parent.refreshTable();
				console.log(response);
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
});

export default AddUser;