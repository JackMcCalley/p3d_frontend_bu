import React, { Component } from 'react';
import { Column, Row } from 'simple-flexbox';
import {Button, Jumbotron} from 'react-bootstrap'
import '../css/App.css';
import AuthService from '../services/AuthService'
import withAuth from './withAuth'

const Auth = new AuthService()

const loggedUser = getLoggedUser()

function getLoggedUser(){
    if(Auth.loggedIn()){
        return Auth.getUserId()
    }
}

let handleLogout = () => {
        Auth.logout()
      }

class Account extends Component {

    constructor(){
        super();
    }
    render() {
      return (
          <div height='100vh'>
                <Row style={{justifyContent: 'center', marginBottom: '50px', marginTop: '20px'}}>
                    <h1>
                        Hello !
                    </h1>
                </Row>
                <Row style={{alignText: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                    <Button style={{fontSize: '18px'}} bsSize='large' bsStyle='primary' href="/pricing">View our price list</Button>
                </Row>
                <Row style={{justifyContent: 'center', width: 'auto'}}>
                    <Button style={{fontSize: '18px', marginBottom: '10%'}} onClick={handleLogout} bsStyle='danger' href='/'>Log Out</Button>
                </Row>
          </div>
      );
    }

}

const styles = {
    jumbo: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: '2px',
        border: 'solid',
        width: '30%',
        height: 'auto',
        marginLeft: '5%'
    }
}

export default Account
