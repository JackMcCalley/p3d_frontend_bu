import React, {Component} from 'react'
import {Row, Column} from 'simple-flexbox'
import {Jumbotron, Button} from 'react-bootstrap'

const styles = {
    row1: {
        fontSize: '36px',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        color: 'white',
        width: '40%',
        marginLeft: '30%'
    },
    row2: {
        fontSize: "20px",
        color: 'black'
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
        alignItems: "center",
        marginLeft: "10px",
        marginRight: "10px",
        marginBottom: "10px"
    },
    steps: {
        fontSize: "20px"
    },
    stepdesc: {
        marginLeft: "5%"
    },
    jumbo: {
        backgroundColor: 'white',
        height: '500px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderStyle: 'solid',
        borderWidth: '3px',
        borderRadius: '30px'
    }
}

class SurgicalGuideMain extends Component{
    render(){
        return(
                <div>
                    <Row style={styles.row1}>
                        Surgical Guide Options
                    </Row>
                    <Row style={{justifyContent: 'center', alignText: 'center', fontSize: '24px', color: 'black', width: '70%', marginLeft: '15%', marginTop: '3%', marginBottom: '3%'}}>
                        Guided surgery takes the guesswork out of planning and placing dental implants.
                        In order to develop and manufacture your surgical guide, you must have an accurate digital implant plan.
                    </Row>
                    <Row>
                    <Column style={{fontSize: "18px", justifyContent: 'center', marginLeft: '5%', marginRight: '5%', width: '40%'}}>
                        <Jumbotron style={styles.jumbo}>
                            <Row style={{fontSize: '26px', textAlign: 'center', justifyContent: 'center', backgroundColor: 'black', color: 'white', width: '100%'}}>
                                Digital Treatment Plan and Surgical Guide
                            </Row>
                            <Row style={styles.row2}>
                                <span>
                                    If you would like P3D to create a digital treatment plan and surgical guide, we must first have an approved surgical plan.
                                    In order for P3D to assist in planning your case, you
                                    must upload your patient’s CBCT scan (.dcm) and intraoral scan files (.stl), or send us your physical models.
                                </span>
                            </Row>
                            <Button href='/digital-treatment-planning' bsStyle='info' bsSize='lg' style={{fontSize: '20px', width: '40%', borderRadius: '15px', marginLeft: '30%',
                                justifyContent: 'end'}}>
                                Order
                            </Button>
                        </Jumbotron>
                    </Column>
                    <Column style={{fontSize: "18px", justifyContent: 'center', marginRight: '5%', marginLeft: '5%', width: '40%'}}>
                        <Jumbotron style={styles.jumbo}>
                            <Row style={{fontSize: '26px', textAlign: 'center', justifyContent: 'center', backgroundColor: 'black', color: 'white', width: '100%'}}>
                                Surgical Guide Only
                            </Row>
                            <Row style={styles.row2}>
                                <span>
                                    If you have already designed your guide via a third party software that can export an .stl file,
                                    P3D can manufacture your guide.
                                </span>
                            </Row>
                            <Button href='/surgical-guides' bsStyle='info' bsSize='lg' style={{fontSize: "20px", width: '40%', borderRadius: '15px', marginLeft: '30%'}}>
                                Order
                            </Button>
                        </Jumbotron>
                    </Column>
                    </Row>
                </div>
        )
    }
}

export default SurgicalGuideMain
