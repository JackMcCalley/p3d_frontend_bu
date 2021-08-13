import React, { Component, useState } from 'react'
import { Redirect } from 'react-router-dom'
import {Form, FormGroup, FormControl, HelpBlock, Radio, Button, Jumbotron, Col, Modal} from 'react-bootstrap'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import { Row, Column } from 'simple-flexbox'
import AuthService from '../services/AuthService';
import S3FileUpload, {uploadFile} from 'react-s3'
import Loader from 'react-loader-spinner'
import { Multiselect } from 'multiselect-react-dropdown'
import aws from 'aws-sdk'
import banner from '../images/banner.png'
import keysystem1 from '../images/keysystem1.PNG'
import keysystem2 from '../images/keysystem2.PNG'
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
        width: "100%",
        height: 'auto',
        justifyContent: 'center',
    },
    rx: {
        width: "90%", height: "90%",
        marginLeft: '5%', marginRight: '5%',
        backgroundColor: 'white',
        borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'
    },
    formgroup: {
        width: 'auto',
    }
}

class RXFormSurgicalGuides extends Component {
    constructor(){
        super()
        this.state={
          serviceType: "Surgical Guide",
          doctor: '',
          case: 0,
          address: '',
          email: '',
          phone: '',
          patient: '',
          toothSupportedGuide: false,
          tissueLevelGuide: false,
          boneReductionGuide: false,
          maxillary: false,
          mandibular: false,
          numberOfImplants: '1',
          anchorPins: '0',
          implantLocations: '',
          implantSystem: '',
          guidedSurgerySystem: '',
          drillLengths: '',
          keySizeOuterDiameter: '',
          comment: '',
          user_id: null,
          show: false,
          options: [
            {name: '1', id: '1'},
            {name: '2', id: '2'},
            {name: '3', id: '3'},
            {name: '4', id: '4'},
            {name: '5', id: '5'},
            {name: '6', id: '6'},
            {name: '7', id: '7'},
            {name: '8', id: '8'},
            {name: '9', id: '9'},
            {name: '10', id: '10'},
            {name: '11', id: '11'},
            {name: '12', id: '12'},
            {name: '13', id: '13'},
            {name: '14', id: '14'},
            {name: '15', id: '15'},
            {name: '16', id: '16'},
            {name: '17', id: '17'},
            {name: '18', id: '18'},
            {name: '19', id: '19'},
            {name: '20', id: '20'},
            {name: '21', id: '21'},
            {name: '22', id: '22'},
            {name: '23', id: '23'},
            {name: '24', id: '24'},
            {name: '25', id: '25'},
            {name: '26', id: '26'},
            {name: '27', id: '27'},
            {name: '28', id: '28'},
            {name: '29', id: '29'},
            {name: '30', id: '30'},
            {name: '31', id: '31'},
            {name: '32', id: '32'}
          ],
          drillOptions: [
            {name: '16', id: '16'},
            {name: '17', id: '17'},
            {name: '18', id: '18'},
            {name: '19', id: '19'},
            {name: '20', id: '20'},
            {name: '21', id: '21'},
            {name: '22', id: '22'},
            {name: '23', id: '23'},
            {name: '24', id: '24'},
            {name: '25', id: '25'},
          ],
          keySizeOptions: [
            {name: '4.0', id: '4.0'},
            {name: '4.1', id: '4.1'},
            {name: '4.2', id: '4.2'},
            {name: '4.3', id: '4.3'},
            {name: '4.4', id: '4.4'},
            {name: '4.5', id: '4.5'},
            {name: '4.6', id: '4.6'},
            {name: '4.7', id: '4.7'},
            {name: '4.8', id: '4.8'},
            {name: '4.9', id: '4.9'},
            {name: '5.0', id: '5.0'},
            {name: '5.1', id: '5.1'},
            {name: '5.2', id: '5.2'},
            {name: '5.3', id: '5.3'},
            {name: '5.4', id: '5.4'},
            {name: '5.5', id: '5.5'},
          ]
        }
      }

