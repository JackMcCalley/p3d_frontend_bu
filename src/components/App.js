import React, { Component } from 'react';
import Content from './Content.js';
import Footer from './Footer.js'
import Navigation from './Navigation.js'
import NavLoggedIn from './NavLoggedIn'
import '../css/bootstrap.min.css';
import AuthService from '../services/AuthService'

const Auth = new AuthService()

class App extends Component {
  render() {
    if (navigator.appName !== "Internet Explorer 11"){
    return (
        <div>
            {
              Auth.loggedIn() ?
                <NavLoggedIn />
                : <Navigation />
            }
            <Content style={{height: '100vh', minHeight: '100vh',}}/>
            <Footer />
        </div>
    )} else {
      return (
        <div style={{color: 'black', fontSize: '18px'}}>
          P3D Guides is not compatible with Internet Explorer. We apologize for the inconvenience.
        </div>
      );
    }
  }
}

export default App;
