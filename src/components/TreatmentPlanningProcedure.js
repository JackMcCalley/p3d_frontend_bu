import React, { Component } from 'react';
import {Jumbotron, Button } from 'react-bootstrap';
import { Column, Row } from 'simple-flexbox';


const styles = {
    row1: {fontSize: '20px', marginBottom: "3%", justifyContent: 'left'},
    row2: {
        fontSize: "16px",
        marginBottom: "15px",
        width: 'auto'
    },
    row3: {
        fontSize: "24px",
        marginBottom: "15px",
        color: 'black'
    },
    button: {
        height: 'auto',
        width: "auto",
        fontSize: "24px",
        alignItems: "center"
    },
    steps: {
        fontSize: "20px"
    },
    stepdesc: {
        marginLeft: "5%"
    },
    title: {
        fontSize: '40px',
        color: 'black'
    }
}

class TreatmentPlanningProcedure extends Component{
    render(){
        return(
          <Jumbotron style={{height: 'auto', width: 'auto', backgroundColor: 'white'}}>
            <Row style={styles.title}>
              How to send us your implant cases...
            </Row>
            <Row style={{color: 'black', fontSize: '20px'}}>
              <span>(<a style={{color: 'red'}} target="_blank" href="/treatment-planning-procedure/cerec">Click Here </a> for instructions on Cerec cases)</span>
            </Row>
            <Row style={styles.row2}>
              <Column style={{color: 'black'}}>
                <Row style={styles.row1}>
                  Impressions: Traditional or Digital
                </Row>
                  <Row style={styles.stepdesc}>
                    <li>Traditional Impressions:</li>
                  </Row>
                  <Row style={styles.stepdesc}>
                    <ol>
                      <li> Take accurate PVS impressions and a bite registration.</li>
                      <li> Send the impressions and bite along with the Lab Rx to P3D </li>
                    </ol>
                   </Row>
                  <Row style={styles.stepdesc}>
                    <li>Digital Impressions:</li>
                  </Row>
                  <Row style={styles.stepdesc}>
                    <ol>
                      <li> Take digital impression and bite using an open-source scanner that can export .stl files.</li>
                      <li>Upload the .stl file to P3D.</li>
                    </ol>
                  </Row>
                <Row style={styles.row1}>CBCT Scan</Row>
                <div style={styles.stepdesc}>
                  <li>
                    Fill out the digital Rx and upload a compressed (.zip) folder of the CBCT scan of your patient,
                    following the proper protocols (see  <a style={{color: 'red'}} href='/scanning-protocol'>
                    Scanning Protocols</a>).
                  </li>
                  <ul>
                    <a style={{color: 'red'}} href="/zip-instructions" target="_blank"><b><u>How To Compress Your Folder</u></b></a>
                  </ul>
                  <br/>
                </div>
                <Row style={styles.row1}>
                  You will receive a tentative treatment plan based on your Rx. Please scan and email the signed approval form to p3dguides@gmail.com.
                </Row>
                <Row style={styles.row1}>
                  Your surgical guide and drill report will be sent to you upon receipt of your approval form.
                </Row>
              </Column>
            </Row>
            <Row style={{justifyContent: "center", paddingTop: '20px'}}>
              <Button href={'/digital-treatment-planning'} style={styles.button} bsStyle='primary' bsSize="large">BACK</Button>
            </Row>
          </Jumbotron>
        )
    }
}

export default TreatmentPlanningProcedure;
