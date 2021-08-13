import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Client from 'shopify-buy'
import './css/shopify.css'
import storefrontAccessToken from './components/Shopify/Storefront.js'
const sfat = storefrontAccessToken.sfat

const client = Client.buildClient({
    storefrontAccessToken: `${sfat}`,
    domain: 'p3d-guides.myshopify.com'
});

ReactDOM.render(
    <App client={client} />,
      document.getElementById('root')
);
registerServiceWorker();
