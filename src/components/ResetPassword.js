import React, { Component } from 'react'
import {Jumbotron, Row, Col} from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import apiConst from '../components/ApiUrl'
const apiUrl = apiConst.apiUrl

class ResetPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        password: '',
        password_confirmation: ''
      },
      token: '',
      mounted: false,
      loading: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    let url = window.location.href.split('params=', 2)
    let token = url[1]
    this.setState({token: token, mounted: true})
  }

  handleChange(e){
    const formState = Object.assign({}, this.state.form);
    formState[e.target.name] = e.target.value;
    this.setState({ form: formState });
  }

  loadingSpinner = (e) => {
    this.setState({loading: true})
    this.handleSubmit(e)
  }

  handleSubmit(e){
    e.preventDefault()
    if(this.state.password == this.state.password_confirmation){
      fetch(`${apiUrl}/password/reset/${this.state.form.password}/${this.state.token}`,
        {
        method: 'POST',
        body: JSON.stringify({
          email: this.state.form.email,
          token: this.state.token,
          password: this.state.form.password})
        }
      )
      .then((res) => {
        this.setState({loading: false})
        this.props.history.replace('/login')
      })
    }
  }

  render(){
    const loading = this.state.loading
    let submit;
    let passwordAlert =
      <span style={{fontSize: '16px', color: 'red'}}>
      Please make sure your password has at least 1 capital letter, 1 number, and is at least 6 characters
      </span>

    if (this.state.password != this.state.password_confirmation && !loading){
      submit =
        <Row>
        <input style={styles.submit} type='button' onClick={this.loadingSpinner} value='Submit'/>
        </Row>
    } else if (this.state.password != this.state.password_confirmation && loading){
      submit =
      <Row style={{marginLeft: '35%', marginRight: '30%'}}>
        <Loader
         type="Bars"
         color="gray"
         height="85"
         width="85"
        />
      </Row>
    } else {
      submit =
        <Row>
        <input style={styles.submit} type='button' onClick={this.loadingSpinner} value='Submit'/>
        </Row>
    }
    return(
      <div style={styles.cont}>
        <Jumbotron style={styles.jumbo}>
          <h1>Password Reset
          </h1>
          <form style={styles.input} onSubmit={this.handleSubmit}>
            <Row>
            Password:
            </Row>
            <Row>
            <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
            </Row>
            <Row>
            Password Confirmation:
            </Row>
            <Row>
            <input type='password' name='password_confirmation' value={this.state.password_confirmation} onChange={this.handleChange} />
            </Row>
            <Row>
            {passwordAlert}
            </Row>
            {submit}
          </form>
        </Jumbotron>
      </div>
    )
  }
}

const styles = {
  jumbo: {
    justifyContent: 'center',
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '24px',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '10%',
    borderStyle: 'solid',
    borderWidth: '5px',
    borderColor: '#1F9BCF',
    borderRadius: '30px'
  },
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  input: {
    marginTop: '3%'
  },
  submit: {
    marginLeft: '5px',
    marginTop: '5px',
    backgroundColor: '#1F9BCF',
    color: 'white',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: '#1F9BCF',
    borderRadius: '30px'
  }
}

export default ResetPassword
