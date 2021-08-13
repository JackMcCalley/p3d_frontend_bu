import React, { Component } from 'react';
import {FormGroup, FormControl, HelpBlock, Button, Jumbotron, Alert, ControlLabel} from 'react-bootstrap'
import { Row, Column } from 'simple-flexbox';
import Loader from 'react-loader-spinner'
import { Redirect } from 'react-router-dom';
import Client from 'shopify-buy'
import blurredbanner from '../images/blurredbanner.jpg'
import '../css/App.css';
import apiConst from '../components/ApiUrl'
import storefrontAccessToken from './Shopify/Storefront.js'
const apiUrl = apiConst.apiUrl

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const client = Client.buildClient({
    storefrontAccessToken: `${storefrontAccessToken}`,
    domain: 'p3d-guides.myshopify.com'
});

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
          form: {
            email: '',
            first_name: '',
            last_name:'',
            address:'',
            phone_number:'',
            password: '',
            password_confirmation: '',
            cart_id: ''
          },
          newUserSuccess: false,
          loading: false,
          valid: false
        };
    }

    componentWillMount(){
        client.checkout.create().then((res) => {
            const formState = Object.assign({}, this.state.form);
            formState["cart_id"] = res.id;
            this.setState({form: formState})
        });
    }

    componentDidUpdate(){
        if (
            this.state.form.password.length >= 6 && /\d/.test(this.state.form.password) &&
            /^(?=.*[A-Z]).+$/.test(this.state.form.password) &&
            this.state.form.password_confirmation === this.state.form.password &&
            this.state.valid === false
        ){
            this.setState({valid: true})
        }
        if ( this.state.valid === true && (
            this.state.form.password.length < 6 || !/\d/.test(this.state.form.password) ||
            !/^(?=.*[A-Z]).+$/.test(this.state.form.password) ||
            this.state.form.password_confirmation !== this.state.form.password
            )
        ) {
            this.setState({valid: false})
        }
        return
    }

    handleChange(event) {
      const formState = Object.assign({}, this.state.form);
      formState[event.target.name] = event.target.value;
      this.setState({ form: formState });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        fetch(`${apiUrl}/users`,
          {
            body: JSON.stringify({ user: this.state.form }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }).then((res) => {
          if (res.status !== 422) {
            this.setState({
              newUserSuccess: true,
              show: false
            });
        } else {
            this.setState({
                show: true
            })
        }
        });
    }

    sendWelcomeEmail = () => {
      fetch(`${apiUrl}/welcome_email/${this.state.case}`, {
        method: 'GET',
      })
    }

    render() {
        const show = this.state.show
        let alert;
        let passwordAlert;
        let loading;
        let submit;
        if (show) {
            alert = <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                           <h4>Something has gone wrong...</h4>
                           <p>
                            Please check your password and email. You may have used this email before.
                           </p>
                        </Alert>
        }
        if(this.state.loading){
            loading =
            <Column style={{alignItems: 'center', width: '25%'}}>
            <Row>
                <Loader
                     type="Bars"
                     color="darkgray"
                     height="75"
                     width="100"
                 />
             </Row>
             </Column>
        }
        if(!this.state.valid){
            submit = <Button
                        disabled
                        bsStyle="info"
                        style={{marginTop: '5%', marginLeft: '30%', marginRight: '30%', width: '40%', fontSize: "18px"}}
                        type="submit"
                      >
                      Submit
                      </Button>
        } else if(this.state.valid){
            submit = <Button
                        bsStyle="info"
                        style={{marginTop: '5%', marginLeft: '30%', marginRight: '30%', width: '40%', fontSize: "18px"}}
                        type="submit"
                        >
                        Submit
                      </Button>
        }
        passwordAlert = <Jumbotron style={{fontSize: '16px', color: 'red'}}>
                          Please make sure your password has at least 1 capital letter, 1 number, and is at least 6 characters
                        </Jumbotron>

            return (
             <div style={styles.divstyle}>
             <Row justifyContent="center">
                 <Row style={{justifyContent: 'center'}}>
                   <Jumbotron style={styles.innerJumbo}>
                       <Row justifyContent="center" style={{fontSize: "32px", marginBottom: "20px"}}>
                          Register
                       </Row>
                         <form onSubmit={this.handleFormSubmit.bind(this)}>
                         <FieldGroup
                           id="formControlsEmail"
                           name="email"
                           type="email"
                           placeholder="Email Address"
                           width="500px"
                           style={{fontSize: "18px"}}
                           onChange={this.handleChange.bind(this)}
                           value={this.state.form.email}
                         />
                         <FieldGroup id="formControlsText"
                            placeholder="First Name"
                            name="first_name"
                            type="text"
                            style={{fontSize: "18px"}}
                            onChange={this.handleChange.bind(this)}
                            value={this.state.form.first_name}
                        />
                        <FieldGroup id="formControlsText"
                           placeholder="Last Name"
                           name="last_name"
                           type="text"
                           style={{fontSize: "18px"}}
                           onChange={this.handleChange.bind(this)}
                           value={this.state.form.last_name}
                       />
                       <FieldGroup id="formControlsText"
                           placeholder="Address"
                           name="address"
                           type="text"
                           style={{fontSize: "18px"}}
                           onChange={this.handleChange.bind(this)}
                           value={this.state.form.address}
                       />
                       <FieldGroup id="formControlsText"
                           placeholder="Phone Number"
                           name="phone_number"
                           type="text"
                           style={{fontSize: "18px"}}
                           onChange={this.handleChange.bind(this)}
                           value={this.state.form.phone_number}
                       />
                       <FieldGroup id="formControlsPassword"
                           placeholder="Password"
                           name="password"
                           type="password"
                           style={{fontSize: "18px"}}
                           onChange={this.handleChange.bind(this)}
                           value={this.state.form.password}
                       />
                       <FieldGroup id="formControlsPassword"
                           placeholder="Confirm Password"
                           name="password_confirmation"
                           type="password"
                           style={{fontSize: "18px"}}
                           onChange={this.handleChange.bind(this)}
                           value={this.state.form.password_confirmation}
                       />
                       {passwordAlert}
                       {alert}
                       {loading}
                       {submit}
                         </form>
                   </Jumbotron>
                   {this.state.newUserSuccess && <Redirect to="/login" />}
                 </Row>
             </Row>
            </div>
            );
    }
}

const styles = {
    innerJumbo: {
        width: '450px',
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '0px',
        marginTop: '10%',
        marginBottom: '10%',
        color: 'black'
    },
    form: {
        marginBottom: "5px",
        fontSize: '16px',
        marginLeft: '15%'
    },
    divstyle: {
        backgroundImage: "url(" + blurredbanner + ")",
        height: 'null',
        width: 'null',

    }
}

export default Signup
