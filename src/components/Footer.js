import React, {Component} from 'react';
import {Row} from 'simple-flexbox'

class Footer extends Component {
    render() {
        return(
          <div style={styles.info}>
            <Row style={styles.row1}>
              Precision Digital Dental Designs (P3D Guides) is a digital dental service that specializes
              in bracket guides and 3D printed models, and offers surgical guides and treatment planning as well.
              Dentistry is becoming more advanced every year, and staying up to date with the latest dental Technology
              is important for growing your dental practice. P3D Guides hopes to provide you with ways to get your 3d printed models,
              surgical guides, orthodontic bracket guides, and digital treatment planning to help you achieve this goal.
              Thank you for choosing Precision Digital Dental Designs! (P3D Guides)
            </Row>
            <Row style={styles.row2}>
              (520) 751-3703, 5600 South Old Spanish Trail, Tucson, AZ, 85747 &nbsp;&nbsp;
              This website designed and maintained by Jack McCalley (jackmccalley@gmail.com)
            </Row>
          </div>
        )
    }
}

const styles = {
  info: {
    color: 'gray',
    height: '80px',
    fontSize: '12px',
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    vertical: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
  },
  row1: {
    marginTop: '50px',
    justifyContent: 'center',
    marginLeft: '10%',
    marginRight: '10%'
  },
  row2: {
    marginTop: '25px',
    marginBottom: '50px',
    justifyContent: 'center',
    marginLeft: '10%',
    marginRight: '10%'
  }
}
export default Footer
