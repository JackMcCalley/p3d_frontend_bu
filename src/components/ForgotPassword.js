import React, { Component } from 'react'
import {Jumbotron} from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import apiConst from '../components/ApiUrl'
const apiUrl = apiConst.apiUrl

class ForgotPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      loading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({ email: e.target.value })
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  loadingSpinner = (e) => {
    this.setState({loading: true})
    this.handleSubmit(e)
  }

  handleSubmit(e){
    if(this.state.email != ''){
      if(this.validateEmail(this.state.email)){

        fetch(`${apiUrl}/password/forgot/${this.state.email}`, {method: 'POST'}).then((res)=>{
          return res.json()
        }).then((parsedResponse)=>{
          let response = parsedResponse
          this.setState({loading: false})
          alert(response.message)
        })
        e.preventDefault();
      } else {
        this.setState({loading: false})
        alert('Please enter a valid email address.')
      }
    } else {
      this.setState({loading: false})
      alert('Please enter an email address.');
    }
  }

  render(){
    let button;
    const loading = this.state.loading;
    if(!loading){
      button =
        <input style={styles.submit} type='button' onClick={this.loadingSpinner} value='Submit' />
    } else {
      button =
      <div>
        <Loader
         type="Bars"
         color="gray"
         height="85"
         width="85"
        />
      </div>
    }
    return(
      <div style={styles.cont}>
        <Jumbotron style={styles.jumbo}>
          <div>Forgot your password? Please enter your email address below, and a
              link will be sent with further instructions on how to reset your password.
          </div>
          <form style={styles.input} onSubmit={this.handleSubmit}>
            Email Address: <input type='text' value={this.state.email} onChange={this.handleChange} />
            {button}
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
    backgroundColor: '#1F9BCF',
    color: 'white',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: '#1F9BCF',
    borderRadius: '30px'
  }
}
export default ForgotPassword
