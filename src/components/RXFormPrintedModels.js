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

class RXFormPrintedModels extends Component {
    constructor(props){
        super(props)
        this.Auth = new AuthService()
        this.state={
          serviceType: '3D Printed Models',
          doctor: '',
          case: 0,
          address: '',
          email: '',
          phone: '',
          patient: '',
          rxFormSuccess: false,
          licenseAgreementAccepted: false,
          mounted: true
        }
      }

      componentWillMount(){
        if(typeof this.props.location.state == 'undefined' || !this.props.location.state.licenseAgreementAccepted){
            this.props.history.replace('/3d-printed-models')
        } else {
          this.setState({mounted: true})
        }
      }

      componentDidMount(){
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

        this.setState({
          case: num,
          licenseAgreementAccepted: this.props.location.state.licenseAgreementAccepted
        })
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
                let redirect = '/printed-models/upload/stl'
                this.props.history.push({
                    pathname: redirect,
                    state: {
                      case: this.state.case, service: this.state.serviceType, licenseAgreementAccepted: this.state.licenseAgreementAccepted
                    }
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
                          <Col componentClass={ControlLabel} sm={2}>Doctor&#8217;s Name</Col>
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
                          <Col componentClass={ControlLabel} sm={2}>Doctor's Email</Col>
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
                              type="tel"
                              value={this.state.phone}
                              onChange={this.handleChange.bind(this)}
                            />
                          </Col>
                      </FormGroup>
                      <FormGroup style={styles.formgroup} controlId="formHorizontal">
                          <Col componentClass={ControlLabel} sm={2}>Patient</Col>
                          <Col sm={7}>
                              <FormControl
                                  name="patient"
                                  type="text"
                                  value={this.state.patient}
                                  onChange={this.handleChange.bind(this)}
                              />
                          </Col>
                      </FormGroup>
                      <Row>
                        <Col sm={7}>
                          <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Additional Comments</ControlLabel>
                              <FormControl componentClass="textarea"
                                  name="comment"
                                  type="text"
                                  value={this.state.comment}
                                  onChange={this.handleChange.bind(this)}
                              />
                          </FormGroup>
                        </Col>
                        <Col sm={5} style={{marginTop: '30px'}}>
                          <FormGroup style={{display: 'flex', justifyContent: 'right', marginRight: '10%'}} controlId="formHorizontal">
                              <Button onClick={this.handleFormSubmit.bind(this)} bsStyle="primary" bsSize="large">Next ></Button>
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

export default RXFormPrintedModels
