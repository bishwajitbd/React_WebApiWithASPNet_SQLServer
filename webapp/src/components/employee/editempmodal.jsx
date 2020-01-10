import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default class EditEmpModal extends Component{
		constructor(props){
		super(props);

		this.state={
	      snackbaropen: false,
	      snackbarmsg: ""
	    };

		this.handleSubmit=this.handleSubmit.bind(this);
	}

	snackbarClose=(event)=>{
		this.setState({snackbaropen:false});
	};
	handleSubmit(event){
		event.preventDefault();
		//alert(event.target.EmployeeName.value)
		fetch('http://localhost:54261/api/Employees', {
			method:'PUT',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json' 
			},
			body:JSON.stringify({
				EmpID:event.target.EmpID.value,
				EmployeeName: event.target.EmployeeName.value,
				Department: event.target.Department.value,
				MailID: event.target.MailID.value,
				DOJ: event.target.DOJ.value
			})
		})
		.then(res=>res.json())
		.then((result)=>{
			//alert(result);
			
			this.setState({snackbaropen:true, snackbarmsg:result});
		},
		(error)=>{
			//alert('Failed');
			this.setState({snackbaropen:true, snackbarmsg:'Failed'});
		});
	}

	render(){
		return(
		<div className="container">
	      	<Snackbar
		        anchorOrigin={{
		          vertical: 'bottom',
		          horizontal: 'left',
		        }}
		        open={this.state.snackbaropen}
		        autoHideDuration={3000}
		        onClose={this.snackbarClose}
		        ContentProps={{
		          'aria-describedby': 'message-id',
		        }}
		        message={<span id="message-id">{this.state.snackbarmsg}</span>}
		        action={[
		          <IconButton
		            key="close"
		            aria-label="close"
		            color="inherit"
		            onClick={this.snackbarClose}
		          >
		            x
		          </IconButton>,
		        ]}
	      	/>
		    <Modal
		      {...this.props}
		      size="lg"
		      aria-labelledby="contained-modal-title-vcenter"
		      centered
		      >
		      <Modal.Header closeButton>
		        <Modal.Title id="contained-modal-title-vcenter">
		          Update Employee 
		        </Modal.Title>
		      </Modal.Header>
		      <Modal.Body>

		        <Row>
			        <Col sm={6}>
			        <Form onSubmit={this.handleSubmit}>

			        <Form.Group controlId="EmpID">
			        <Form.Label>Employee ID</Form.Label>
				        <Form.Control 
				        type="text"
				        name="EmpID"
				        required
				        disabled
			   		    defaultValue={this.props.empid}
				        placeholder="Employee ID"
				        />
				    </Form.Group>

			        <Form.Group controlId="EmployeeName">
			        <Form.Label>Employee Name</Form.Label>
				        <Form.Control 
				        type="text"
				        name="EmployeeName"
				        required
				        defaultValue={this.props.empname}
				        placeholder="Employee Name"
				        />
				     </Form.Group>
				    <Form.Group controlId="Department">
				    <Form.Label>Department</Form.Label>
				        <Form.Control 
				        type="text"
				        name="Department"
				        required
				        defaultValue={this.props.department}
				        placeholder="Department"
				        />
				     </Form.Group>


				    <Form.Group controlId="MailID">
				    <Form.Label>Email</Form.Label>
				        <Form.Control 
				        type="email"
				        name="MailID"
				        required
				        defaultValue={this.props.email}
				        placeholder="Email"
				     />
				    </Form.Group>
				    <Form.Group controlId="DOJ">
				    <Form.Label>Email</Form.Label>
				        <Form.Control 
				        type="date"
				        name="DOJ"
				        required
				        defaultValue={this.props.doj}
				        placeholder="DOJ"
				     />
				    </Form.Group>

				    <Form.Group>
				    	<Button variant="primary" type="submit">
				    		Update
				    	</Button>
				    </Form.Group>
			        </Form>
			        </Col>
		        </Row>
		        To edit From fields for employee 
		        
		      </Modal.Body>
		      <Modal.Footer>
		        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
		      </Modal.Footer>
		    </Modal>
			    </div>
		)
	}
}

