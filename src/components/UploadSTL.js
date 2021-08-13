import React, { Component } from 'react';
import { Link }from 'react-router-dom'
import { Row, Column } from 'simple-flexbox';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button, Form, Jumbotron } from 'react-bootstrap';
import S3FileUpload, {uploadFile} from 'react-s3'
import Loader from 'react-loader-spinner'
import aws from 'aws-sdk'
import AuthService from '../services/AuthService.js'
import '../css/App.css';
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
  jumbo: {
    display: 'flex',
    height: '375px',
    width: '110%',
    borderRadius: '30px',
    borderStyle: 'solid',
    borderWidth: '5px',
    borderColor: '#1F9BCF',
    color: 'black',
    alignText: 'center',
    justifyContent: 'center'
  },
  formColumn1: {
    marginRight: '30px'
  },
  formColumn2: {
    marginLeft: '30px',
    display: 'flex',
    alignItems: 'center'
  },
  submit: {
    borderRadius: '30px',
    width: '200px',
    marginBottom: '10px'
  },
  nextLink: {
    fontSize: '32px',
    alignText: 'end',
    display: 'flex',
    justifyContent: 'end',
    color: '#1F9BCF',
    marginTop: '40px'
  },
  bypassLink: {
    borderRadius: '30px',
    marginTop: '50px',
    fontSize: "11px"
  },
  additionalButton: {

  }
}

class UploadSTL extends Component {
    constructor(props){
        super(props)
        this.state={
            mandFile: null,
            maxFile: null,
            fileUploadSuccess: false,
            user: null,
            case: '',
            service: '',
            hasStl: true,
            uploadInfo: {
                uploaderName: '',
                uploaderId: '',
                filename: '',
            },
            fileSelected: false,
            uploading: false,
            currentUrl: this.props.location.pathname,
            licenseAgreementAccepted: false,
            mounted: false
        }
        this.upload = this.upload.bind(this)
    }

    componentWillMount(){
        if(typeof this.props.location.state == 'undefined' || !this.props.location.state.licenseAgreementAccepted){
            this.props.history.replace('/')
        } else {
          this.setState({mounted: true})
        }
    }

    componentDidMount(){
      if(this.state.mounted){
        fetch(`${apiUrl}/users/${loggedUser}`).then((rawResponse)=>{
          // rawResponse.json() returns a promise that we pass along
          return rawResponse.json()
        }).then((parsedResponse) => {
          // when this promise resolves, we can work with our data
          let userData = parsedResponse
            this.setState({
              user: userData,
              licenseAgreementAccepted: this.props.location.state.licenseAgreementAccepted,
              hasStl: this.props.location.state.hasStl,
              case: this.props.location.state.case,
              service: this.props.location.state.service
            })
          })
      }
    }

    upload(e){
        fetch(`${apiUrl}/return_keys`).then((rawResponse)=>{
          return rawResponse.json()
        }).then((parsedResponse)=>{
          let aws = parsedResponse[0].value
          let sak = parsedResponse[1].value
          let maxFile = this.state.maxFile
          let mandFile = this.state.mandFile
          const config = {
              bucketName: 'p3dfiles',
              region: 'us-west-1',
              dirName: `${this.state.user.first_name}` + `${this.state.user.last_name}` + '/' + `${this.state.service}` + ' case#' + `${this.state.case}`,
              accessKeyId: `${aws}`,
              secretAccessKey: `${sak}`
          }
          this.setState({uploading: true})
          if(this.state.maxFile != null && this.state.mandFile == null){
              S3FileUpload.uploadFile(maxFile, config)
              .then( (data)=>{
                  this.setState({
                      fileUploadSuccess: true,
                      uploading: false,
                      uploadInfo: {
                          filename: this.state.filename,
                          uploaderId: this.state.user.id,
                          uploaderName: this.state.user.first_name + " " + this.state.user.last_name
                      }
                  })
              })
              .catch( (err)=>{
                  console.error(err);
                  if(err = "Error: \"File cannot be empty\"")
                      this.setState({fileSelected: true, uploading: false})
              })
          } else if (this.state.mandFile != null && this.state.maxFile == null){
              S3FileUpload.uploadFile(mandFile, config)
              .then( (data)=>{
                  this.setState({
                      fileUploadSuccess: true,
                      uploading: false,
                      uploadInfo: {
                          filename: this.state.filename,
                          uploaderId: this.state.user.id,
                          uploaderName: this.state.user.first_name + " " + this.state.user.last_name
                      }
                  })
              })
              .catch( (err)=>{
                  console.error(err);
                  if(err = "Error: \"File cannot be empty\"")
                      this.setState({fileSelected: true, uploading: false})
              })
          } else {
          S3FileUpload.uploadFile(maxFile, config)
          S3FileUpload.uploadFile(mandFile, config)
          .then( (data)=>{
              this.setState({
                  fileUploadSuccess: true,
                  uploading: false,
                  uploadInfo: {
                      filename: this.state.filename,
                      uploaderId: this.state.user.id,
                      uploaderName: this.state.user.first_name + " " + this.state.user.last_name
                  }
              })
          })
          .catch( (err)=>{
              console.error(err);
              if(err = "Error: \"File cannot be empty\"")
                  this.setState({fileSelected: true, uploading: false})
          })
        }
      })
    }

    onChangeMax = (e) => {
        this.setState({
            maxFile: e.target.files[0],
            fileSelected: true,
            uploader: this.state.user.first_name + " " + this.state.user.last_name,
            filename: e.target.files[0].name
            })
    }

