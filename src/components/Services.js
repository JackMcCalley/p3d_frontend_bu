import React, { Component } from 'react';
import {Button, Jumbotron } from 'react-bootstrap';
import {Row, Column} from 'simple-flexbox'
import Client from 'shopify-buy'
import Products from './Shopify/Products';
import Product from './Shopify/Product'
import Cart from './Shopify/Cart';
import NavLoggedIn from './NavLoggedIn'
import VariantSelector from './Shopify/VariantSelector'
import AuthService from '../services/AuthService'
import withAuth from './withAuth'
import S3FileUpload, {uploadFile} from 'react-s3'
import aws from 'aws-sdk'
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
});

let emailSent = false

class Services extends Component {
    constructor(props) {
       super(props);
       this.state = {
         isCartOpen: false,
         checkout: { lineItems: [] },
         products: [],
         product: [],
         shop: {},
         rawRx: '',
         parsedRx: '',
         rxFile: null,
         user: null,
         case:  null,
         service: '',
         rxFormUploaded: false,
         mounted: false,
         didMount: false,
         emailSent: false,
       };

       this.handleCartClose = this.handleCartClose.bind(this);
       this.addVariantToCart = this.addVariantToCart.bind(this);
       this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
       this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
     }

     componentWillMount() {
       if(typeof this.props.location.state == 'undefined'){
           this.props.history.replace('/')
       } else {
           this.setState({case: this.props.location.state.case})
       }
       fetch(`${apiUrl}/users/${loggedUser}`).then((rawResponse)=>{
         // rawResponse.json() returns a promise that we pass along
         return rawResponse.json()
       }).then((parsedResponse) => {
         // when this promise resolves, we can work with our data
         let userData = parsedResponse
         client.checkout.fetch(userData.cart_id).then((checkout) => {
           this.setState({
             user: userData,
             checkout: checkout,
             mounted: true
           });
         });
       })
     }

