import React, { Component } from 'react'
import {FormGroup, FormControl, Button, Jumbotron, Alert, Modal, HelpBlock, ControlLabel } from 'react-bootstrap'
import { Row, Column } from 'simple-flexbox';
import Loader from 'react-loader-spinner'
import { Redirect, Link } from 'react-router-dom';
import blurredbanner from '../images/blurredbanner.jpg'
import LicenseAgreement from './LicenseAgreement.js'
import apiConst from '../components/ApiUrl'
const apiUrl = apiConst.apiUrl

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
        width: '500px',
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '0px',
        marginTop: '10%',
        marginBottom: '10%',
        color: 'black',
        alignItems: 'center'
    },
    form: {
        marginBottom: "5px",
        fontSize: '16px',
        marginLeft: '15%'
    },
    divstyle: {
        backgroundImage: "url(" + blurredbanner + ")",
        height: 'null',
        width: 'null',
    },
    link: {
      backgroundColor: 'lightblue',
      fontSize: '18px'
    }
}

class AltSource extends Component {
    constructor(props){
        super(props)
        this.state={
            loading: false,
            caseRetrieved: false,
            caseNotFound: false,
            thisCase: null,
            user: null,
            wrongCredentials: false,
            rightCredentials: false,
            licenseAgreementAccepted: false,
            show: false,
            form: {
                last_name: '',
                email: '',
                case: '',
            }
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event) {
      const formState = Object.assign({}, this.state.form);
      formState[event.target.name] = event.target.value;
      this.setState({ form: formState });
    }

    handleFormSubmit(event){
        this.setState({loading: true, caseNotFound: false})
        fetch(`${apiUrl}/rxform_by_case_number/${this.state.form.case}`).then((rawResponse) =>{
            return rawResponse.json()
        }).then((parsedResponse) => {
            if (typeof parsedResponse[0] !== "undefined"){
                this.setState({thisCase: parsedResponse[0], caseRetrieved: true})
            } else {
                this.setState({caseNotFound: true})
            }
        })
    }

    handleSecuritySubmit(event){
        this.setState({loading: true})
        fetch(`${apiUrl}/users/${this.state.thisCase.user_id}`).then((rawResponse) =>{
          return rawResponse.json()
        }).then((parsedResponse) => {
          if (this.state.form.email == parsedResponse.email && this.state.form.last_name == parsedResponse.last_name){
            this.setState({user: parsedResponse, rightCredentials: true, wrongCredentials: false, show: true})
          } else {
            this.setState({wrongCredentials: true})
          }
        })
    }

    //closes the modal
    handleClose() {
        this.setState({ show: false });
    }
    //shows the modal
    handleShow() {
        this.setState({ show: true });
    }
    //accepts the license agreement
    handleAccept(){
            this.setState({licenseAgreementAccepted: true, show: false, caseRetrieved: false})
    }

    render() {
        let formBox;
        let case404;
        let wrongCredentials;
        let uploadChoice;
        if (this.state.caseRetrieved){
            formBox =
            <div>
                <p align='center'><b>TO CONTINUE, PLEASE ENTER THE LAST NAME AND EMAIL ADDRESS OF YOUR CLIENT</b></p>
                <form>
                    <FieldGroup
                        name="last_name"
                        type="text"
                        placeholder="Doctor's Last Name"
                        style={{fontSize: "18px"}}
                        onChange={this.handleChange.bind(this)}
                        value={this.state.form.last_name}
                     />
                    <FieldGroup
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        style={{fontSize: "18px"}}
                        onChange={this.handleChange.bind(this)}
                        value={this.state.form.email}
                     />
                    <Button
                        bsStyle="info"
                        style={{ marginLeft: '30%', width: '40%', marginRight: '30%'}}
                        onClick={this.handleSecuritySubmit.bind(this)}
                    >
                    Submit
                    </Button>
                </form>
            </div>
        } else if(this.state.licenseAgreementAccepted){
            formBox =
            <div display='flex'>
              <p align='center'><b>WHICH TYPE OF FILE(S) WILL YOU BE UPLOADING?</b></p><br/>
                <Jumbotron align='center' style={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'white'}}>
                  <Link style={{fontSize: '18px', color: 'blue'}} to={{pathname: '/alternate-source/upload/stl',
                    state: {email: this.state.form.email, case: this.state.thisCase, stldcm: false,
                      licenseAgreementAccepted: this.state.licenseAgreementAccepted, dentist: this.state.form.email}}}>
                  .STL</Link>
                  <Link style={{fontSize: '18px', color: 'blue'}} to={{pathname: '/alternate-source/upload/dcm',
                    state: {email: this.state.form.email, case: this.state.thisCase, stldcm: false,
                      licenseAgreementAccepted: this.state.licenseAgreementAccepted, dentist: this.state.form.email}}}>
                  .DCM*</Link>
                  <Link style={{fontSize: '18px', color: 'blue'}} to={{pathname: '/alternate-source/upload/stl',
                    state: {email: this.state.form.email, case: this.state.thisCase, stldcm: true,
                      licenseAgreementAccepted: this.state.licenseAgreementAccepted, dentist: this.state.form.email}}}>
                  .STL & .DCM</Link>
                  <Link style={{fontSize: '18px', color: 'blue'}} to={{pathname: '/alternate-source/upload/stl2',
                    state: {email: this.state.form.email, case: this.state.thisCase, stldcm: true,
                      licenseAgreementAccepted: this.state.licenseAgreementAccepted, dentist: this.state.form.email}}}>
                  .STL X2</Link>
                </Jumbotron>
                <p>*If you are uploading more than one .dcm file for this case #, please combine them into a single compressed (.zip) folder first</p>
            </div>
        } else {
            formBox =
            <div>
                <p align='center'><b>PLEASE ENTER THE CASE NUMBER YOUR CLIENT HAS PROVIDED</b></p>
                <form>
                      <FieldGroup
                        name="case"
                        type="text"
                        placeholder="Case Number"
                        style={{fontSize: "18px"}}
                        onChange={this.handleChange.bind(this)}
                        value={this.state.form.case}
                        />
                        <Button
                        bsStyle="info"
                        style={{ marginLeft: '30%', width: '40%', marginRight: '30%'}}
                        onClick={this.handleFormSubmit.bind(this)}
                        >
                        Submit
                        </Button>
                </form>
            </div>
        }

        if (this.state.caseNotFound){
            case404 =
            <Alert style={{marginTop: '10px'}} bsStyle="danger" onDismiss={this.handleDismiss}>
               <h4>Case Not Found</h4>
               <p>
                    Please make sure you have entered the correct case number.
               </p>
            </Alert>
        }

        if (this.state.wrongCredentials){
          wrongCredentials =
          <Alert style={{marginTop: '10px'}} bsStyle="danger" onDismiss={this.handleDismiss}>
             <h4>Incorrect Information</h4>
             <p>
                  Please make sure you have entered the correct last name and email of your client.
             </p>
          </Alert>
        }

        return(
            <div style={styles.divstyle}>
            <Modal animation={false} show={this.state.show} onHide={this.handleClose} aria-labelledby="ModalHeader">
              <Modal.Header>
                <Modal.Title>Limitation of Liability</Modal.Title>
              </Modal.Header>
              <Modal.Body id='ModalHeader' style={{color: 'black'}}>
                <p>
                    P3d Inc is liable as a supplier of products. Since the circumstances in which these products are ordered
                    and used are under control of the buyer/dentist, the latter recognizes his responsibility for these
                    circumstances. On these grounds the remedies of the buyer/dentist are limited as follows.
                </p>
                <p>
                    The liability of P3D Inc. for real and proven damages will, regardless of the gravity of the failure, except
                    in case of fraud, be limited to the price of the product directly related to the reason of the claim.
                </p>
                <p>
                    Under no circumstances can an indemnity can be grounded on indirect damages such as, but not limited
                    to, loss of revenue, increase of expense, disturbance of planning, loss of customer or goodwill, loss of
                    benefits or expected savings or any other financial or commercial losses which are net direct and
                    immediate consequence of a shortcoming of P3D Inc. in its obligations.
                </p>
                <p>
                    Buyer/dentist agrees to control the conformity of any delivered product with his order, before using it.
                    Should buyer/dentist omit to perform such control or decide to nevertheless change from standard
                    recommended protocol of conformity which leads to possible failure of the dental procedure to which
                    the product was original intended, P3D Inc. is not liable.
                </p>
                <p>
                    I hereby request the manufacturing of a surgical template(s)/indirect bracket tray(s)/study
                    model(s) by P3D Inc. according to my pre-operative surgical plan. I declare having the qualifications
                    required by law to perform the planned intervention and take full medical responsibility for the design
                    and the application of the template(s) and or model(s). I further declare agreement to the limitation of
                    liability listed above.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleAccept.bind(this)}>Agree</Button>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
                <Row style={{justifyContent: 'center'}}>
                <Jumbotron style={styles.innerJumbo}>
                    {formBox}
                    {case404}
                    {wrongCredentials}
                </Jumbotron>
                </Row>
            </div>
        )
    }
}

export default AltSource
