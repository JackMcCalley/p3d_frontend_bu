import React, { Component } from 'react';
import {FormGroup, FormControl, Jumbotron, Button, ControlLabel, HelpBlock} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Row, Column } from 'simple-flexbox';
import blurredbanner from '../images/blurredbanner.jpg'
import AuthService from '../services/AuthService';
import Loader from 'react-loader-spinner'
import '../css/App.css';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const styles = {
    innerJumbo: {
      width: '400px',
      backgroundColor: 'white',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: '0px',
      marginTop: '25%'
    },
    reg: {
      marginTop: '10px',
      fontSize: "12px"
    },
    divstyle: {
      backgroundImage: "url(" + blurredbanner + ")",
      height: '100vp',
      width: '100vp'
    },
    loadwarning: {
      display: 'flex',
      justifyContent: 'center'
    }
}

class Login extends Component {
    constructor(){
    super()
    this.Auth = new AuthService()
    this.state={
      email: '',
      password: '',
      loading: false,
    }
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  changeToLoader =(e) => {
    this.setState({loading: true})
    this.runFormSubmit(e)
  }

  runFormSubmit = (e) => {
    this.handleFormSubmit(e)
  }

  removeLoader(){
    this.setState({loading: false})
  }

  handleFormSubmit(e){
     e.preventDefault();
     this.Auth.login(this.state.email, this.state.password)
     .then(res =>{
       this.props.history.replace('/')
       window.location.reload()
     })
     .catch(
       err =>{alert("User not found. Please check your email and password.") },
       this.removeLoader()
     )
   }

  render() {
    const loading = this.state.loading
    let submit;
    if(!loading){
      submit =
        <Button
          type='button'
          bsStyle="info"
          onClick={this.changeToLoader.bind(this)}
          style={{fontSize: "18px", marginLeft: '30%', width: '40%', marginRight: '30%'}}
        >
          Log In
        </Button>
    } else {
      submit =
        <div style={{marginLeft: '35%', marginRight: '30%'}}>
        <Loader
         type="Bars"
         color="gray"
         height="85"
         width="85"
        />
        </div>
    }

    return (
      <div style={styles.divstyle}>
        <Row justifyContent='center'>
         <Row style={{justifyContent: 'center', marginBottom: "100px"}}>
         <Jumbotron style={styles.innerJumbo}>
          <Row justifyContent="center" style={{fontSize: "32px", marginBottom: "20px"}}>
              Log In
          </Row>
          <form
            onSubmit={this.handleFormSubmit.bind(this)}
          >
          <FieldGroup
            id="formControlsEmail"
            type="email"
            placeholder="Enter email"
            width="500px"
            name="email"
            style={{fontSize: "18px"}}
            onChange={this.handleChange.bind(this)}
            value={this.state.email}
          />
          <FieldGroup id="formControlsPassword"
            placeholder="Enter Password"
            type="password"
            name="password"
            style={{fontSize: "18px"}}
            onChange={this.handleChange.bind(this)}
            value={this.state.password}
          />
          {submit}
          </form>
          <Row style={styles.reg}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </Row>
          <Row style={styles.reg}>
            <a style={{fontSize: '16px'}} href='/signup'>Don&#8217;t have an account? Register here</a>
          </Row>
          </Jumbotron>
         </Row>
       </Row>
     </div>
    );
  }
}

export default Login
