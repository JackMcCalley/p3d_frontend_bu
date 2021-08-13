import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService'
import Home from './Home.js'
import Upload from './Upload.js'
import UploadDICOM from './UploadDICOM.js'
import UploadSTL from './UploadSTL.js'
import Upload2STL from './Upload2STL.js'
import UploadMasks from './UploadMasks.js'
import Account from './Account.js'
import Signup from './Signup.js'
import About from './About.js'
import Login from './Login.js'
import DigitalTreatmentPlanning from './DigitalTreatmentPlanning.js'
import PrintedModels from './PrintedModels.js'
import SurgicalGuides from './SurgicalGuides.js'
import SurgicalGuideMain from './SurgicalGuideMain.js'
import Obg from './Obg.js'
import Masks from './Masks.js'
import ProtoPrinting from './ProtoPrinting.js'
import LabSupport from './LabSupport.js'
import Services from './Services.js'
import RXFormPrintedModels from './RXFormPrintedModels.js'
import RXFormSurgicalGuides from './RXFormSurgicalGuides.js'
import RXFormBracketGuides from './RXFormBracketGuides.js'
import RXFormTreatmentPlanning from './RXFormTreatmentPlanning.js'
import RXFormMasks from './RXFormMasks.js'
import TreatmentPlanningProcedure from './TreatmentPlanningProcedure'
import ScanningProtocol from './ScanningProtocol'
import Pricing from './Pricing'
import SetCheckout from './SetCheckout'
import PurchaseCompleteConfirmation from './PurchaseCompleteConfirmation.js'
import AltSource from './AltSource.js'
import AltSourceUploadSTL from './AltSourceUploadSTL.js'
import AltSourceUploadDCM from './AltSourceUploadDCM.js'
import AltSourceUploadSTL2 from './AltSourceUploadSTL2'
import AltSourceComplete from './AltSourceComplete.js'
import ForgotPassword from './ForgotPassword.js'
import ResetPassword from './ResetPassword.js'
import ZipInstructions from './ZipInstructions.js'
import CerecProcedure from './CerecProcedure.js'
import Admin from './Admin.js'

const Auth = new AuthService()

const Content = () => (
    <div>
    {Auth.loggedIn() ?
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path='/surgical-guides/upload/stl' component={UploadSTL} />
                    <Route exact path="/digital-treatment-planning/upload/dicom" component={UploadDICOM} />
                    <Route exact path="/digital-treatment-planning/upload/stl" component={UploadSTL} />
                    <Route exact path="/ortho-bracket-guide/upload/stl" component={Upload2STL} />
                    <Route exact path="/printed-models/upload/stl" component={Upload2STL} />
                    <Route exact path="/mask-face-fitters/upload/stl" component={UploadMasks} />
                    <Route exact path="/account" component={Account} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/about" component={About} />
                    <Redirect from="/login" to="/account" />
                    <Route exact path="/digital-treatment-planning" component={DigitalTreatmentPlanning} />
                    <Route exact path="/3d-printed-models" component={PrintedModels} />
                    <Route exact path="/surgical-guide-main" component={SurgicalGuideMain} />
                    <Route exact path="/surgical-guides" component={SurgicalGuides} />
                    <Route exact path="/ortho-bracket-guide" component={Obg} />
                    <Route exact path="/mask-face-fitters" component={Masks} />
                    <Route exact path="/prototype-printing" component={ProtoPrinting} />
                    <Route exact path="/lab-support" component={LabSupport} />
                    <Route exact path="/services" component={Services} />
                    <Route exact path="/rx-printed-models" component={RXFormPrintedModels} />
                    <Route exact path="/rx-surgical-guides" component={RXFormSurgicalGuides} />
                    <Route exact path="/rx-bracket-guides" component={RXFormBracketGuides} />
                    <Route exact path="/rx-treatment-planning" component={RXFormTreatmentPlanning} />
                    <Route exact path="/rx-form-masks" component={RXFormMasks} />
                    <Route exact path="/treatment-planning-procedure" component={TreatmentPlanningProcedure} />
                    <Route exact path="/treatment-planning-procedure/cerec" component={CerecProcedure} />
                    <Route exact path="/scanning-protocol" component={ScanningProtocol} />
                    <Route exact path="/pricing" component = {Pricing} />
                    <Route exact path="/confirmation" component={PurchaseCompleteConfirmation} />
                    <Route exact path="/alternate-source" component={AltSource} />
                    <Route exact path="/alternate-source/upload/stl" component={AltSourceUploadSTL} />
                    <Route exact path="/alternate-source/upload/dcm" component={AltSourceUploadDCM} />
                    <Route exact path="/alternate-source/upload/stl2" component={AltSourceUploadSTL2} />
                    <Route exact path="/alternate-source/upload/complete" component={AltSourceComplete} />
                    <Route exact path="/zip-instructions" component={ZipInstructions} />
                    <Route exact path="/admin" component={Admin}/>
                </Switch>
            </Router>
            :
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/digital-treatment-planning" component={DigitalTreatmentPlanning} />
                    <Route exact path="/3d-printed-models" component={PrintedModels} />
                    <Route exact path="/surgical-guide-main" component={SurgicalGuideMain} />
                    <Route exact path="/surgical-guides" component={SurgicalGuides} />
                    <Route exact path="/ortho-bracket-guide" component={Obg} />
                    <Route exact path="/mask-face-fitters" component={Masks} />
                    <Route exact path="/prototype-printing" component={ProtoPrinting} />
                    <Route exact path="/lab-support" component={LabSupport} />
                    <Route exact path="/services" component={Services} />
                    <Route exact path="/treatment-planning-procedure" component={TreatmentPlanningProcedure} />
                    <Route exact path="/treatment-planning-procedure/cerec" component={CerecProcedure} />
                    <Route exact path="/scanning-protocol" component={ScanningProtocol} />
                    <Route exact path="/account-setup" component={SetCheckout} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Route exact path="/reset-password" component={ResetPassword} />
                    <Route exact path="/zip-instructions" component={ZipInstructions} />
                    <Redirect from="/pricing" to="/login" />
                    <Redirect from="/account" to="/login" />
                    <Redirect from="/rx-surgical-guides" to="/login" />
                    <Redirect from="/rx-bracket-guides" to="/login" />
                    <Redirect from="/rx-printed-models" to="/login" />
                    <Redirect from="/rx-treatment-planning" to="/login" />
                    <Redirect from="/rx-form-masks" to="/login" />
                    <Redirect from="/confirmation" to="/"/>
                    <Redirect from="/alternative-source" to="/"/>
                    <Redirect from="/admin" to="/"/>
                </Switch>
            </Router>
    }
    </div>
)

export default Content;
