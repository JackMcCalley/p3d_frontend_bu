import React, { Component } from 'react'
import { Jumbotron, Row, Button, Label } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import Cart from './Shopify/Cart'
import LineItem from './Shopify/LineItem'
import Client from 'shopify-buy'
import AuthService from '../services/AuthService'
import withAuth from './withAuth'
import apiConst from '../components/ApiUrl'
import storefrontAccessToken from './Shopify/Storefront.js'
const sfat = storefrontAccessToken.sfat

const apiUrl = apiConst.apiUrl

const Auth = new AuthService()
const loggedUser = getLoggedUser()

function getLoggedUser(){
    if(Auth.loggedIn()){
        return Auth.getUserId()
    }
}

const client = Client.buildClient({
    storefrontAccessToken: `${sfat}`,
    domain: 'p3d-guides.myshopify.com'
})

const styles = {
  jumbo: {
    display: "flex",
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'white',
  }
}

class PurchaseCompleteConfirmation extends Component {
  constructor(props){
    super(props)
    this.state={
      user: null,
      mounted: false,
      cartCleared: false,
      cartId: '',
      loading: true
    }
  }

  componentWillMount(){
    fetch(`${apiUrl}/users/${loggedUser}`).then((rawResponse)=>{
      return rawResponse.json()
    }).then((parsedResponse) => {
      let userData = parsedResponse
      this.setState({
        user: userData,
        mounted: true
      });
    })
  }

  componentDidUpdate(){
    if(this.state.mounted && this.state.cartCleared == false){
      client.checkout.create().then((res) => {
        let cartId = res.id
        fetch(`${apiUrl}/update_user_cart/${loggedUser}/${cartId}`, {method: 'PATCH'}).then((res) => {
          if (res.status == 200){
            console.log("hi");
            this.setState({
              cartCleared: true,
              loading: false
            })
          }
        })
      })
    }
  }

  render() {
    let display;

    if(this.state.cartCleared){
      display =
      <div>
        <Label style={{flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: "20px", backgroundColor: "black"}}>
            <a href="/" style={{color: 'white'}}>Thank you for your purchase! Click here to return to the home page. </a>
        </Label>
      </div>
    }
    if(this.state.loading) {
      display =
      <Row>
          <Loader
               type="Bars"
               color="darkgray"
               height="100"
               width="100"
           />
       </Row>
    }

      return(
        <div>
          <Jumbotron style={styles.jumbo}>
            <Row style={{marginTop: '10%'}}>
              {display}
            </Row>
          </Jumbotron>
          <Button onClick={this.log}>Console</Button>
        </div>
      )
  }
}

export default PurchaseCompleteConfirmation
