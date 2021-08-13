<Row  flexGrow={1} style={{paddingRight: '50px', paddingLeft: '50px', paddingBottom: '50px', paddingTop: '30px'}}>
 <Column flexGrow={1} style={{paddingRight: '50px', paddingTop: '25px'}}>
  <Row style={{fontSize:"48px", width: '35%', paddingBottom: '10px', borderBottom: 'solid', borderWidth: '2px', borderColor: 'black'}}>
          Services
  </Row>
  <Row style={{justifyContent: 'center', paddingTop: '50px', width: '100%'}}>
  <Jumbotron style={{width: "90%", backgroundColor: '#effaff', justifyContent: "center"}}>
      <Row
        flexGrow={1}
        flexBasis='auto'
        horizontal='space-between'
        style={{justifyContent: "center"}}
      >
          <Column style={{marginRight: "3%", borderStyle: "solid", borderWidth: "5px", borderRadius: "5px", justifyContent: "center"}}>
              <a href="/guided-surgical-treatment-planning"><img alt="logo" width="250px" height="200px" src={placeholder1}/></a>
              <Row style={{fontSize:"16px", justifyContent: "center", backgroundColor: "white"}}>
                  Guided Surgery Treatment Planning
              </Row>
          </Column>
          <Column style={{backgroundColor: "white", marginRight: "3%", justifyContent: "center", borderStyle: "solid", borderWidth: "5px", borderRadius: "5px"}}>
              <a href="/surgical-implant-guide"><img alt="logo" width="250px" height="200px" src={placeholder2}/></a>
              <Row style={{fontSize:"16px", backgroundColor: "white", justifyContent: "center"}}>
                  Surgical Implant Guides
              </Row>
          </Column>
          <Column style={{backgroundColor: "white", marginRight: "3%", borderStyle: "solid", borderWidth: "5px", borderRadius: "5px", justifyContent: "center"}}>
              <a href="/ortho-bracket-guide"><img alt="logo" width="250px" height="200px" src={placeholder4}/></a>
              <Row style={{fontSize:"16px", justifyContent: "center", backgroundColor: "white"}}>
                  Orthodontic Bracket Guides
              </Row>
          </Column>
          <Column style={{backgroundColor: "white", borderStyle: "solid", borderWidth: "5px", borderRadius: "5px", justifyContent: "center"}}>
              <a href="/3d-printed-models"><img alt="logo" width="250px" height="200px" src={placeholder3}/></a>
              <Row style={{fontSize:"16px", justifyContent: "center", backgroundColor: "white"}}>
                  3D Printed Models
              </Row>
          </Column>
      </Row>
  </Jumbotron>
  </Row>
</Column>
</Row>
