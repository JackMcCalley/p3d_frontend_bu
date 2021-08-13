import React, {Component} from 'react'
import AuthService from '../services/AuthService'
import {Row, Col, Table, Button, Dropdown} from 'react-bootstrap'
import withAuth from './withAuth'
import apiConst from '../components/ApiUrl'
const apiUrl = apiConst.apiUrl

const Auth = new AuthService()
const loggedUser = getLoggedUser()

function getLoggedUser(){
    if(Auth.loggedIn()){
        return Auth.getUserId()
    }
}

export default class Admin extends Component {
  constructor(props){
    super(props)
    this.state = {
      tableBody: [],
      mounted: false,
      sort: "Recent",
      showMenu: false,
      thisUser: {}
    }

    this.showMenu = this.showMenu.bind(this);
    this.sortRecent = this.sortRecent.bind(this);
    this.sortCase = this.sortCase.bind(this);
    this.sortDoctor = this.sortDoctor.bind(this);
    this.sortPatient = this.sortPatient.bind(this);
    this.sortService = this.sortService.bind(this);
    this.getTable = this.getTable.bind(this)
  }

  componentWillMount(){
    fetch(`${apiUrl}/logged_user/${loggedUser}`).then((rawResponse) => {
      return rawResponse.json()
    }).then((parsedResponse) => {
      let user = parsedResponse
      if(user.role !== "Admin"){
        document.location.href="/"
      } else if (!this.state.mounted){
        this.getTable()
      }
    })
  }

  handleChange(e){
    this.setState({ sort: e.target.value })
  }

  sortRecent = () => {
    this.setState({sort: "Recent"})
  }

  sortCase = () => {
    this.setState({sort: "Case"})
  }

  sortPatient = () => {
    this.setState({sort: "Patient"})
  }

  sortDoctor = () => {
    this.setState({sort: "Doctor"})
  }

  sortService = () => {
    this.setState({sort: "Service"})
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  getTable(){
    fetch(`${apiUrl}/admin/${this.state.sort}`).then((rawResponse) =>{
      return rawResponse.json()
    }).then((parsedResponse) =>{
      let rxData = parsedResponse
      let rxForms = [];
      for(let i in rxData){
        let currentcase = rxData[i]
        rxForms.push({
          "createdAt": currentcase.created_at,
          "caseNumber": currentcase.case.toString(),
          "doctor": currentcase.doctor + " ",
          "address": currentcase.address + " ",
          "email": currentcase.email + " ",
          "phone": currentcase.phone + " ",
          "patient": currentcase.patient + " ",
          "toothSupportedGuide": currentcase.toothSupportedGuide + " ",
          "tissueLevelGuide": currentcase.tissueLevelGuide + " ",
          "hasStl": currentcase.hasStl + " ",
          "maxillary": currentcase.maxillary + " ",
          "mandibular": currentcase.mandibular + " ",
          "implantNum": currentcase.numberOfImplants + " ",
          "anchorPins": currentcase.anchorPins + " ",
          "implantLocations": currentcase.implantLocations + " ",
          "implantSystem": currentcase.implantSystem + " ",
          "guidedSurgerySystem": currentcase.guidedSurgerySystem + " ",
          "serviceType": currentcase.serviceType,
          "comment": currentcase.comment + " ",
        })
      }
      this.setState({
        tableBody: rxForms,
        mounted: true
      })
    })
  }

  renderRx(rx, index){
    let createdAt = new Date(rx.createdAt)
    let maxMan;
    let tsg;
    let tlg;
    let stl;
    if(rx.maxillary){
      maxMan=<td style={styles.cell}>Maxillary</td>
    } else if(rx.mandibular){
      maxMan=<td style={styles.cell}>Mandibular</td>
    }
    if(rx.toothSupportedGuide){
      tsg=<td style={styles.cell}>✓</td>
    } else {
      tsg=<td style={styles.cell}></td>
    }
    if(rx.tissueLevelGuide){
      tlg=<td style={styles.cell}>✓</td>
    } else {
      tlg=<td style={styles.cell}></td>
    }
    if(rx.hasStl){
      stl=<td style={styles.cell}>✓</td>
    } else {
      stl=<td style={styles.cell}></td>
    }
    return(
      <tr key={index}>
        <td style={styles.cell}>
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(createdAt)}
        </td>
        <td style={styles.cell}>{rx.caseNumber}</td>
        <td style={styles.cell}>{rx.doctor}</td>
        <td style={styles.cell}>{rx.address}</td>
        <td style={styles.cell}>{rx.email}</td>
        <td style={styles.cell}>{rx.phone}</td>
        <td style={styles.cell}>{rx.patient}</td>
        {tsg}
        {tlg}
        {stl}
        {maxMan}
        <td style={styles.cell}>{rx.implantNum}</td>
        <td style={styles.cell}>{rx.anchorPins}</td>
        <td style={styles.cell}>{rx.implantLocations}</td>
        <td style={styles.cell}>{rx.implantSystem}</td>
        <td style={styles.cell}>{rx.guidedSurgerySystem}</td>
        <td style={styles.cell}>{rx.serviceType}</td>
        <td style={styles.cell}>{rx.comment}</td>
      </tr>
    )
  }

