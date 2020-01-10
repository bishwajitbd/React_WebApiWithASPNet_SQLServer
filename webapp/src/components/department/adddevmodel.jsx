import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default class AddDepModel extends Component{
		constructor(props){
		super(props);

		this.state = {
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
		//alert(event.target.DepartmentName.value)
		fetch('http://localhost:54261/api/department', {
			method:'POST',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json' 
			},
			body:JSON.stringify({
				DepartmentId:null,
				DepartmentName: event.target.DepartmentName.value
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
		          Add Department 
		        </Modal.Title>
		      </Modal.Header>
		      <Modal.Body>

		        <Row>
			        <Col sm={6}>
			        <Form onSubmit={this.handleSubmit}>
			        <Form.Group controlId="DepartmentName">
				        <Form.Control 
				        type="text"
				        name="DepartmentName"
				        required
				        placeholder="Department Name"
				        />
				    </Form.Group>
				    <Form.Group>
				    	<Button variant="primary" type="submit">
				    		Add Department
				    	</Button>
				    </Form.Group>
			        </Form>
			        </Col>
		        </Row>
		        To add From fields for department 
		        
		      </Modal.Body>
		      <Modal.Footer>
		        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
		      </Modal.Footer>
		    </Modal>
		    </div>
		); 
	}
}