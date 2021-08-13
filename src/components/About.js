import React, { Component } from 'react';
import '../css/About.css';
import {Jumbotron} from 'react-bootstrap';
import { Column, Row } from 'simple-flexbox';
import Russ from '../images/Russ.jpg'
import Jimmy from '../images/Jimmy.JPG'
import Patrick from '../images/Patrick.JPG'
import Dean from '../images/Dean.jpg'
import Zach3 from '../images/Zach3.jpg'
import graygradient from '../images/graygradient.jpg'

class About extends Component {

    render() {

        const styles = {
            bio1: {
                fontSize: '18px',
                width: '100%',
                marginTop: '10px',
                height: 'auto',
                justifyContent: 'left',
                width: '60%',
                marginRight: '150px'
            },
            name: {
                justifyContent: 'left',
                width: 'auto',
                height: 'auto',
                fontSize: '48px',
            },
            bio2: {
                justifyContent: 'left',
                width: '60%',
                marginRight: '150px'
            },
            jumbo: {
                backgroundImage: 'url(' + graygradient + ')',
                color: 'white'
            }
        }

      return (
              <div>
                  <body className="body">
                  <Row
                    justifyContent="center"
                    flexGrow={5}
                    style={{fontSize: "48px", backgroundColor: '#white', marginTop: '20px'}}>
                        ABOUT US
                  </Row>
                  <Row align='center' style={{width: '40%', marginLeft: '30%', marginRight: "30%",
                    borderTop: 'solid', borderWidth: '2px', borderColor: '#446E9B'}} />
                    <Jumbotron style={{backgroundColor: '#FFF'}}>
                    <Row flexGrow={1} style={{height: 'auto', fontSize: "24px", marginRight: '50px', textAlign: 'center',
                      paddingRight: '50px', marginLeft: '50px', marginBottom: '50px'}}>
                            P3D brings together clinical, laboratory and industry experience to provide you state-of-the-art digital products and services. Our team has decades of
                            experience with digital technologies including treatment planning and guided surgery. We are dedicated to helping clinicians integrate these technologies into
                            their practices to provide enhanced patient care. Having worked with some of the newest technologies in digital dentistry helps us provide other
                            clinicians with solutions in connectivity, digital workflow, and patient management. Whether you are
                            looking for answers to your own digital office or wish to upgrade, we can help to provide you with answers.
                    </Row>
                    <Row align='center' style={{width: '70%', marginLeft: '15%', marginRight: "15%",
                      borderTop: 'solid', borderWidth: '2px', borderColor: '#446E9B', marginBottom: '50px'}} />
                      <Jumbotron style={styles.jumbo}>
                          <Row>
                              <span style={styles.bio1}>
                                  <Row style={styles.name}>Zach Dalmau</Row><br />
                                  Zach Dalmau began his dental career in 2006 at the nSequence Center for Advanced Dentistry in Reno,
                                  Nevada. As the director of guided implant surgery and 3-D diagnostic imaging at nSequence, he played a
                                  key role in building the CT-guided implant surgery and 3-D diagnostic imaging departments from the
                                  ground up. In September 2009, he moved to Baltimore, Maryland, to work at Materialise Dental Inc.
                                  There, he managed the design and production of all SimPlant® SurgiGuides® for the North American
                                  market. Zach worked at Glidewell Laboratories from October 2011 to March 2018, where he played a
                                  key role in R&amp;D for the implant manufacturing division for the development of guided surgery
                                  instrumentation for their implant systems.
                              </span>
                              <Column>
                                <img height="300px" src={Zach3} />
                              </Column>
                          </Row>
                      </Jumbotron>
                      <Jumbotron style={styles.jumbo}>
                          <Row>
                              <span style={styles.bio1}>
                                  <Row style={styles.name}>James F. King</Row><br />
                                  James F. (Jimmy) King graduated from the University of Kentucky Community College system in 1981.
                                  Upon graduation he established a crown and bridge laboratory in a Tucson, Arizona dental office.
                                  After 5 years there he acquired Tres Lomas Dental Lab in Tucson and has maintained it for 33 years emphasizing esthetics,
                                  individual service and patient satisfaction.
                                  With over 30 years of implant experience, Jimmy has been involved with
                                  the evolution of Cad/Cam dentistry and embraced the advantages of
                                  digital technology.
                              </span>
                              <Column>
                                  <img src={Jimmy}/>
                              </Column>
                          </Row>
                      </Jumbotron>
                      <Jumbotron style={styles.jumbo}>
                          <Row>
                              <span style={styles.bio1}>
                                  <Row style={styles.name}>Patrick King</Row><br />
                                      Patrick King has over a decade of experience in digital dentistry.  In
                                      the Cad/Cam area, his focus has been in implant abutment, crown, and
                                      suprastructure design. He has extensive training in 3 Shape design
                                      software. Also he&apos;s versed in implant planning and surgical guide
                                      fabrication. He manages the digital printing department at Tres Lomas.
                              </span>
                              <Column>
                                  <img src={Patrick}/>
                              </Column>
                          </Row>
                      </Jumbotron>
                      <Row style={{justifyContent: 'center', width: '50%', marginLeft: '25%', fontSize: '36px'}}>
                        Advisory Staff
                      </Row>
                    <Jumbotron style={styles.jumbo}>
                        <Row>
                            <span style={styles.bio1}>
                                <Row style={styles.name}>Dean Saiki, DDS</Row><br />
                                    Dr. Saiki graduated from the University of Southern California School of Dentistry in 1988. He has
                                    maintained his private practice and lived in San Diego North county since 1990. As digital dentistry has advanced, he was an early adopter and
                                    has become proficient in utilizing these technologies in order to provide a higher quality of care to his patients.
                                    Today utilizing 3D printing he is able to place implants with a guided
                                    approach, restoring single teeth as well as complex fully edentulous
                                    fixed restorations with a minimally invasive surgical technique.
                            </span>
                            <Column>
                                <img src={Dean}/>
                            </Column>
                        </Row>
                    </Jumbotron>
                    <Jumbotron style={styles.jumbo}>
                        <Row>
                            <span style={styles.bio1}>
                                <Row style={styles.name}>Russell McCalley, DDS</Row><br />
                                    Dr. Russ McCalley brings with him a wealth of experience and knowledge from the private practice perspective.
                                    He graduated from the University of Southern California, School of Dentistry in 1988 and opened his practice in San Diego.
                                    He began his digital dentistry career 17 years ago with Cerec and single visit crowns, and has been placing and restoring implants in his office
                                    utilizing CBCT technology and guided surgery.
                            </span>
                            <Column>
                                <img src={Russ} />
                            </Column>
                        </Row>
                    </Jumbotron>
                    </Jumbotron>
                  </body>
              </div>
      );
    }

}

export default About
