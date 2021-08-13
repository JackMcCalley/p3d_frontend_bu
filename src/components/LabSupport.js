import React, { Component } from 'react'
import { Column, Row } from 'simple-flexbox';
import {Jumbotron} from 'react-bootstrap'
import labsupportpic from '../images/labsupportpic.jpg'
import treslomas from '../images/treslomas.jpg'

const styles = {
    row1: {
        marginBottom: "10px",
        marginLeft: "10px",
        fontSize: '36px',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        color: 'white'
    },
    row2: {
        fontSize: "20px",
        marginBottom: "15px",
        marginLeft: "10px",
        color: 'black'
    },
    button: {
        height: 'auto',
        width: "auto",
        fontSize: "24px",
        alignItems: "center"
    }
}

class LabSupport extends Component {
    render(){
        return(
            <div>
                <Row style={{justifyContent: 'center', marginBottom: '10%'}}>
                    <Column style={{marginTop: '50px', marginLeft:"5%", width: "40%"}}>
                        <Row style={styles.row1}>
                            Lab Support
                        </Row>
                        <Row style={styles.row2}>
                            P3D has partnered with Tres Lomas Lab to provide restoratively-driven support for your implant cases. With 35 years of experience and expertise, Tres
                            Lomas Lab is dedicated to providing the highest quality restorations and service to dentists throughout North America. Utilizing the latest
                            technologies, Tres Lomas’ dedicated staff offers doctors and their patients a wide variety of superior crown and bridge restorative options.
                        </Row>
                        <Row style={styles.row2}>
                            <span>
                             To send a case to the laboratory click <a style={{color:'red'}} href='http://www.treslomasdentallab.com/' target="_blank">here</a>.
                             </span>
                        </Row>
                    </Column>
                    <Column style={{marginRight:"5%", marginLeft:"10%", width: "40%", justifyContent: 'center'}}>
                            <img alt="Tres Lomas" width="auto" src={treslomas}/>
                    </Column>
                </Row>
            </div>
        )}

}

export default LabSupport;
