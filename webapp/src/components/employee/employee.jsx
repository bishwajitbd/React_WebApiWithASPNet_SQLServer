import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddEmpModal from './addempmodal';
import EditEmpModal from './editempmodal';

export default class Employee extends Component{
	constructor(props){
		super(props)
		this.state={emps:[], addModalShow:false, editModalShow:false}
	}
	componentDidMount(){
		this.refreshList();
	}
	refreshList(){
			fetch('http://localhost:54261/api/Employees')
			.then(response=>response.json())
			.then(data=>{
				this.setState({emps:data})
			}
		);
	} 
	componentDidUpdate(){
		this.refreshList();
	}
	deleteEmployee(empid){
		if(window.confirm('Are you sure?'))
		{
			fetch('http://localhost:54261/api/Employees/'+empid, {
				method: 'DELETE',
				header: {'Accept': 'application/json',
				'content=Type':'application/json'}
			})
		}
	}
	render(){
		const {emps, empid, empname, department, email, doj}=this.state;
		let addModalClose=()=>this.setState({addModalShow:false});
		let editModalClose=()=>this.setState({editModalShow:false})

		return(
		<div>
			<Table className="mt-4" striped bordered hover size="sm">
			<thead>
				<tr>
					<th>EmployeeID</th>
					<th>Employee Name</th>
					<th>Department</th>
					<th>Email</th>
					<th>Date of Join</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{emps.map(dep=>
					<tr key={dep.EmpID}> 
						<td>{dep.EmpID}</td>
						<td>{dep.EmployeeName}</td>
						<td>{dep.Department}</td>
						<td>{dep.MailID}</td>
						<td>{dep.DOJ}</td>
						<td>
						<ButtonToolbar>
						<Button className="mr-2" variant="info"
						onClick={()=>this.setState({editModalShow:true, empid:dep.EmpID, empname:dep.EmployeeName, 
							department:dep.Department, email:dep.MailID, doj:dep.DOJ})}
						>Update
						</Button>
						<Button className="mr-2" onClick={()=>this.deleteEmployee(dep.EmpID)} variant="danger">
						Delete</Button>
						<EditEmpModal
						show={this.state.editModalShow}
						onHide={editModalClose}
						empid={empid}
						empname={empname}
						department={department}
						email={email}
						doj={doj}
						/>
						</ButtonToolbar>
						</td>
					</tr>
				)}
			</tbody>
			</Table>
			<ButtonToolbar>
				<Button variant="primary" 
				onClick={()=>this.setState({addModalShow:true})}>
				Add Employee
				</Button>
				<AddEmpModal 
				show={this.state.addModalShow}
				onHide={addModalClose}
				/>
			</ButtonToolbar>
		</div>
		)
	}
}