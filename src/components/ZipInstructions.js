import React, { Component } from 'react'
import { Jumbotron, Col, Row, Button } from 'react-bootstrap'
import zip1 from '../images/zip1.JPG'
import zip2 from '../images/zip2.JPG'
import zip3 from '../images/zip3.JPG'

const styles = {
    title: {
        fontSize: '30px',
        marginLeft: '3%',
        color: 'black'
    },

}

export default class ZipInstructions extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Jumbotron style={{justifyContent: 'space-between', color: 'black', height: '100vp', backgroundColor: 'white'}}>
      <Col>
          <Row style={styles.title}><li>How to Compress (zip) your .dcm files for uploading:</li></Row>
          <Row>
            <Col style={{fontSize: '18px', marginLeft: '5%', width: '60%'}}>
              <Row style={{marginBottom: '15px', marginTop: '15px', fontSize: '24px'}}>
                Right click on your .dcm file that
                was saved to the desktop. Scroll down to “Send To” then left click the “Compressed (Zipped) folder”.
              </Row>
              <img src={zip1} alt="zip1"/>
            </Col>
          </Row>
          <Row style={styles.title}><li>You will then see the file being compressed</li></Row>
          <Row>
            <Col style={{marginLeft: '5%'}}>
              <img src={zip2} alt="zip2" />
            </Col>
          </Row>
          <Row style={styles.title}>
            <li>
            This is how the compressed folder will look once completed.
            It is now ready for uploading.
            </li>
          </Row>
          <Row>
              <Col style={{fontSize: '18px', marginLeft: '5%', width: '60%'}}>
                <img src={zip3} alt="zip3" />
              </Col>
          </Row>
          <Row style={{justifyContent: "center", paddingTop: '20px'}}>
              <Button href={'/digital-treatment-planning'} style={styles.button} bsStyle='primary' bsSize="large">BACK</Button>
          </Row>
      </Col>
      </Jumbotron>
    )
  }
}
