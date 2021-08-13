import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Form, FormGroup, FormControl, HelpBlock, Checkbox, Radio, Button, Jumbotron, Col, ControlLabel} from 'react-bootstrap'
import { Row, Column } from 'simple-flexbox'
import AuthService from '../services/AuthService';
import banner from '../images/banner.png'
import aws from 'aws-sdk'
import apiConst from '../components/ApiUrl'
const apiUrl = apiConst.apiUrl

const Auth = new AuthService()
const loggedUser = getLoggedUser()

function getLoggedUser(){
    if(Auth.loggedIn()){
        return Auth.getUserId()
    }
}

const styles = {
    rows: {
        fontSize: '18px'
    },
    form: {
        justifyContent: 'left',
    },
    jumbo: {
        backgroundImage: 'url(' + banner + ')',
        width: '1703px',
        height: '630px',
        justifyContent: 'center',
        color: 'black'
    },
    formgroup: {
        marginLeft: '20%',
        width: 'auto',
    }
}

class RXFormMasks extends Component {
    constructor(){
        super()
        this.Auth = new AuthService()
        this.state={
          serviceType: 'Mask Face Fitters and Ear Loop Straps',
          doctor: '',
          email: '',
          case: 0,
          address: '',
          phone: '',
          patient: '',
          rxFormSuccess: false,
        }
      }

      componentWillMount(){
          //checks to see if the user accepted the license agreement, if not, sends back to service page
          if(typeof this.props.location.state == 'undefined' || !this.props.location.state.licenseAgreementAccepted){
              this.props.history.replace('/mask-face-fitters')
          }

          fetch(`${apiUrl}/users/${loggedUser}`).then((rawResponse)=>{
            return rawResponse.json()
          }).then((parsedResponse) => {
            let userData = parsedResponse
              this.setState({
                user_id: userData.id,
              });
          })

        let min = 1000000;
        let max = 9999999;
        let num = Math.floor(Math.random() * (max - min + 1)) + min;

        this.setState({case: num})
      }

      handleChange(e){
        this.setState({ [e.target.name]: e.target.value })
      }

      handleFormSubmit(event) {
          event.preventDefault();
          fetch(`${apiUrl}/rxforms`,
            {
              body: JSON.stringify({ rxform: this.state }),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }).then((res) => {
            if (res.status  !== 422) {
                let redirect = '/mask-face-fitters/upload/stl'
                this.props.history.push({
                    pathname: redirect,
                    state: {case: this.state.case, service: this.state.serviceType, licenseAgreementAccepted: this.state.licenseAgreementAccepted}
                })
            }
          });
      }

    render(){
        return(
            <Row>
            <Jumbotron style={styles.jumbo}>
                <Jumbotron style={{marginRight: '25%', marginLeft: '25%', marginTop: '5%', width: 'auto', backgroundColor: 'white', borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'}}>
                    <Form horizontal style={styles.form}>
                                <FormGroup style={styles.formgroup} controlId="formHorizontal">
                                    <Col componentClass={ControlLabel} sm={2}>Name</Col>
                                    <Col sm={7}>
                                        <FormControl
                                            name="doctor"
                                            type="text"
                                            value={this.state.doctor}
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup style={styles.formgroup} controlId="formHorizontal">
                                    <Col componentClass={ControlLabel} sm={2}>Email</Col>
                                    <Col sm={7}>
                                        <FormControl
                                            name="email"
                                            type="text"
                                            value={this.state.email}
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup style={styles.formgroup} controlId="formHorizontal">
                                    <Col componentClass={ControlLabel} sm={2}>Address</Col>
                                    <Col sm={7}>
                                        <FormControl
                                            name="address"
                                            type="text"
                                            value={this.state.address}
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup style={styles.formgroup} controlId="formHorizontal">
                                    <Col componentClass={ControlLabel} sm={2}>Phone Number</Col>
                                    <Col sm={7}>
                                        <FormControl
                                            name="phone"
                                            type="text"
                                            value={this.state.phone}
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>
                                <Row>
                                <Col sm={7}>
                                <FormGroup controlId="formControlsTextarea">
                                  <ControlLabel>
                                    <span style={{fontSize: '16px'}}>
                                    Please specify the names of the people receiving the masks, and how many each person will be receiving.
                                    NOTE: You may only receive up to FOUR (4) masks total per order.
                                    </span>
                                  </ControlLabel>
                                  <FormControl componentClass="textarea"
                                      placeholder="Jane Doe - 3, John Doe - 1"
                                      name="comment"
                                      type="text"
                                      value={this.state.comment}
                                      onChange={this.handleChange.bind(this)}
                                  />
                                </FormGroup>
                                </Col>
                                <Col sm={5} style={{marginTop: '30px'}}>
                                <FormGroup style={{display: 'flex', justifyContent: 'end', marginRight: '10%'}} controlId="formHorizontal">
                                  <Button onClick={this.handleFormSubmit.bind(this)} bsStyle="primary" bsSize="large">
                                    Next >
                                  </Button>
                                </FormGroup>
                                </Col>
                                </Row>
                    </Form>
                </Jumbotron>
            </Jumbotron>
            </Row>
        )
    }
}

export default RXFormMasks
