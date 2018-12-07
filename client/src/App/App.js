import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Login from './pages/login';
import Home from './pages/home';
import List from './pages/list';
import Torrent from './pages/torrent';

class RedirectToLogin extends Component{
  render(){
    return <Redirect to='/login'/>
  }
}


class App extends Component {

  render() {
    const App = () => (
      <div>
      <Switch>
      <Route exact path='/' component={RedirectToLogin}/>
      <Route path='/login' component={Login}/>
      <Route path='/home/:id' component={Home} />
      <Route path='/torrent/:id/:query' component={Torrent}/>
      </Switch>
      </div>
      )
    return (
      <Switch>
      <App/>
      </Switch>
      );
    }
  }

  export default App;
