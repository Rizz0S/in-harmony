import React from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { withAlert } from 'react-alert';

import Profile from './Components/Profile';
import About from './Static/About';
import GeneratorContainer from './Containers/GeneratorContainer';
import Gallery from './Containers/Gallery';
import NavBar from './Components/NavBar';
import Form from './Components/UserForm';
import NotFound from './Static/NotFound';
import Footer from './Static/Footer'

class App extends React.Component {

  state = {
    showNavBar: false
  }

  componentDidMount() {
    
    fetch("http://localhost:4000/palettes")
      .then(r => r.json())
      .then((palettesArr) => {
        this.props.setPalettes(palettesArr)
      })
    

    if (localStorage.token) {
      fetch("http://localhost:4000/persist", {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      })
        .then(r => r.json())
        .then((resp) => {
          localStorage.token = resp.token
          this.props.setUser(resp)
        })
    }
  }

  
  handleLoginSubmit = (userInfo) => {
    fetch(`http://localhost:4000/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then((resp) => {
        if (resp.token) {
          localStorage.token = resp.token;
          this.props.setUser(resp)
          this.props.history.push("/profile");
        } else {
          this.props.alert.show(resp.error)
        }
      })
  }

  handleRegisterSubmit = (userInfo) => {
    fetch(`http://localhost:4000/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then((resp) => {
        if (resp.token) {
          localStorage.token = resp.token;
          this.props.setUser(resp);
          this.props.history.push("/profile");
        } else {
          this.props.alert.show(resp.error)
        }
      })
  }

  handleLogOut = () => {
    localStorage.clear();
    this.props.setUser({
      user: {
        username: "",
        id: 0,
        user_palettes: [],
        liked_palettes: []
      },
      token: ""
    })
    this.props.history.push("/");
  
  }

  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="login" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register") {
      return <Form formName="register" handleSubmit={this.handleRegisterSubmit}/>
    }
  }


  render() {
    return (
      <div className="App">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="in harmony logo" className="nav-toggle-img" onClick={this.handleShowNavClick}/>
        <div className="navContainer">
            <NavBar 
              handleLogOut={this.handleLogOut} 
            />
        </div> 
        <div className="mainContent">
          <Switch>
            <Route path="/login" render={ this.renderForm } />
            <Route path="/register" render={ this.renderForm } />
            <Route path="/about" component={ About } />
            <Route path="/gallery">
              <Gallery 
              />
            </Route>
            <Route path="/profile" component={ Profile } />
            <Route path="/" exact>
              <GeneratorContainer /> 
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

const setUser = (resp) => {
    return {
      type: 'SET_USER',
      payload: resp
    }
}

const setPalettes = (resp) => {
  return {
    type: 'SET_PALETTES',
    payload: resp
  }
}

export default withAlert()(
  withRouter(
    connect(null, {setUser, setPalettes})(App)
    )
  )
