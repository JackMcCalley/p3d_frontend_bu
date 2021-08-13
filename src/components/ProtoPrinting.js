import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Column, Row } from 'simple-flexbox';
import placeholder3 from '../images/placeholder3.png'

const styles = {
    row1: {
        marginBottom: "10px",
        fontSize: "32px"
    },
    row2: {
        fontSize: "16px",
        marginBottom: "15px"
    },
    button: {
        height: 'auto',
        width: "auto",
        fontSize: "24px",
        alignItems: "center"
    }
}

class ProtoPrinting extends Component {
    render(){
        return(
            <div>
                <Row>
                    <Column style={{marginLeft:"5%", width: "40%"}}>
                        <Row style={styles.row1}>
                            Prototype Printing
                        </Row>
                        <Row style={styles.row2}>
                            Whether for dental or non-dental projects, we can support your printing needs for objects under ??x??x?? mm (need size limitations). Send us your intra-oral
                            scan or impression and we can provide your printed model.
                        </Row>
                        <Row style={styles.row1}>
                            How to send us your design files (.stl).
                        </Row>
                        <Row style={styles.row2}>
                             Lorem ipsum dolor sit amet, vel nobis detracto vivendum ad.
                             Id nisl vero sed, deleniti vituperatoribus vix no. Cu mei probatus convenire repudiandae.
                             In vel sale reprimique, ne eum alia utinam quaestio, in novum aliquam vix.
                        </Row>
                        <Row style={{justifyContent: "center", paddingTop: '20px'}}>
                            <Button style={styles.button}href='/upload' bsStyle='danger' bsSize="large">UPLOAD FILES</Button>
                        </Row>
                    </Column>
                    <Column style={{marginTop:"50px", marginRight:"5%", marginLeft:"10%", width: "40%"}}>
                        <img alt="logo" width="600px" height="500px" src={placeholder3}/>
                    </Column>
                </Row>
            </div>
        )}

}

export default ProtoPrinting;
