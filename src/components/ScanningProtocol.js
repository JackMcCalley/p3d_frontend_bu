import React, {Component} from 'react';
import { Row, Column } from 'simple-flexbox';
import { Jumbotron, Button} from 'react-bootstrap';
import edentulous from '../images/edentulous.png'

const styles = {
    title: {
        fontSize: '40px',
        marginLeft: '3%',
        color: 'black'
    },

}

class ScanningProtocol extends Component {
    render () {
        return(
            <Jumbotron style={{justifyContent: 'space-between', color: 'black',height: '100vp'}}>
            <Column>
                <Row style={styles.title}><b>Fully Edentulous CBCT Scanning Protocol</b></Row>
                    <Row>
                        <Column style={{fontSize: '20px', marginLeft: '5%', width: '60%'}}>
                            <Row style={{marginBottom: '15px', marginTop: '15px', fontSize: '24px'}}>
                                The accuracy of a surgical guide for a fully edentulous patient is dependent upon a well-adapted prosthesis.
                                Please evaluate the fit of your existing denture and reline or remake it before proceeding to the following steps.
                            </Row>
                            <ol>
                                     <li>Add six radiographic markers to the denture.</li>
                                     <li>Scan the patient following a dual scan protocol: <br/>
                                        <ul> - The patient is scanned wearing the denture containing the radiographic markers.</ul>
                                        <ul> - The denture containing the radiographic markers is scanned alone.</ul>
                                      </li>
                            </ol>
                        </Column>
                    </Row>
                    <Row style={styles.title}><b>Partially Edentulous CBCT Scanning Protocol</b></Row>
                        <Row>
                            <Column style={{fontSize: '20px', marginLeft: '5%', width: '60%'}}>
                                <ul>Scan selected arch with teeth slightly separated.</ul>
                            </Column>
                        </Row>
                    </Column>
                    <Row style={{justifyContent: "center", paddingTop: '20px'}}>
                        <Button href={'/digital-treatment-planning'} style={styles.button} bsStyle='primary' bsSize="large">BACK</Button>
                    </Row>
            </Jumbotron>
        )
    }
}

export default ScanningProtocol