    sendInfo() {
      fetch(`${apiUrl}/rxform_by_case_number/${this.state.case}`).then((rawResponse)=>{
           return rawResponse.json()
      }).then((parsedResponse) => {
        let rxData = parsedResponse
        let parsedRx;
        if (rxData[0].serviceType == "Surgical Guide" || rxData[0].serviceType == "Digital Treatment Planning"){
        if(rxData[0].maxillary){
        if(rxData[0].toothSupportedGuide){
         parsedRx = `
             Service Type: ${rxData[0].serviceType}\n
             Case Number: ${rxData[0].case}\n
             Doctor's Name: ${rxData[0].doctor}\n
             Email: ${this.state.user.email}\n
             Address: ${rxData[0].address}\n
             Phone: ${rxData[0].phone}\n
             Patient: ${rxData[0].patient}\n
             Tooth Supported Guide? ${rxData[0].toothSupportedGuide}\n
             Client Uploading their own .stl files? ${rxData[0].hasStl}\n
             Maxillary \n
             Number of Implants: ${rxData[0].numberOfImplants}\n
             Implant Locations: ${rxData[0].implantLocations}\n
             Implant System: ${rxData[0].implantSystem}\n
             Guided Surgery System: ${rxData[0].guidedSurgerySystem}\n
             Drill Lengths: ${rxData[0].drillLengths}\n
             Key Size Outer Diameter: ${rxData[0].keySizeOuterDiameter}\n
             Additional Comments: ${rxData[0].comment}\n
             `
         } else if (rxData[0].tissueLevelGuide){
             parsedRx = `
                 Service Type: ${rxData[0].serviceType}\n
                 Case Number: ${rxData[0].case}\n
                 Doctor's Name: ${rxData[0].doctor}\n
                 Email: ${this.state.user.email}\n
                 Address: ${rxData[0].address}\n
                 Phone: ${rxData[0].phone}\n
                 Patient: ${rxData[0].patient}\n
                 Tissue Level Guide? ${rxData[0].tissueLevelGuide}\n
                 Client Uploading their own .stl files? ${rxData[0].hasStl}\n
                 Maxillary\n
                 Number of Implants: ${rxData[0].numberOfImplants}\n
                 Implant Locations: ${rxData[0].implantLocations}\n
                 Implant System: ${rxData[0].implantSystem}\n
                 Guided Surgery System: ${rxData[0].guidedSurgerySystem}\n
                 Drill Lengths: ${rxData[0].drillLengths}\n
                 Key Size Outer Diameter: ${rxData[0].keySizeOuterDiameter}\n
                 Additional Comments: ${rxData[0].comment}\n
                 `
         } else if (rxData[0].boneLevelGuide){
             parsedRx = `
                 Service Type: ${rxData[0].serviceType}\n
                 Case Number: ${rxData[0].case}\n
                 Doctor's Name: ${rxData[0].doctor}\n
                 Email: ${this.state.user.email}\n
                 Address: ${rxData[0].address}\n
                 Phone: ${rxData[0].phone}\n
                 Patient: ${rxData[0].patient}\n
                 Bone Level Guide\n
                 Client Uploading their own .stl files? ${rxData[0].hasStl}\n
                 Maxillary\n
                 Number of Implants: ${rxData[0].numberOfImplants}\n
                 Implant Locations: ${rxData[0].implantLocations}\n
                 Implant System: ${rxData[0].implantSystem}\n
                 Guided Surgery System: ${rxData[0].guidedSurgerySystem}\n
                 Drill Lengths: ${rxData[0].drillLengths}\n
                 Key Size Outer Diameter: ${rxData[0].keySizeOuterDiameter}\n
                 Additional Comments: ${rxData[0].comment}\n
                 `
         } else if (rxData[0].boneReductionGuide){
             parsedRx = `
                 Service Type: ${rxData[0].serviceType}\n
                 Case Number: ${rxData[0].case}\n
                 Doctor's Name: ${rxData[0].doctor}\n
                 Email: ${this.state.user.email}\n
                 Address: ${rxData[0].address}\n
                 Phone: ${rxData[0].phone}\n
                 Patient: ${rxData[0].patient}\n
                 Bone Reduction Guide \n
                 Client Uploading their own .stl files? ${rxData[0].hasStl}\n
                 Maxillary \n
                 Number of Implants: ${rxData[0].numberOfImplants}\n
                 Implant Locations: ${rxData[0].implantLocations}\n
                 Implant System: ${rxData[0].implantSystem}\n
                 Guided Surgery System: ${rxData[0].guidedSurgerySystem}\n
                 Drill Lengths: ${rxData[0].drillLengths}\n
                 Key Size Outer Diameter: ${rxData[0].keySizeOuterDiameter}\n
                 Additional Comments: ${rxData[0].comment}\n
                 `
         }
        } else if(rxData[0].mandibular){
         if(rxData[0].toothSupportedGuide){
             parsedRx = `
                 Service Type: ${rxData[0].serviceType}\n
                 Case Number: ${rxData[0].case}\n
                 Doctor's Name: ${rxData[0].doctor}\n
                 Email: ${this.state.user.email}\n
                 Address: ${rxData[0].address}\n
                 Phone: ${rxData[0].phone}\n
                 Patient: ${rxData[0].patient}\n
                 Tooth Supported Guide? ${rxData[0].toothSupportedGuide}\n
                 Client Uploading their own .stl files? ${rxData[0].hasStl}\n
                 Maxillary \n
                 Number of Implants: ${rxData[0].numberOfImplants}\n
                 Implant Locations: ${rxData[0].implantLocations}\n
                 Implant System: ${rxData[0].implantSystem}\n
                 Guided Surgery System: ${rxData[0].guidedSurgerySystem}\n
                 Drill Lengths: ${rxData[0].drillLengths}\n
                 Key Size Outer Diameter: ${rxData[0].keySizeOuterDiameter}\n
                 Additional Comments: ${rxData[0].comment}\n
                 `
             } else if (rxData[0].tissueLevelGuide){
                 parsedRx = `
                     Service Type: ${rxData[0].serviceType}\n
                     Case Number: ${rxData[0].case}\n
                     Doctor's Name: ${rxData[0].doctor}\n
                     Email: ${this.state.user.email}\n
                     Address: ${rxData[0].address}\n
                     Phone: ${rxData[0].phone}\n
                     Patient: ${rxData[0].patient}\n
                     Tissue Level Guide? ${rxData[0].tissueLevelGuide}\n
                     Client Uploading their own .stl files? ${rxData[0].hasStl}\n
                     Mandibular\n
                     Number of Implants: ${rxData[0].numberOfImplants}\n
                     Implant Locations: ${rxData[0].implantLocations}\n
                     Implant System: ${rxData[0].implantSystem}\n
                     Guided Surgery System: ${rxData[0].guidedSurgerySystem}\n
                     Drill Lengths: ${rxData[0].drillLengths}\n
                     Key Size Outer Diameter: ${rxData[0].keySizeOuterDiameter}\n
                     Additional Comments: ${rxData[0].comment}\n
                     `
             } else if (rxData[0].boneLevelGuide){
                 parsedRx = `
                     Service Type: ${rxData[0].serviceType}\n
                     Case Number: ${rxData[0].case}\n
                     Doctor's Name: ${rxData[0].doctor}\n
                     Email: ${this.state.user.email}\n
                     Address: ${rxData[0].address}\n
                     Phone: ${rxData[0].phone}\n
                     Patient: ${rxData[0].patient}\n
                     Bone Level Guide\n
                     Client Uploading their own .stl files? ${rxData[0].hasStl}\n
                     Mandibular\n
                     Number of Implants: ${rxData[0].numberOfImplants}\n
                     Implant Locations: ${rxData[0].implantLocations}\n
                     Implant System: ${rxData[0].implantSystem}\n
                     Guided Surgery System: ${rxData[0].guidedSurgerySystem}\n
                     Drill Lengths: ${rxData[0].drillLengths}\n
                     Key Size Outer Diameter: ${rxData[0].keySizeOuterDiameter}\n
                     Additional Comments: ${rxData[0].comment}\n
                     `
             } else if (rxData[0].boneReductionGuide){
                 parsedRx = `
                     Service Type: ${rxData[0].serviceType}\n
                     Case Number: ${rxData[0].case}\n
                     Doctor's Name: ${rxData[0].doctor}\n
                     Email: ${this.state.user.email}\n
                     Address: ${rxData[0].address}\n
                     Phone: ${rxData[0].phone}\n
                     Patient: ${rxData[0].patient}\n
                     Bone Reduction Guide \n
                     Client Uploading their own .stl files? ${rxData[0].hasStl}\n
                     Mandibular \n
                     Number of Implants: ${rxData[0].numberOfImplants}\n
                     Implant Locations: ${rxData[0].implantLocations}\n
                     Implant System: ${rxData[0].implantSystem}\n
                     Guided Surgery System: ${rxData[0].guidedSurgerySystem}\n
                     Drill Lengths: ${rxData[0].drillLengths}\n
                     Key Size Outer Diameter: ${rxData[0].keySizeOuterDiameter}\n
                     Additional Comments: ${rxData[0].comment}\n
                     `
             }
        }
        } else if (rxData[0].serviceType == "3D Printed Models" || "Orthodontic Bracket Guides"){
          parsedRx = `
            Service Type: ${rxData[0].serviceType}\n
            Case Number: ${rxData[0].case}\n
            Doctor's Name: ${rxData[0].doctor}\n
            Email: ${this.state.user.email}\n
            Address: ${rxData[0].address}\n
            Phone: ${rxData[0].phone}\n
            Patient: ${rxData[0].patient}\n
            Comment: ${rxData[0].comment}\n
          `
        }
        let textFile=null
        let data = new File([parsedRx], 'RxForm.txt', {type: 'text/plain'})
        this.setState({rxFile: data, service: rxData[0].serviceType})
      })

      client.product.fetchAll().then((res) => {
        this.setState({
          products: res,
        })
      })

       if(typeof this.props.location.state == 'undefined'){
           this.props.history.replace('/')
       } else if (typeof this.props.location.state != 'undefined') {
           if(this.props.location.state.from == '/surgical-guides/upload/stl'){
               const productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE2MDA4MDUyMDgxMzA='
               client.product.fetch(productId).then((res) => {
                   this.setState({
                       product: res,
                   })
               })
           } else if (this.props.location.state.from == '/digital-treatment-planning/upload/dicom') {
               const productId =  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE2MDA4MDY1MTg4NTA='
               client.product.fetch(productId).then((res) => {
                   this.setState({
                       product: res,
                   })
               })
           } else if (this.props.location.state.from == '/digital-treatment-planning/upload/stl') {
               const productId =  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE2MDA4MDY1MTg4NTA='
               client.product.fetch(productId).then((res) => {
                   this.setState({
                       product: res,
                   })
               })
           } else if (this.props.location.state.from == '/ortho-bracket-guide/upload/stl'){
               const productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE2MDA4MjQyMTM1NzA='
               client.product.fetch(productId).then((res) => {
                   this.setState({
                       product: res,
                   })
               })
           } else if (this.props.location.state.from == '/printed-models/upload/stl'){
               const productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE2MDA4MjU4NTE5NzA='
               client.product.fetch(productId).then((res) => {
                   this.setState({
                       product: res,
                   })
               })
           } else if (this.props.location.state.from == '/mask-face-fitters/upload/stl'){
             const productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1NzQzNDgzMTI2NDI='
             client.product.fetch(productId).then((res) => {
               this.setState({
                 product: res,
               })
             })
           } else client.product.fetchAll().then((res) => {
               this.setState({
                   product: res
               })
           })
       }
     client.shop.fetchInfo().then((res) => {
       this.setState({
         shop: res,
       })
     })
     this.setState({didMount: true})
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

  uploadRx(){
      if (!this.state.rxFormUploaded && this.state.mounted && this.state.didMount){
        fetch(`${apiUrl}/return_keys`).then((rawResponse)=>{
          return rawResponse.json()
        }).then((parsedResponse)=>{
        let aws = parsedResponse[0].value
        let sak = parsedResponse[1].value
        let file = this.state.file
        let rxform = this.state.parsedRx
        let rxFile = this.state.rxFile
        const config = {
          bucketName: 'p3dfiles',
          region: 'us-west-1',
          dirName: `${this.state.user.first_name}` + `${this.state.user.last_name}` + '/' + `${this.state.service}` + ' case#' + `${this.state.case}`,
          accessKeyId: `${aws}`,
          secretAccessKey: `${sak}`
        }
        S3FileUpload.uploadFile(rxFile, config)
        this.setState({rxFormUploaded: true})
        })
      }

  }

  sendSubmittedMail = () => {
    if (this.state.user != null && this.state.case != null && this.state.service != '' && this.state.mounted && this.state.didMount && !this.state.emailSent){
      fetch(`${apiUrl}/case_submitted_email/${this.state.case}`, {
        method: 'GET',
      })
      fetch(`${apiUrl}/lab_email/${this.state.case}`, {
        method: 'GET',
      })
      this.setState({emailSent: true})
    }
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

  handleCartClose() {
  this.setState({
    isCartOpen: false,
  });
  }

  render() {
    if(!this.state.mounted ) {
      return null
    } else if(!this.state.didMount) {
      this.sendInfo()
    }
    let displayProduct;
    let display;
    let title;
    this.uploadRx()
    this.sendSubmittedMail()
    if(this.state.product.length != 0){
      displayProduct =
      <Product
        addVariantToCart={this.addVariantToCart}
        client={client}
        key={this.state.product.attrs.id.toString()}
        product={this.state.product}
      />
      title = this.state.product.title.toString()
    }
       return (
         <div className="App">
             <div className="App__title">
               <h1>{title} Options</h1><br/>
               <p style={{fontSize: '18px', color: 'black'}}>A case number has been generated and your files have been received. <br/>
               In order for P3D to begin manufacturing, checkout must be completed below.
               </p>
             </div>
             <Jumbotron style={{width: '40%', marginLeft: '30%', alignItems: 'center', justifyContent: 'center'}}>
             {displayProduct}
             </Jumbotron>
           <Cart
             checkout={this.state.checkout}
             isCartOpen={this.state.isCartOpen}
             handleCartClose={this.handleCartClose}
             updateQuantityInCart={this.updateQuantityInCart}
             removeLineItemInCart={this.removeLineItemInCart}
             style={{visibility: 'hidden'}}
           />
         </div>
       );
     }
   }

export default Services;
