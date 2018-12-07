import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';


import('./torrent.css');

class Torrent extends Component {
  constructor(props) {
    super(props);
    this.state= {
      idList: {},
      validId: true,
      torrentList:null,
      search: null
    };

    this.isValidId = this.isValidId.bind(this);
    this.validateId = this.validateId.bind(this);
    this.getTorrentList = this.getTorrentList.bind(this);
    this.makeItem = this.makeItem.bind(this);
    this.printList = this.printList.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    this.validateId();
  }

  componentDidMount(){
    this.getTorrentList();
  }

  async validateId(){

    const temp = [];
    var equalId = false;
    const {id} = this.props.match.params;
    const users = await fetch('http://localhost:5000/api/users',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(users => users.json());

    for(var user in users){
      if(users[user]._id == id){
        temp.push(users[user]._id);
        equalId = true;
      }
    }
    this.setState({idList: temp, validId: equalId});
  }

  isValidId(){
    const isValid = this.state.validId;
    return isValid;
  }

  async getTorrentList(){
    const {query} = this.props.match.params;
    const list = await fetch('http://localhost:5000/api/torrents/'+query,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(list => list.json());

    this.setState({torrentList: list});
  }

  handleInput(event){
    this.setState({search: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();

    const query = this.state.search;
    const {id} = this.props.match.params;

    this.props.history.push('/torrent/'+id+'/'+query);
  }

  printList(){
    let text = [];
    var card = null;
    const list = this.state.torrentList;
    const {query} = this.props.match.params;

    for(var item in list){
      card = this.makeItem(list[item]);
      text.push(card);
    }


    return (
      <ul class="list-group">
      <h3>Searching for: {query}</h3>
      {text}
      </ul>
      );
  }


  makeItem(torrent){
    return(
      <li class="list-group-item list-group-item-dark">
      {torrent.title}
      <div class="float-right">
      <button class="btn btn-dark rimary my-2 my-sm-0">Download</button>
      <span> </span>
      <button class="btn btn-primary my-2 my-sm-0">Download with subtitles</button>
      </div>
      <div>
      <span class="badge badge badge-dark">Size: {torrent.size}</span>
      <span> </span>
      <span class="badge badge badge-success">{torrent.seeds} seeds</span>
      <span> </span>
      <span class="badge badge badge-info">{torrent.peers} peers</span>
      </div>
      </li>
      );
    }

    showTorrentInfo(torrent){

    }


    render() {
      if(this.isValidId()){
        return (
        <html>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="javascript:history.back()">Home</a>
        <ul class="navbar-nav ml-auto">
        <form class="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
        <input class="form-control mr-sm-2" type="text" placeholder="Search Torrents" value={this.state.search} onChange={this.handleInput} aria-label="Search Torrent"/>
        <button class="btn btn-outline-light my-2 my-sm-0">Search</button>
        </form>
        </ul>
        </nav>
        <torrentBody>
        {this.printList()}
        </torrentBody>
        </html>
        );
      }
      else{
        return <Redirect to={{
          pathname: '/login',
          error:'Invalid Username or Password'
        }}/>
      }
    }
  }
  export default withRouter(Torrent);