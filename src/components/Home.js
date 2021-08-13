import React, { Component } from 'react';
import { Row, Column } from 'simple-flexbox';
import { Button, Jumbotron, Modal} from 'react-bootstrap';
import banner from '../images/banner.png'
import '../css/App.css';
import AuthService from '../services/AuthService'
import apiConst from '../components/ApiUrl'
const apiUrl = apiConst.apiUrl

const Auth = new AuthService()
const loggedUser = getLoggedUser()

function getLoggedUser(){
    if(Auth.loggedIn()){
        return Auth.getUserId()
    }
}

function existingCustomerTernary() {
    if (Auth.loggedIn()){
        let ect = "/account"
        return ect
    }
    else {
        let ect = "/login"
        return ect
    }
}

function loggedInTernary() {
    if(Auth.loggedIn()){
        let url = "/services"
        return url
    }
    else{
        let url = "/signup"
        return url
    }
}

let ect = existingCustomerTernary()
let url = loggedInTernary()

const stylesheet = {
    banner: {
        backgroundImage: 'url(' + banner + ')',
        height: 'auto',
        width: 'auto',
        alignItems: 'center',
    },
    buttons: {
        marginBottom: '30px',
        marginTop: '100px',
    },
    servicebuttons: {
        height: "auto",
        width: "300px",
        fontSize: "18px",
        textAlign: "center",
        justifyContent: 'center',
        borderRadius: '50px',
        marginBottom: '5%',
        marginTop: '10%',
        whiteSpace: 'normal',
        wordWrap: 'break-word'
    },
    serviceRow: {
        marginRight: '15%',
        marginBottom: '5%',
        marginTop: '4%',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color:"black",
        fontSize:"60px",
        borderBottom: 'solid',
        borderWidth: '2px',
        borderColor: 'black'
    },
    description: {
        fontSize: '20px',
        color: 'black',
        width: '80%',
        marginTop: '5%'
    }
}

class Home extends Component {

    render() {
        let userButtons;

        if (!Auth.loggedIn()){
          userButtons =
          <Row style={stylesheet.buttons}>
            <Button href='/signup' bsStyle='primary' bsSize="lg" style={{height: "auto", width: "auto", fontSize: "18px", alignItems: "center", borderRadius: '50px'}}>
              NEW USERS
            </Button>
            <Button href={ect} bsStyle='primary' bsSize="lg" style={{height: "auto", width: "auto", fontSize: "18px", alignItems: "center", marginLeft: "50px", borderRadius: '50px'}}>
              EXISTING USERS
            </Button>
          </Row>
        } else {
          userButtons =
          <div>
            <Row flexGrow={1} style={stylesheet.serviceRow}>
              <Button href='/surgical-guide-main' bsStyle="primary" bsSize='lg' style={{height: "auto", width: "auto", fontSize: "18px", alignItems: "center", borderRadius: '50px'}}>
                  Surgical Guides
              </Button>
              <Button href='/mask-face-fitters' bsStyle="primary" bsSize='lg' style={{height: "auto", width: "auto", fontSize: "18px", alignItems: "center", marginLeft: "50px", borderRadius: '50px'}}>
                  Mask Fitters & Mask Loop Clasps
              </Button>
              <Button href="/3d-printed-models" bsStyle="primary" bsSize='lg' style={{height: "auto", width: "auto", fontSize: "18px", alignItems: "center", marginLeft: "50px", borderRadius: '50px'}}>
                  3D Printed Models
              </Button>
            </Row>
            <Row >
              <Button href='/alternate-source' bsStyle="outline-primary" bsSize='sm' style={{height: "auto", width: "auto", fontSize: "18px", borderRadius: '50px'}}>
                Alternate Source Scan Uploads
              </Button>
            </Row>
          </div>
        }
      return (
        <div>
        <Jumbotron style={stylesheet.banner}>
          <Row flexGrow={1} style={{width:'80%', marginLeft: '5%'}}>
            <Column flexGrow={1} style={{marginRight: '50px', marginTop: '25px'}}>
              <Row style={stylesheet.title}>
                <b>Precision Digital Dental Designs</b>
              </Row>
              <Row style={stylesheet.description}>
                Our goal at P3D (Precision Digital Dental Designs) is to make it easy for the digital dentist to upload their files
                and order services with a quick turn-around and affordable pricing. We specialize in digital treatment
                planning and surgical guide fabrication as well as 3D printing of dental models and appliances.
              </Row>
              {userButtons}
            </Column>
          </Row>
         </Jumbotron>
        </div>
      );
    }
}

export default Home
