import React, { Component } from 'react';
import { Row, Column } from 'simple-flexbox';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button, Form} from 'react-bootstrap';
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

const config = {
    bucketName: 'p3dfiles',
    region: 'us-west-1',
    dirName: 'StlFiles',
    accessKeyId: '',
    secretAccessKey: ''
}

class Upload extends Component {
    constructor(props){
        super(props)
        this.state={
            file: null,
            fileUploadSuccess: false,
            user: null,
            uploadInfo: {
                uploaderName: '',
                uploaderId: '',
                filename: '',
            },
            fileNotSelected: false,
            uploading: false
        }
        this.upload = this.upload.bind(this)
        this.consolelog = this.consolelog.bind(this)
    }

    componentWillMount(){
        fetch(`${apiUrl}/users/${loggedUser}`).then((rawResponse)=>{
          // rawResponse.json() returns a promise that we pass along
          return rawResponse.json()
        }).then((parsedResponse) => {
          // when this promise resolves, we can work with our data
          let userData = parsedResponse
            this.setState({user: parsedResponse})
        })
    }

    upload(e){
        let file = this.state.file
        this.setState({fileNotSelected: false})
        this.setState({uploading: true})
        //Rename to patient or doctors name, TBD
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
                this.setState({fileNotSelected: true, uploading: false})
        })
    }

    onChange = (e) => {
        this.setState({
            file: e.target.files[0],
            uploader: this.state.user.first_name + " " + this.state.user.last_name,
            filename: e.target.files[0].name
            })
    }

    render() {
        let uploadSuccess;
        let fileNotSelected;
        let uploading;

        if(this.state.uploading){
            uploading =
            <Column style={{alignItems: 'center', width: '25%'}}>
            <Row style={{width: "auto" }}>Please wait, this may take a while...</Row>
            <Row>
                <Loader
                     type="Oval"
                     color="darkgray"
                     height="100"
                     width="100"
                 />
             </Row>
             </Column>
        }

        if(this.state.fileUploadSuccess){
            uploadSuccess =
                <div>
                <div>Upload Successful! Please continue to the next page for payment</div>
                <Button href="/services" params={{service: "surgicalguides"}} style={{marginTop: '10px'}}>Continue to payment</Button>
                </div>
        }
        if(this.state.fileNotSelected){
            fileNotSelected =
            <Row style={{fontSize: '18px', color: 'red'}}>
                Please Select A File First
            </Row>
        }
      return (
          <div>
                <Row justifyContent='center' style={{height: '700px'}}>
                    <Column style={{width: '50%', height: 'auto', marginTop: '30px', marginLeft: '5%', marginRight: '5%'}} alignItems='center'>
                        <h1>
                            STL Files
                        </h1>
                        <span>
                            Please choose your .stl file.
                        </span>
                        <form>
                            <input
                              style={{cursor: 'pointer'}}
                              id="formControlsFile"
                              type="file"
                              label="STL FILE"
                              accept='.stl'
                              onChange={this.onChange}
                            />
                        </form>
                        <Button type="submit" bsStyle='info' onClick={this.upload}>Submit</Button>
                        <Button onClick={this.consolelog}>Console</Button>
                        {fileNotSelected}
                        {uploadSuccess}
                        {uploading}
                    </Column>
                    <Column style={{width: '50%', height: 'auto', marginTop: '30px', marginLeft: '5%', marginRight: '5%'}} alignItems='center'>
                        <h1>
                            DICOM Files
                        </h1>
                        <span>
                            Please upload the .zip folder containing your .dcm files.
                        </span>
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
                        <Button type="submit" bsStyle='info' onClick={this.upload}>Submit</Button>
                        <Button onClick={this.consolelog}>Console</Button>
                        {fileNotSelected}
                        {uploadSuccess}
                        {uploading}
                    </Column>
                </Row>
          </div>
      );
    }
}

export default Upload
