import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Column } from 'simple-flexbox';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button, Form, Jumbotron} from 'react-bootstrap';
import S3FileUpload, {uploadFile} from 'react-s3'
import Loader from 'react-loader-spinner'
import aws from 'aws-sdk'
import AuthService from '../services/AuthService.js'
import '../css/App.css'

import apiConst from '../components/ApiUrl'
const apiUrl = apiConst.apiUrl

const Auth = new AuthService()
const loggedUser = getLoggedUser()

function getLoggedUser(){
  if(Auth.loggedIn()){
    return Auth.getUserId()
  }
}

class UploadDICOM extends Component {
    constructor(props){
        super(props)
        this.state={
            file: null,
            file2: null,
            fileUploadSuccess: false,
            user: null,
            case: this.props.location.state.case,
            service: this.props.location.state.service,
            uploadInfo: {
                uploaderName: '',
                uploaderId: '',
                filename: '',
            },
            fileSelected: false, //for the error message
            uploading: false,
            currentUrl: this.props.location.pathname,
            additionalFile: false
        }
        this.upload = this.upload.bind(this)
    }

    componentWillMount(){
      if(typeof this.props.location.state == 'undefined' || !this.props.location.state.licenseAgreementAccepted){
          this.props.history.replace('/')
      } else {
        fetch(`${apiUrl}/users/${loggedUser}`).then((rawResponse)=>{
          // rawResponse.json() returns a promise that we pass along
          return rawResponse.json()
        }).then((parsedResponse) => {
          // when this promise resolves, we can work with our data
          let userData = parsedResponse
          this.setState({
            user: userData,
            licenseAgreementAccepted: this.props.location.state.licenseAgreementAccepted,
            case: this.props.location.state.case
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
        let file = this.state.file
        let file2 = this.state.file2
        const config = {
            bucketName: 'p3dfiles',
            region: 'us-west-1',
            dirName: `${this.state.user.first_name}` + `${this.state.user.last_name}` + '/' + `${this.state.service}` + ' case#' + `${this.state.case}`,
            accessKeyId: `${aws}`,
            secretAccessKey: `${sak}`
        }
        this.setState({uploading: true})
        if(file2){
          S3FileUpload.uploadFile(file2, config)
        }
        S3FileUpload.uploadFile(file, config)
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
      })
    }

    onChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileSelected: true,
            uploader: this.state.user.first_name + " " + this.state.user.last_name,
            filename: e.target.files[0].name
            })
    }

    onChange2 = (e) => {
      this.setState({
        file2: e.target.files[0],
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

    additionalFile = () => {
      this.setState({additionalFile: true})
    }

    render() {
        let uploadSuccess;
        let fileSelected;
        let uploading;
        let checkZip;
        let fileInput;
        let addFiles;

        if (this.state.zipSelected){
          this.checkZip()
        }

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
          fileInput =
          <form>
            <input
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="Dicom Files"
              accept='.zip'
              onChange={this.onChange}
            />
          </form>

        if(this.state.fileUploadSuccess){
          uploadSuccess =
            <div>
                <h2>Upload Successful!</h2>
                <Link style={styles.nextLink} to={{pathname: "/services", state: {from: this.state.currentUrl, case: this.state.case}}}>
                     Next >
                </Link>
            </div>
        }
        if(this.state.fileSelected && !this.state.fileUploadSuccess){
          fileSelected =
          <Button style={styles.submit} type="submit" bsStyle='info' onClick={this.upload}>Submit</Button>
        }

        if(!this.state.additionalFile && !this.state.fileUploadSuccess){
          addFiles =
            <Button style={{marginTop: '20px', borderRadius: '30px'}} bsStyle='info' onClick={this.additionalFile}>
              Edentulous Case: .DCM File of Denture Only
            </Button>
        } else if (this.state.additionalFile){
          addFiles =
          <form>
            <input
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="Dicom Files"
              accept='.zip'
              onChange={this.onChange2}
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
                          DICOM Files
                        </h1>
                        <Button bsStyle="outline-primary" bsSize="large" style={styles.bypassLink} onClick={this.bypass}>
                          Files will be sent by third party
                        </Button>
                      </Column>
                      <Column style={styles.formColumn2}>
                        <div style={{marginTop: '5px', marginBottom: '20px', fontSize: '18px'}}>
                            <b>Your .dcm files MUST be compressed and in .zip format before upload.</b>
                        </div>
                        {fileInput}
                        {addFiles}
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
    marginRight: '20px'
  },
  formColumn2: {
    marginLeft: '15px',
    display: 'flex',
    alignItems: 'center'
  },
  submit: {
    borderRadius: '30px',
    width: '200px',
    marginBottom: '10px',
    marginTop: '20px'
  },
  nextLink: {
    fontSize: '32px',
    alignText: 'end',
    display: 'flex',
    justifyContent: 'end',
    color: '#1F9BCF',
    marginTop: '80px'
  },
  bypassLink: {
    borderRadius: '30px',
    marginTop: '50px',
    fontSize: "11px"
  },
  uploadRow:  {
    height: 'auto',
    display: 'flex'
  }
}

export default UploadDICOM