    onChangeMand = (e) => {
        this.setState({
            mandFile: e.target.files[0],
            fileSelected: true,
            uploader: this.state.user.first_name + " " + this.state.user.last_name,
            filename: e.target.files[0].name
            })
    }

    bypass = () => {
      this.props.history.push({
        pathname: '/services',
        state: {from: this.state.currentUrl, case: this.state.case}
      })
    }

    bypassDigitalTreatment = () => {
      this.props.history.push({
        pathname: "/digital-treatment-planning/upload/dicom",
        state: {
          from: this.state.currentUrl, case: this.state.case, service: this.state.service,
          licenseAgreementAccepted: this.state.licenseAgreementAccepted
        }
      })
    }

    render() {
      let uploadSuccess;
      let fileSelected;
      let uploading;
      let bypassButton;
      let fileInputMand;
      let fileInputMax

      if(this.state.uploading){
          uploading =
          <Column style={{alignItems: 'center', width: '25%'}}>
          <Row style={{width: "auto" }}>Please wait, this may take a while...</Row>
          <Row>
              <Loader
                   type="Bars"
                   color="darkgray"
                   height="100"
                   width="100"
               />
           </Row>
           </Column>
      }

      if(this.state.fileUploadSuccess==true && this.state.currentUrl=="/surgical-guides/upload/stl"){
          uploadSuccess =
              <div>
                <h2>Upload Successful!</h2>
                <Link style={styles.nextLink} to={{pathname: "/services", state: {from: this.state.currentUrl, case: this.state.case}}}>
                     Next >
                </Link>
              </div>
      } else if(this.state.fileUploadSuccess==true && this.state.currentUrl=="/ortho-bracket-guide/upload/stl"){
          uploadSuccess =
              <div>
                <h2>Upload Successful!</h2>
                <Link style={styles.nextLink} to={{pathname: "/services", state: {from: this.state.currentUrl, case: this.state.case}}}>
                     Next >
                </Link>
              </div>
      } else if(this.state.fileUploadSuccess==true && this.state.currentUrl=="/printed-models/upload/stl"){
          uploadSuccess =
              <div>
                <h2>Upload Successful!</h2>
                <Link style={styles.nextLink} to={{pathname: "/services", state: {from: this.state.currentUrl, case: this.state.case}}}>
                     Next >
                </Link>
              </div>
      } else if(this.state.fileUploadSuccess==true && this.state.currentUrl=="/digital-treatment-planning/upload/stl"){
          if (this.state.hasStl==false){
              uploadSuccess =
                  <div>
                    <h2>Upload Successful!</h2>
                    <Link style={styles.nextLink} to={{pathname: "/services", state: {from: this.state.currentUrl, case: this.state.case}}}>
                         Next >
                    </Link>
                  </div>
              } else if(this.state.hasStl==true){
                  uploadSuccess =
                    <div>
                      <h2>Upload Successful!</h2>
                      <Link style={styles.nextLink} to={{pathname: "/digital-treatment-planning/upload/dicom", state: {from: this.state.currentUrl, case: this.state.case, service: this.state.service, licenseAgreementAccepted: this.state.licenseAgreementAccepted}}}>
                           Next >
                      </Link>
                    </div>
                  }
      }

      if(this.state.fileSelected && !this.state.fileUploadSuccess){
          fileSelected =
          <Button style={styles.submit} type="submit" bsStyle='info' onClick={this.upload}>Submit</Button>
      }

      if(this.state.currentUrl=="/digital-treatment-planning/upload/stl"){
        bypassButton =
        <Button bsStyle="outline-primary" bsSize="large" style={styles.bypassLink} onClick={this.bypassDigitalTreatment}>
          Files will be sent by third party
        </Button>
      } else {
        bypassButton =
        <Button bsStyle="outline-primary" bsSize="large" style={styles.bypassLink} onClick={this.bypass}>
          Files will be sent by third party
        </Button>
      }

      if(!this.state.fileUploadSuccess){
        fileInputMax =
        <form>
            <input
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChangeMax}
            />
        </form>
      } else {
        fileInputMax =
        <form>
            <input
              disabled
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChangeMax}
            />
        </form>
      }

      if(!this.state.fileUploadSuccess){
        fileInputMand =
        <form>
            <input
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChangeMand}
            />
        </form>
      } else {
        fileInputMand =
        <form>
            <input
              disabled
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChangeMand}
            />
        </form>
      }


      return (
          <div>
            <Row justifyContent='center' style={{height: '700px'}}>
                <Column style={{width: '50%', height: 'auto', marginTop: '30px', marginLeft: '5%', marginRight: '5%'}} alignItems='center'>
                  <Jumbotron style={styles.jumbo}>
                    <Row>
                      <Column style={styles.formColumn1}>
                        <h1>
                          STL Files
                        </h1>
                        {bypassButton}
                        </Column>
                        <Column style={styles.formColumn2}>
                          <span style={{marginTop: '5px'}}>
                            Please choose your MAXILLARY .stl file
                          </span>
                          {fileInputMax}
                          <span style={{marginTop: '20px'}}>
                            Please choose your MANDIBULAR .stl file
                          </span>
                          {fileInputMand}
                          {fileSelected}
                          {uploadSuccess}
                          {uploading}
                        </Column>
                      </Row>
                  </Jumbotron>
                </Column>
            </Row>
          </div>
      );
    }
}

export default UploadSTL
