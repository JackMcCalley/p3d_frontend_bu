import React, { Component } from 'react'
import { Row, Jumbotron } from 'react-bootstrap'

const styles = {
    row1: {
        color: 'black',
        fontSize: '18px',
    },
    jumbo: {
        backgroundColor: 'white',
        marginLeft: "10%",
        height: 'auto'
    }
}

class Pricing extends Component {
    render(){
        return(
            <div>
            <Jumbotron style={styles.jumbo}>
            <Row style={{color: 'black'}}><h1>Pricing</h1></Row>
                <Row><h2>Surgical Guides</h2></Row>
                <Row style={styles.row1}>
                    <ul>
                        <li>Surgical Guides (No Treatment Planning) - $99 with 1 implant <br/></li>
                        <li>Additional Implants - $30 each</li>
                        <li>Anchor Pins - $70 (up to 3 included)</li>
                    </ul>
                </Row>
                <Row><h2>Surgical Guides With Digital Treatment Planning</h2></Row>
                <Row style={styles.row1}>
                    <ul>
                        <li>Treatment Planning with Guide (1 Implant) - $258</li>
                        <li>Each Additional Implant - $30</li>
                        <li>Anchor Pins (up to 3 included) - $70</li>
                    </ul>
                </Row>
                <Row><h2>Mask Face Fitters and Ear Loop Comfort Clasps</h2></Row>
                <Row style={styles.row1}>
                    <ul>
                        <li>Base (includes 4 fitters and 4 clasps) - $80</li>
                        <li>Additional Clasps - $5</li>
                    </ul>
                </Row>
                <Row><h2>3D Printed Models</h2></Row>
                <Row style={styles.row1}>
                    <ul>
                        <li>Model Without Base - $27</li>
                        <li>Model With Base - $37</li>
                    </ul>
                </Row>
            </Jumbotron>
            </div>
        )
    }
}

export default Pricing