  render(){
    if(this.state.mounted){
    return(
      <div style={styles.window}>
        <div style={{marginLeft: '6%'}}>
          <div style={{marginRight: '0%'}}>
            <button style={styles.button} onClick={this.showMenu}>
              Sort By: &#x25BC;
            </button>
            <span style={styles.sortText}>{this.state.sort}</span>
          </div>
          <button style={styles.submit} onClick={this.getTable}>Submit</button>
          <span style={{color: 'black'}}>Search by case number</span>
          <input type="text" onChange={this.handleChange.bind(this)}/>
          {
            this.state.showMenu
              ? (
                <div className="menu">
                  <button onClick={this.sortRecent} value="Recent" style={styles.button}> Most Recent </button>
                  <button onClick={this.sortDoctor} value="Doctor" style={styles.button}> Doctor </button>
                  <button onClick={this.sortPatient} value="Patient" style={styles.button}> Patient </button>
                  <button onClick={this.sortCase} value="Case" style={styles.button}> Case Number </button>
                  <button onClick={this.sortService} value="Service" style={styles.button}> Service Type </button>
                </div>
              )
              : (
                null
              )
          }
        </div>
        <Table striped hover responsive style={styles.table}>
          <thead>
            <tr>
              <th style={{width: '100px'}}>Created At</th>
              <th style={{width: '100px'}}>Case Number</th>
              <th style={{width: '100px'}}>Doctor</th>
              <th style={{width: '100px'}}>Address</th>
              <th style={{width: '100px'}}>Email</th>
              <th style={{width: '100px'}}>Phone</th>
              <th style={{width: '100px'}}>Patient</th>
              <th style={{width: '100px'}}>Tooth Supported Guide</th>
              <th style={{width: '100px'}}>Tissue Level Guide</th>
              <th style={{width: '100px'}}>Has .stl</th>
              <th style={{width: '100px'}}>Maxillary/Mandibular</th>
              <th># of Implants</th>
              <th>Anchor Pins</th>
              <th>Implant Locations</th>
              <th style={{width: '100px'}}>Implant System</th>
              <th style={{width: '100px'}}>Guided Surgery System</th>
              <th>Service Type</th>
              <th style={{width: '100px'}}>Comment</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableBody.map(this.renderRx)}
          </tbody>
        </Table>
      </div>
    )
  } else return(
    <div height="100vh">
    </div>
  )
  }
}

const styles = {
  window: {
    height: 'auto',
  },
  table: {
    width: '85%',
    height: 'auto',
    margin: "0 auto",
    color: 'black'
  },
  cell: {
    margin: '0 auto',
    color: 'black'
  },
  button: {
    borderRadius: '20px',
    borderColor: '#1F9BCF',
    borderStyle: 'solid',
    borderWidth: '1px',
    backgroundColor: '#1F9BCF',
    color: 'white',
    fontSize: '18px'
  },
  sortText: {
    color: 'black',
    marginLeft: '5px',
  },
  submit: {
    borderRadius: '20px',
    borderColor: '#1F9BCF',
    borderStyle: 'solid',
    borderWidth: '1px',
    backgroundColor: '#1F9BCF',
    color: 'white',
    fontSize: '18px'
  }
}
