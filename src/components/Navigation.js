import React, { Component }  from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem'
import {Nav, NavItem, NavDropdown} from 'react-bootstrap'
import { Row, Column } from 'simple-flexbox'
import logo from '../images/logo.jpg';

const styles= {
    dropdown: {
        fontSize: "16px"
    }
}

class Navigation extends Component {

  render() {
    return (
        <Row style={{marginLeft: '5%'}}>
            <Column style={{width: '30%'}}>
                <img width="300px" src={logo}/>
            </Column>
            <Column style={{width: '70%'}}>
            <Nav bsStyle="pills" style={{color: 'black', justifyContent:'space-between', fontSize:'20px', textAlign: 'center'}}>
                <NavItem eventKey={1} href="/">
                    HOME
                </NavItem>
                <NavDropdown id="services" eventKey={2} title="SERVICES">
                  <MenuItem style={styles.dropdown} href='/surgical-guide-main' eventKey="2.1">Surgical Guides</MenuItem>
                  <MenuItem style={styles.dropdown} href='/mask-face-fitters' eventKey="2.2">Mask Face Fitters and Mask Loop Clasps</MenuItem>
                  <MenuItem style={styles.dropdown} href='/3d-printed-models' eventKey="2.3">3D Printed Models</MenuItem>
                  <MenuItem divider />
                  <MenuItem style={styles.dropdown}href='/pricing' eventKey={2.4}>Pricing</MenuItem>
                  <MenuItem style={styles.dropdown}href='/lab-support' eventKey="2.4">Lab Support</MenuItem>
                </NavDropdown>
                <NavItem eventKey={4} href="/about">
                    ABOUT
                </NavItem>
                <NavItem eventKey={6} href="/login">
                    LOGIN
                </NavItem>
                <NavDropdown id='contact' style={{fontSize:'16px'}} title="Contact P3D">
                    <MenuItem >Phone: (520) 751-3703</MenuItem>
                    <MenuItem >Email: P3Dguides@gmail.com</MenuItem>
                    <MenuItem>Address: 5600 South Old Spanish<br/> Trail, Tucson, AZ, 85747</MenuItem>
                </NavDropdown>
            </Nav>
            </Column>
        </Row>
    )
  }
};
export default Navigation
