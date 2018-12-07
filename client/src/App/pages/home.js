import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';


import('./home.css');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {
      idList: {},
      validId: true,
      filmList:null,
      search: null,
      searhMode: 'torrents'
    };

    this.isValidId = this.isValidId.bind(this);
    this.validateId = this.validateId.bind(this);
    this.getFilms = this.getFilms.bind(this);
    this.makeFilmCard = this.makeFilmCard.bind(this);
    this.printFilms = this.printFilms.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMyFilms = this.setMyFilms.bind(this);
    this.setTorrents = this.setTorrents.bind(this);
  }

  componentWillMount(){
    this.validateId();
  }

  componentDidMount(){
    this.getFilms();
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

  async getFilms(){
    const films = await fetch('http://localhost:5000/api/films',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(films => films.json());

    this.setState({filmList: films});
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

  setMyFilms(event){
    this.setState({searhMode:'myfilms'});
  }

  setTorrents(event){
    this.setState({searhMode:'torrents'});
  }

  printFilms(){
    let text = [];
    var card = null;
    const list = this.state.filmList;

    for(var item in list){
      card = this.makeFilmCard(list[item]);
      text.push(card);
    }


    return (
      <div class="card-columns">
      {text}
      </div>
      );
    }


    makeFilmCard(film){
      return(
      <div class="card text-left text-white bg-dark mb-3">
      <img class="card-img-top" src={film.image_url} alt="Card image cap"/>
      <div class="card-body">
      <h5 class="card-title">{film.title}</h5>
      <p class="card-title">{film.director}</p>
      <a href="#" class="card-link">View Details</a>
      </div>
      </div>
      );
    }


    render() {
      if(this.isValidId()){
        return (
        <html>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="#">Home</a>
        <ul class="navbar-nav ml-auto">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-dark btn-outline-light">
        <input class="custom-input" type="radio" name="options" id="option1" autocomplete="off"/> My Films
        </label>
        <label class="btn btn-dark btn-outline-light">
        <input class="custom-input" type="radio" name="options" id="option2" autocomplete="off"/> Torrents
        </label>
        </div>
        <form class="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
        <input class="form-control mr-sm-2" type="text" placeholder="Search" value={this.state.search} onChange={this.handleInput} aria-label="Search Torrent"/>
        <button class="btn btn-outline-light my-2 my-sm-0">Search</button>
        </form>
        </ul>
        </nav>
        <homeBody>
        {this.printFilms()}
        </homeBody>
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
  export default withRouter(Home);