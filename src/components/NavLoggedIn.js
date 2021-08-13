import React, { Component }  from 'react';
import {NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {Row, Column} from 'simple-flexbox'
import logo from '../images/logo.jpg';
import Client from 'shopify-buy'
import Products from './Shopify/Products.js'
import Cart from './Shopify/Cart.js'
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

let handleLogout = () => {
        Auth.logout()
        window.location.replace('/')
      }

const styles= {
    dropdown: {
        fontSize: "16px"
    }
}

const client = Client.buildClient({
    storefrontAccessToken: `${sfat}`,
    domain: 'p3d-guides.myshopify.com'
});

class NavLoggedIn extends Component {
    constructor() {
      super();
      this.state = {
        isCartOpen: false,
        checkout: { lineItems: [] },
        products: [],
        shop: {}
      }
    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
}

componentWillMount() {
    fetch(`${apiUrl}/users/${loggedUser}`).then((rawResponse)=>{
      return rawResponse.json()
    }).then((parsedResponse) => {
      let userData = parsedResponse
      client.checkout.fetch(userData.cart_id).then((checkout) => {
        this.setState({
          checkout: checkout,
        });
      });
    })

   client.shop.fetchInfo().then((res) => {
     this.setState({
       shop: res,
     });
   });
 }

 addVariantToCart(variantId, quantity){
   this.setState({
     isCartOpen: true,
   });

   const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
   const checkoutId = this.state.checkout.id

   return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
     this.setState({
       checkout: res,
     });
   });
 }

 updateQuantityInCart(lineItemId, quantity) {
   const checkoutId = this.state.checkout.id
   const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

   return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
     this.setState({
       checkout: res,
     });
   });
 }

 removeLineItemInCart(lineItemId) {
   const checkoutId = this.state.checkout.id

   return client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
     this.setState({
       checkout: res,
     });
   });
 }

 handleCartOpen = () => {
   this.setState({isCartOpen: true})
 }

 handleCartClose() {
   this.setState({
     isCartOpen: false,
   });
 }

 getCheckoutId(){
     return this.state.checkoutId
 }

  render() {
    return (
        <Row style={{marginLeft: '5%'}}>
            <Column style={{width: '35%'}}>
                <img width="300px" src={logo}/>
            </Column>
            <Column style={{width: '60%'}}>
            <Nav bsStyle="pills" style={{color: 'black', justifyContent:'space-between', fontSize:'20px', textAlign: 'center'}}>
                    <NavItem eventKey={1} href="/">
                        HOME
                    </NavItem>
                    <NavDropdown id="services" eventKey={2} title="SERVICES">
                      <MenuItem style={styles.dropdown} href='/surgical-guide-main' eventKey={2.1}>Surgical Guides</MenuItem>
                      <MenuItem style={styles.dropdown} href='/mask-face-fitters' eventKey={2.3}>Mask Face Fitters and Mask Loop Clasps</MenuItem>
                      <MenuItem style={styles.dropdown} href='/3d-printed-models' eventKey={2.2}>3D Printed Models</MenuItem>
                      <MenuItem divider />
                      <MenuItem style={styles.dropdown}href='/pricing' eventKey={2.4}>Pricing</MenuItem>
                      <MenuItem style={styles.dropdown}href='/lab-support' eventKey={2.4}>Lab Support</MenuItem>
                    </NavDropdown>
                    <NavItem eventKey={3} href="/about">
                        ABOUT
                    </NavItem>
                    <NavItem eventKey={4} onClick={handleLogout}>
                        LOGOUT
                    </NavItem>
                    <NavItem eventKey={5}>
                      <header className="App__header">
                        {!this.state.isCartOpen &&
                          <div>
                            <button className="App__view-cart" onClick={this.handleCartOpen}>CART</button>
                          </div>
                        }
                      </header>
                      <Cart
                        checkout={this.state.checkout}
                        isCartOpen={this.state.isCartOpen}
                        handleCartClose={this.handleCartClose}
                        updateQuantityInCart={this.updateQuantityInCart}
                        removeLineItemInCart={this.removeLineItemInCart}
                      />
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

export default NavLoggedIn
