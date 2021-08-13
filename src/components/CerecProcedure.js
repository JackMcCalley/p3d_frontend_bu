import React, {Component} from 'react'
import {Row, Column, Jumbotron} from 'react-bootstrap'

class CerecProcedure extends Component {
  render(){
    return(
      <Jumbotron style={styles.jumbo}>
      <div style={styles.cerec}>
        <p>
          For Cerec users.
        </p>
        <p>
          If you own Cerec Omnicam and cannot find the .stl files to export, you must check with Sirona support
          (800) 659-5977 to see if you have the license. It’s a free addition but you will need to ask for it if
          you are unable to generate .stl files. They will email you a key code to activate in the license manager.
          It takes 1-2 days to receive the email.
        </p>
        <p>
          To see if you have the ability to export .stl files; after you scan the arches with your Omnicam,
          press the down arrow on the upper left and click the “Save as” button.
          The file should have a .stl file on the end. If it does not, click the down arrow on the file type
          (ssi,rst,dxd,stl) and see if you can select .stl. If .stl is not an option then you must request the license as outlined above.
          If the .stl file exists, you can save your case to the desktop or to a thumb drive for exporting after selecting .stl.
          The rest is made easy to follow by P3D.
        </p>
        <p>
          Additional note: Cerec makes you choose a restoration type in order to advance to the scanning window.
          Simply choose a crown for the implant position(s). After scanning, advance to the margin stage and place a
          small circle margin on the tissue where the implants will be placed. From there, press the down arrow on the upper left
          and the “Save as” button should be activated. You can then save your case to the desktop, or to a thumb drive, for uploading to P3D.
        </p>
      </div>
      </Jumbotron>
    )
  }
}

const styles = {
  cerec: {
    color: 'black',
    fontSize: '20px',
  },
  jumbo: {
    backgroundColor: 'white',
    height: 'auto',
    borderWidth: '5px',
    borderRadius: '30px',
    color: '#1F9BCF',
    borderStyle: 'solid',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  }
}

export default CerecProcedure
