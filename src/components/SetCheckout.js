import React, { Component } from 'react'
import Client from 'shopify-buy'
import Cart from './Shopify/Cart'
import {Redirect} from 'react-router-dom'
import AuthService from '../services/AuthService'
import withAuth from './withAuth'
import apiConst from '../components/ApiUrl'
import storefrontAccessToken from './Shopify/Storefront.js'

const apiUrl = apiConst.apiUrl

const Auth = new AuthService()

const loggedUser = getLoggedUser()

function getLoggedUser(){
    if(Auth.loggedIn()){
        return Auth.getUserId()
    }
}

const client = Client.buildClient({
    storefrontAccessToken: `${storefrontAccessToken}`,
    domain: 'p3d-guides.myshopify.com'
});

class SetCheckout extends Component{
    constructor(props){
        super(props)
        this.state={
            checkout: '',
            cartIdSet: false,
            redirect: false,
            apiUrl: apiUrl
        }
    }

    componentWillMount(){
        client.checkout.create().then((res) => {
          fetch(`${this.state.apiUrl}/users/${loggedUser}`,
            {
              body: JSON.stringify({ cart_id: res.id }),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }).then((res) => {
            if (res.status !== 422) {
                this.setState({redirect: true})
            }
            })
        });

        client.shop.fetchInfo().then((res) => {
          this.setState({
            shop: res,
          });
        });
    }

    render(){
        return(
            <div>
                <span>Please wait while we set up your account</span>
                {this.state.redirect && <Redirect to="/"/>}
            </div>
        )
    }
}
export default SetCheckout;
