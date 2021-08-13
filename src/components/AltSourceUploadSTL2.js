import React, { Component } from 'react';
import { Link, Redirect }from 'react-router-dom'
import { Row, Column } from 'simple-flexbox';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button, Form, Jumbotron} from 'react-bootstrap';
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
    width: '130%',
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
    marginTop: '100px'
  },
  bypassLink: {
    borderRadius: '30px',
    marginTop: '50px',
    fontSize: "11px"
  }
}

class AltSourceUploadSTL2 extends Component {
    constructor(props){
        super(props)
        this.state={
            maxFile: null,
            mandFile: null,
            fileUploadSuccess: false,
            user: null,
            case: null,
            service: '',
            uploadInfo: {
                uploaderName: '',
                uploaderId: '',
                filename: '',
            },
            fileSelected: false,
            uploading: false,
            currentUrl: this.props.location.pathname,
            licenseAgreementAccepted: false,
        }
        this.upload = this.upload.bind(this)
    }

    componentWillMount(){
        if(typeof this.props.location.state == 'undefined' || !this.props.location.state.licenseAgreementAccepted){
            this.props.history.replace('/alternate-source')
        }
        fetch(`${apiUrl}/user_by_email/${this.props.location.state.email}`).then((rawResponse)=>{
          return rawResponse.json()
        }).then((parsedResponse) => {
          let userData = parsedResponse[0]
          this.setState({user: userData, licenseAgreementAccepted: this.props.location.state.licenseAgreementAccepted,
             case: this.props.location.state.case.case, service: this.props.location.state.case.serviceType,
             dentist: this.props.location.state.dentist})
        })
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
        S3FileUpload.uploadFile(maxFile, config)
        S3FileUpload.uploadFile(mandFile, config)
        .then( (data)=>{
          fetch(`${apiUrl}/alt_src_email/${this.state.case}`, {
            method: 'GET',
          })
          fetch(`${apiUrl}/user_by_email/${this.state.dentist}`).then((rawResponse)=>{
            return rawResponse.json()
          }).then((parsedResponse) => {
            let userData = parsedResponse[0]
            fetch(`${apiUrl}/alt_source_dentist_email/${userData.id}`, {
              method: 'GET',
            })
            this.setState({
                fileUploadSuccess: true,
                uploading: false,
                fileSelected: false,
                uploadInfo: {
                    filename: this.state.filename,
                    uploaderId: this.state.user.id,
                    uploaderName: this.state.user.first_name + " " + this.state.user.last_name
                }
            })
          })
        })
        .catch( (err)=>{
            console.error(err);
            if(err = "Error: \"File cannot be empty\"")
                this.setState({fileSelected: true, uploading: false})
        })
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

    render() {
        let uploadSuccess;
        let fileSelected;
        let uploading;

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

        if(this.state.fileUploadSuccess==true && this.state.currentUrl=="/alternate-source/upload/stl2"){
          uploadSuccess =
              <div>
                  <Redirect to="/alternate-source/upload/complete"/>
              </div>
        }
        if(this.state.fileSelected && !this.state.fileUploadSuccess){
            fileSelected =
            <Button type="submit" bsStyle='info' onClick={this.upload}>Submit</Button>
        }
      return (
        <Row justifyContent='center' style={{height: '700px'}}>
          <Column style={{width: '50%', height: 'auto', marginTop: '30px', marginLeft: '5%', marginRight: '5%'}} alignItems='center'>
            <Jumbotron style={styles.jumbo}>
              <Row>
                <Column style={styles.formColumn1}>
                  <h1>
                    STL Files
                  </h1>
                  </Column>
                  <Column style={styles.formColumn2}>
                    <span style={{marginTop: '5px'}}>
                      Please choose your MAXILLARY .stl file
                    </span>
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
                    <span style={{marginTop: '20px'}}>
                      Please choose your MANDIBULAR .stl file
                    </span>
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
                    {fileSelected}
                    {uploadSuccess}
                    {uploading}
                  </Column>
                </Row>
            </Jumbotron>
          </Column>
        </Row>
      );
    }
}

export default AltSourceUploadSTL2
