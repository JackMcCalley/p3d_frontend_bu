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

class UploadMasks extends Component {
    constructor(props){
        super(props)
        this.state={
            file1: {},
            file2: {},
            file3: {},
            file4: {},
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
            mounted: false,
            count: 0
        }
        this.upload = this.upload.bind(this)
    }

    componentWillMount(){
        if(typeof this.props.location.state == 'undefined' || this.props.location.state.licenseAgreementAccepted){
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
          let file1 = this.state.file1
          let file2 = this.state.file2
          let file3 = this.state.file3
          let file4 = this.state.file4
          const config = {
              bucketName: 'p3dfiles',
              region: 'us-west-1',
              dirName: `${this.state.user.first_name}` + `${this.state.user.last_name}` + '/' + `${this.state.service}` + ' case#' + `${this.state.case}`,
              accessKeyId: `${aws}`,
              secretAccessKey: `${sak}`
          }
          this.setState({uploading: true})

          if(this.state.file1 != null)(
            S3FileUpload.uploadFile(file1, config)
          )
          if(this.state.file2 != null)(
            S3FileUpload.uploadFile(file2, config)
          )
          if(this.state.file3 != null)(
            S3FileUpload.uploadFile(file3, config)
          )
          if(this.state.file4 != null)(
            S3FileUpload.uploadFile(file4, config)
          )
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
              alert(err);
              if(err = "Error: \"File cannot be empty\"")
                  this.setState({fileSelected: true, uploading: false})
          })
      })
    }

    onChange1 = (e) => {
        this.setState({
            file1: e.target.files[0],
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

    onChange3 = (e) => {
        this.setState({
            file3: e.target.files[0],
            fileSelected: true,
            uploader: this.state.user.first_name + " " + this.state.user.last_name,
            filename: e.target.files[0].name
            })
    }

    onChange4 = (e) => {
        this.setState({
            file4: e.target.files[0],
            fileSelected: true,
            uploader: this.state.user.first_name + " " + this.state.user.last_name,
            filename: e.target.files[0].name
            })
    }

    render() {
      let uploadSuccess;
      let fileSelected;
      let uploading;
      let bypassButton;
      let fileInput1;
      let fileInput2;
      let fileInput3;
      let fileInput4;

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

      if(this.state.fileUploadSuccess==true){
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
        fileInput1 =
        <form>
            <input
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChange1}
            />
        </form>
      } else {
        fileInput1 =
        <form>
            <input
              disabled
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChange1}
            />
        </form>
      }

      if(!this.state.fileUploadSuccess){
        fileInput2 =
        <form>
            <input
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChange2}
            />
        </form>
      } else {
        fileInput2 =
        <form>
            <input
              disabled
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChange2}
            />
        </form>
      }

      if(!this.state.fileUploadSuccess){
        fileInput3 =
        <form>
            <input
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChange3}
            />
        </form>
      } else {
        fileInput3 =
        <form>
            <input
              disabled
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChange3}
            />
        </form>
      }

      if(!this.state.fileUploadSuccess){
        fileInput4 =
        <form>
            <input
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChange4}
            />
        </form>
      } else {
        fileInput4 =
        <form>
            <input
              disabled
              style={{cursor: 'pointer'}}
              id="formControlsFile"
              type="file"
              label="STL FILE"
              accept='.stl'
              onChange={this.onChange4}
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
                        </Column>
                        <Column style={styles.formColumn2}>
                          <span style={{marginTop: '5px'}}>
                            Please select up to four .stl files, one per person receiving the masks.
                          </span>
                          <Row>
                          {fileInput1}
                          </Row>
                          <Row>
                          {fileInput2}
                          </Row>
                          <Row>
                          {fileInput3}
                          </Row>
                          <Row>
                          {fileInput4}
                          </Row>
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

export default UploadMasks
