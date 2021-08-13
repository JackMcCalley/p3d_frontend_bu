import React, { Component } from 'react'
import { Jumbotron, Button, Row } from 'react-bootstrap'
import apiConst from '../components/ApiUrl'
import AuthService from '../services/AuthService'

const apiUrl = apiConst.apiUrl
const Auth = new AuthService()
const loggedUser = getLoggedUser()

function getLoggedUser(){
    if(Auth.loggedIn()){
        return Auth.getUserId()
    }
}

class AltSourceComplete extends Component{
  constructor(props){
    super(props)
    this.state = {
        user: {},
        mounted: false,
        emailSent: false,
        case: null
    }
  }

  componentWillMount(){
    fetch(`${apiUrl}/users/${loggedUser}`).then((rawResponse)=>{
      // rawResponse.json() returns a promise that we pass along
      return rawResponse.json()
    }).then((parsedResponse) => {
      // when this promise resolves, we can work with our data
      let userData = parsedResponse
      this.setState({
        user: userData,
        mounted: true
      });
    })
  }

  sendSubmittedMail = () => {
    if (this.state.user != null && this.state.mounted && !this.state.emailSent){
      fetch(`${apiUrl}/alt_source_lab_email/${this.state.user.id}`, {
        method: 'GET'
      })
      this.setState({emailSent: true})
    }
  }

  render(){
    this.sendSubmittedMail()
    return(
      <div>
      <Jumbotron style={styles.outerJumbo}>
        <Jumbotron style={styles.jumbo}>
          <Row style={styles.row}>
            <h2>Your files have been recieved, Thank You!</h2><br />
            <Button href="/" bsStyle="primary">Click to return home</Button>
          </Row>
        </Jumbotron>
      </Jumbotron>
      </div>
    )
  }
}

const styles = {
  jumbo: {
    width: '50%',
    backgroundColor: 'white',
    fontSize: '32px',
    flex: 'grow',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  outerJumbo: {
    display: 'flex',
    height: '100vh',
    minHeight: '100vh',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  row: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    paddingBottom: '15px',
    paddingTop: '15px'
  }
}

export default AltSourceComplete