    componentWillMount(){
        if(typeof this.props.location.state == 'undefined' || !this.props.location.state.licenseAgreementAccepted){
            this.props.history.replace('/surgical-guides')
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
              let redirect = '/surgical-guides/upload/stl'
              this.props.history.push({
                  pathname: redirect,
                  state: {from: this.props.location.pathname, case: this.state.case, service: this.state.serviceType, licenseAgreementAccepted: this.props.location.state.licenseAgreementAccepted}
              })
          }
        });
    }

    //closes the modal
    handleClose() {
        this.setState({ show: false });
    }
    //shows the modal
    handleShow() {
        this.setState({ show: true });
    }

    onSelect(selectedList, selectedItem){
      this.setState({implantLocations: this.state.implantLocations += selectedItem.id.toString() + ', '})
    }

    onRemove(selectedList, selectedItem){
      this.setState({implantLocations: this.state.implantLocations.replace(selectedItem.id.toString() + ', ', '')})
    }

    onSelectDrill(selectedList, selectedItem){
      this.setState({drillLengths: this.state.drillLengths += selectedItem.id.toString() + ', '})
    }

    onRemoveDrill(selectedList, selectedItem){
      this.setState({keySizeOuterDiameter: this.state.keySizeOuterDiameter.replace(selectedItem.id.toString() + ', ', '')})
    }

    onSelectKeySize(selectedList, selectedItem){
      this.setState({keySizeOuterDiameter: this.state.keySizeOuterDiameter += selectedItem.id.toString() + ', '})
    }

    onRemoveKeySize(selectedList, selectedItem){
      this.setState({drillLengths: this.state.drillLengths.replace(selectedItem.id.toString() + ', ', '')})
    }

    render(){
      let nextButton;

      if(
        !this.state.mandibular &&
        !this.state.maxillary
      ){
        nextButton =
        <div>
          <FormGroup style={{display: 'flex', justifyContent: 'end', marginRight: '2%'}} controlId="formHorizontal">
            <Button disabled onClick={this.handleFormSubmit.bind(this)} bsStyle="primary">
                Next >
            </Button>
          </FormGroup>
        </div>
      } else if (
        this.state.implantSystem == '' ||
        this.state.doctor == '' ||
        this.state.address == '' ||
        this.state.email == '' ||
        this.state.phone == '' ||
        this.state.patient == '' ||
        this.state.numberOfImplants == '' ||
        this.state.anchorPins == '' ||
        this.state.implantLocations == '' ||
        this.state.guidedSurgerySystem == '' ||
        this.state.drillLengths == '' ||
        this.state.keySizeOuterDiameter == ''
      ){
        nextButton =
        <div>
          <FormGroup style={{display: 'flex', justifyContent: 'end', marginRight: '2%'}} controlId="formHorizontal">
            <Button disabled onClick={this.handleFormSubmit.bind(this)} bsStyle="primary">
                Next >
            </Button>
          </FormGroup>
        </div>
      } else if (
        !this.state.toothSupportedGuide &&
        !this.state.tissueLevelGuide &&
        !this.state.boneLevelGuide &&
        !this.state.boneReductionGuide
      ){
        nextButton =
        <div>
          <FormGroup style={{display: 'flex', justifyContent: 'end', marginRight: '2%'}} controlId="formHorizontal">
            <Button disabled onClick={this.handleFormSubmit.bind(this)} bsStyle="primary">
                Next >
            </Button>
          </FormGroup>
        </div>
      } else {
        nextButton =
        <div>
          <FormGroup style={{display: 'flex', justifyContent: 'end', marginRight: '2%'}} controlId="formHorizontal">
            <Button onClick={this.handleFormSubmit.bind(this)} bsStyle="primary">
                Next >
            </Button>
          </FormGroup>
        </div>
      }


        return(
            <Row>
            <Jumbotron style={styles.jumbo}>
              <Jumbotron style={styles.rx}>
              <Row style={{width: '50%', marginLeft: '25%', marginRight: '25%', fontSize: '30px', color: 'black', justifyContent: 'center'}}> Rx Form </Row>
              <Row style={{width: '50%', marginLeft: '25%', marginRight: '25%', fontSize: '16px', color: 'black', justifyContent: 'center'}}> (One guide per Rx) </Row>
                <Form horizontal style={styles.form}>
                  <Row>
                    <Col style={{width: "60%"}}>
                      <Row style={{color: 'black', fontSize: '20px'}}>Doctor's Information</Row>
                      <FormGroup style={styles.formgroup} controlId="formHorizontal">
                          <Col componentClass={ControlLabel} sm={2}>Doctor&#8217;s Name</Col>
                          <Col sm={5}>
                              <FormControl
                                  name="doctor"
                                  type="text"
                                  value={this.state.doctor}
                                  onChange={this.handleChange.bind(this)}
                              />
                          </Col>
                      </FormGroup>
                      <FormGroup style={styles.formgroup} controlId="formHorizontal">
                          <Col componentClass={ControlLabel} sm={2}>Doctor&#8217;s Email</Col>
                          <Col sm={5}>
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
                          <Col sm={5}>
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
                          <Col sm={5}>
                              <FormControl
                                  name="phone"
                                  type="text"
                                  value={this.state.phone}
                                  onChange={this.handleChange.bind(this)}
                              />
                          </Col>
                      </FormGroup>
                      <FormGroup style={styles.formgroup} controlId="formHorizontal">
                          <Col componentClass={ControlLabel} sm={2}>Patient</Col>
                          <Col sm={5}>
                              <FormControl
                                  name="patient"
                                  type="text"
                                  value={this.state.patient}
                                  onChange={this.handleChange.bind(this)}
                              />
                          </Col>
                      </FormGroup>
                      <Row style={{color: 'black', fontSize: '20px'}}>Surgical Guide Type</Row>
                          <FormGroup style={styles.formgroup} controlId="formHorizontal">
                              <Col componentClass={ControlLabel} sm={2}>Maxillary</Col>
                              <Col sm={1}>
                                  <input
                                      checked={this.state.maxillary == true}
                                      type="radio"
                                      onClick={() => this.setState({ maxillary: true, mandibular: false})}
                                  />
                              </Col>
                              <Col componentClass={ControlLabel} sm={2}>Mandibular</Col>
                              <Col sm={1}>
                                  <input
                                      checked={this.state.mandibular == true}
                                      type="radio"
                                      onClick={() => this.setState({ maxillary: false, mandibular: true})}
                                  />
                              </Col>
                          </FormGroup>
                      <Row style={{color: 'black', fontSize: '14px'}}>Partially Edentulous</Row>
                          <FormGroup style={styles.formgroup} controlId="formHorizontal">
                              <Col componentClass={ControlLabel} sm={2}>Tooth-Supported Guide</Col>
                              <Col sm={1}>
                                  <input
                                      checked={this.state.toothSupportedGuide == true}
                                      type="radio"
                                      onClick={() => this.setState({ boneReductionGuide: false, boneLevelGuide: false,
                                          tissueLevelGuide: false, toothSupportedGuide: true})}
                                  />
                              </Col>
                          </FormGroup>
                      <Row style={{color: 'black', fontSize: '14px'}}>Fully Edentulous</Row>
                      <FormGroup style={styles.formgroup} controlId="formHorizontal">
                        <Col componentClass={ControlLabel} sm={2}>Tissue-Level Guide</Col>
                        <Col sm={1}>
                          <input
                            checked={this.state.tissueLevelGuide == true}
                            type="radio"
                            onClick={() => this.setState({ boneReductionGuide: false, boneLevelGuide: false,
                                tissueLevelGuide: true, toothSupportedGuide: false})}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col>
                      <Row>
                        <FormGroup style={styles.formgroup} controlId="formHorizontal">
                        <Row style={{marginTop: '3%'}}>
                          <Col componentClass={ControlLabel} sm={8} style={{color: 'black', fontSize: '16px'}}>Number of Implants:</Col>
                          <Col sm={3}>
                            <FormControl
                              componentClass="select"
                              name="numberOfImplants"
                              type="text"
                              onChange={this.handleChange.bind(this)}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                            </FormControl>
                          </Col>
                        </Row>
                        <Row style={{marginTop: '3%'}}>
                          <Col componentClass={ControlLabel} sm={8} style={{color: 'black', fontSize: '16px'}}>Number of Anchor Pins:</Col>
                          <Col sm={3}>
                            <FormControl
                              componentClass="select"
                              name="anchorPins"
                              type="text"
                              onChange={this.handleChange.bind(this)}
                            >
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </FormControl>
                          </Col>
                        </Row>
                          <Row style={{marginTop: '3%'}}>
                            <Col componentClass={ControlLabel} sm={8} style={{color: 'black', fontSize: '16px'}}>
                              Implant Location(s) (Tooth numbers, choose all that apply):
                            </Col>
                            <Col style={{marginTop: '10px'}}>
                              <Multiselect
                                options={this.state.options}
                                isObject={true}
                                selectedValues={this.state.selectedValue}
                                onSelect={this.onSelect.bind(this)}
                                onRemove={this.onRemove.bind(this)}
                                displayValue="name"
                              />
                            </Col>
                          </Row>
                          <Row  style={{marginTop: '3%'}}>
                            <Col componentClass={ControlLabel} sm={8} style={{color: 'black', fontSize: '16px'}}>
                              Implant System:
                            </Col>
                            <Col>
                              <FormControl
                                name="implantSystem"
                                type="text"
                                value={this.state.implantSystem}
                                onChange={this.handleChange.bind(this)}
                              />
                            </Col>
                          </Row>
                          <Row  style={{marginTop: '3%'}}>
                            <Col componentClass={ControlLabel} sm={8} style={{color: 'black', fontSize: '16px'}}>
                                Guided Surgery System:
                            </Col>
                            <Col>
                              <FormControl
                                name="guidedSurgerySystem"
                                type="text"
                                value={this.state.guidedSurgerySystem}
                                onChange={this.handleChange.bind(this)}
                              />
                              <Button style={{marginTop: '5px', backgroundColor: 'steelblue', color: 'white'}} variant="primary" onClick={this.handleShow.bind(this)}>
                                Information We Need
                              </Button>
                              <Modal animation={false} show={this.state.show} onHide={this.handleClose.bind(this)}>
                                <Modal.Header >
                                  <Modal.Title>What Key System Will You Be Using?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{color: "black", fontSize: "14px"}}>
                                <div>
                                When manufacturing our guides, we use <b><i>guide sleeves</i></b> with specific inner diameters to
                                fit the keys to the guided surgical kit you will be using. The <b><i>inner diameter</i></b> of your
                                keys is usually labeled on the top of the key 2.3, 2.8, 3.4 etc.
                                We need the <b><i><u>outer</u></i></b> diameter of your keys to know which sleeve to use in your guide.
                                Please provide us with the name and manufacturer of your guided surgical kit and/or
                                measure your keys with digital calipers.
                                </div>
                                <img src={keysystem1} width="720px"/>
                                <p>
                                We also need to know the lengths of the <b><i>guided drills</i></b> you have available for your case.
                                Please include as much information as you can about your guided system in the “note” section of the Rx form.
                                </p>
                                <img src={keysystem2} width="720px"/>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                                    Close
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </Col>
                          </Row>
                          <Row style={{marginTop: '3%'}}>
                            <Col componentClass={ControlLabel} sm={8} style={{color: 'black', fontSize: '12px'}}>
                              Drill Lengths(mm) (choose all that apply)
                            </Col>
                            <Col>
                            <Multiselect
                              options={this.state.drillOptions}
                              isObject={true}
                              selectedValues={this.state.selectedValue}
                              onSelect={this.onSelectDrill.bind(this)}
                              onRemove={this.onRemoveDrill.bind(this)}
                              displayValue="name"
                            />
                            </Col>
                          </Row>
                          <Row  style={{marginTop: '3%'}}>
                            <Col componentClass={ControlLabel} sm={8} style={{color: 'black', fontSize: '12px'}}>
                              Key Size Outer Diameter (choose all that apply)
                            </Col>
                            <Col>
                              <Multiselect
                                options={this.state.keySizeOptions}
                                isObject={true}
                                selectedValues={this.state.selectedValue}
                                onSelect={this.onSelectKeySize.bind(this)}
                                onRemove={this.onRemoveKeySize.bind(this)}
                                displayValue="name"
                              />
                            </Col>
                          </Row>
                        </FormGroup>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col  componentClass={ControlLabel} sm={6} style={{color: 'black', fontSize: '16px'}}>
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
                  </Row>
                  <Row style={{display: 'flex', alignItems: 'right', justifyContent: 'end', marginBottom: '5%'}}>
                  {nextButton}
                  </Row>
                </Form>
              </Jumbotron>
            </Jumbotron>
            </Row>
        )
    }
}

export default RXFormSurgicalGuides
