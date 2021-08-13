import React, { Component } from 'react';
import {Jumbotron, Button, Modal } from 'react-bootstrap';
import { Column, Row } from 'simple-flexbox';
import masks1 from '../images/masks1.jpg'
import masks2 from '../images/masks2.jpg'
import maskpic from '../images/maskpic.jpg'
import clasp from '../images/clasp.jpg'

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

class Masks extends Component {
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
                pathname: '/rx-form-masks',
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
                            Mask Face Fitter
                        </Row>
                        <Row style={styles.row2}>
                          The Mask Fitter is a customized 3D printed
                          plastic frame that is contoured to the specific
                          shape of a person&#39;s face to improve the seal of
                          surgical or similar face masks.
                        </Row>
                        <Row style={styles.row2}>
                          <u><strong>The mask fitter file can be generated with
                          Bellus3D&#39;s face scanning app on an iPhone X (and newer),
                          iPad Pro with FaceID capability, Android, and Windows.</strong></u>
                        </Row>
                        <Jumbotron style={styles.jumbo}>
                            <Row style={styles.row2}>
                                <ul>1. Download the Bellus3D app on your phone(Apple App Store,
                                <a style={{color: 'blue'}} target="_blank" href="https://www.bellus3d.com/developers/download"> Android and Windows Download Link</a>
                                )
                                </ul>
                            </Row>
                            <Row style={styles.row2}>
                                <ul>2. Scan your face by following app instructions. It takes about 10 seconds</ul>
                            </Row>
                            <Row style={styles.row2}>
                              <ul>
                                3. Once the capture is complete, in the
                                bottom right corner, press the &quot;Mask
                                Fitter&quot; button to generate the fitter model.
                              </ul>
                            </Row>
                            <Row style={styles.row2}>
                              <ul>
                              4. Press the &quot;export&quot; button in the bottom
                              right to send the .stl file to your computer.
                              You can do this by choosing the email option, and then opening the mail with the
                              .stl attachment on your computer.
                              </ul>
                            </Row>
                            <Row style={styles.row2}>
                              <ul>
                                5. Only choose the "Standard" mask fitter so your name will be printed on the frame.
                                Click on the submit order button below,
                                fill out your order and upload your .stl file.
                              </ul>
                            </Row>
                            <Row style={styles.row2}>
                              <ul>
                                6. Press the <strong>export</strong> button and send the .stl file to your email address.
                                Then, download the .stl file to your computer to upload to our site.
                              </ul>
                            </Row>
                            <Row style={{justifyContent: "center", paddingTop: '20px'}}>
                              <Button onClick={this.handleShow} style={styles.button} bsStyle='primary' bsSize="large">SUBMIT CASE</Button>
                            </Row>
                        </Jumbotron>
                    </Column>
                    <Column style={{marginTop:"5%", marginRight:"10%", marginLeft:"10%", width: "40%", height: 'auto'}}>
                        <Row style={{justifyContent: "center"}}>
                          <img  alt="mask 1" width="auto" height="500px" src={maskpic}/>
                        </Row>
                        <Column style={{marginTop: "10%"}}>
                        <Row style={styles.row1}>
                          Mask Loop Clasps
                        </Row>
                        <Row style={styles.row2}>
                          The Mask Loop Clasp is a simple device that connects the ear loops behind the head pulling the mask tighter to the face.
                          This is considerably more comfortable because it takes the tension away from the back of the ears.
                          Compatible with all current disposable medical masks. It should be disinfected after every use.
                        </Row>
                        <Row style={{justifyContent: "center", marginTop: '30px'}}>
                          <img alt="Mask Loop Clasp" width="auto" height="200px" src={clasp}/>
                        </Row>
                        </Column>
                    </Column>
                </Row>
            </Jumbotron>
            </div>
        )}
}

export default Masks;
