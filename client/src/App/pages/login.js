import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './login.css';


class Login extends Component {
  constructor() {
    super();
    this.state= {
      username: null,
      password: null,
      error:null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handlePassInput = this.handlePassInput.bind(this);
  }

  componentWillMount(){
    this.setState({error: this.props.location.error});
  }

  handlePassInput(event){
    this.setState({password: event.target.value});
  }

  handleUserInput(event){
    this.setState({username: event.target.value});
  }

  
  async handleSubmit(event) { 
    event.preventDefault();

    var user = this.state.username;
    var pass = this.state.password;
    this.setState({error:null});

    if(!user || user.trim().length === 0){
      this.setState({error: 'Empty username field'});
      return;
    }

    if(!pass || pass.trim().length === 0){
      this.setState({error: 'Empty pasword field'});
      return;
    }

    var login_request = {username: user, password: pass};
    const json = JSON.stringify(login_request);


    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: json
    }).then(response => response.json());

    if(response.error)
      this.setState({error: response.error});
    else
      this.props.history.push('/home/'+ response);
  }

  render() {
    return (
      <html>
      <loginBody>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">Film Agent</a>
      <ul class="navbar-nav ml-auto">
      <form class="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
      <input class="form-control mr-sm-2" type="text" placeholder="Username" value={this.state.username} onChange={this.handleUserInput} aria-label="Username"/>
      <input class="form-control mr-sm-2" type="password" value={this.state.password} onChange={this.handlePassInput} placeholder="Password" aria-label="Password"/>
      <button class="btn btn-outline-light my-2 my-sm-0">Login</button>
      </form>
      </ul>
      </nav>
      <p1>{this.state.error}</p1>
      </loginBody>
      </html>
      );
  }
}

export default withRouter(Login);

