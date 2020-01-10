import React from 'react';
import './App.css';

import Home from './components/home/home';
import Department from './components/department/department';
import Employee from './components/employee/employee';
import Navigation from './components/navigation/navigation';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
  	<BrowserRouter>
  	<div className="container">
  	<h3 className="m-3 d-flex justify-content-center">React JS with web api demo</h3>
  	<h5 className="m-3 d-flex justify-content-center">Employee Management Protal</h5>
  	<Navigation />

  	<Switch>
  		<Route path='/' component={Home} exact />
  		<Route path='/department' component={Department} />
  		<Route path='/employee' component={Employee} />
  	</Switch>
  	</div>
  	</BrowserRouter>
  );
}

export default App;
