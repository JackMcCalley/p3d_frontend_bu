import React, { Component } from 'react';
import {Jumbotron, Button, Modal } from 'react-bootstrap';
import { Column, Row } from 'simple-flexbox';
import orthoguidepic from '../images/orthoguidepic.png'
import BeigeModels from '../images/BeigeModels.jpg'

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
        marginBottom: "10px",
        borderRadius: '50px'
    },
    jumbo: {
        backgroundColor: 'white',
        height: 'auto'
    }
}

class Obg extends Component {
    constructor(props, context){
        super(props, context)

        this.state = {
            show: false,
            accepted: false
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
            this.props.history.push({
                pathname: '/rx-bracket-guides',
                state: {licenseAgreementAccepted: true}
            })
    }
    render(){
        return(
            <div>
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
            <Jumbotron style={styles.jumbo}>
                <Row>
                    <Column style={{marginTop: '3%', marginLeft:"5%", width: "40%"}}>
                        <Row style={styles.row1}>
                            Orthodontic Indirect Bracket Trays and Models
                        </Row>
                        <Row style={styles.row2}>
                            With the growing popularity of intra-oral scanning and digital planning, there are a number of printed items available to support your orthodontic practice.
                            These include indirect bracket trays and models to fabricate your own vacuum-formed aligners. If you have the design software, send us your design files (.stl)
                            and we can take care of your printing needs.
                        </Row>
                        <Jumbotron style={styles.jumbo}>
                            <Row style={styles.row3}>
                             <b><u> How to send us your ortho plan files…</u></b>
                            </Row>
                            <Row style={styles.row2}>
                                <li>Design your tray or models utilizing an open-source planning software.</li>
                            </Row>
                            <Row style={styles.row2}>
                                <li>Fill out the on-line Rx and upload your design file (.stl).</li>
                            </Row>
                            <Row style={styles.row2}>
                                <li>Your indirect bracket tray or models are sent to your office</li>
                            </Row>
                            <Row style={{justifyContent: "center", paddingTop: '20px'}}>
                                <Button onClick={this.handleShow} style={styles.button} bsStyle='primary' bsSize="large">SUBMIT CASE</Button>
                            </Row>
                        </Jumbotron>
                    </Column>
                    <Column style={{marginTop:"5%", marginRight:"10%", marginLeft:"10%", width: "40%", height: 'auto'}}>
                        <Row style={{justifyContent: "center"}}>
                            <img alt="logo" width="auto" height="350px" src={orthoguidepic}/>
                        </Row>
                        <Row style={{marginTop: '5%'}}>
                            <img alt="model"width="auto" height="450px" src={BeigeModels}/>
                        </Row>
                    </Column>
                </Row>
            </Jumbotron>
            </div>
        )}
}

export default Obg;
