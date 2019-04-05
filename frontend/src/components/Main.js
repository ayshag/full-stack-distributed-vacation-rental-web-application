import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import OwnerLogin from './OwnerLogin/OwnerLogin';
import Signup from './Signup/Signup';
import OwnerSignup from './OwnerSignup/OwnerSignup';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import SearchResults from './SearchResults/SearchResults';
import PostProperty from './PostProperty/PostProperty';
import Details from './Details/Details';
import Messages from './Messages/Messages';
import Inbox from './Inbox/Inbox';

import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard';
import OwnerDashboard from './OwnerDashboard/OwnerDashboard';
//Create a Main Component


import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Switch } from "react-router-dom";
import promise from "redux-promise";

import RootReducer from "../reducers";


//middleware settings
// To resolve promise to store we use apply
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));
//createStoreWithMiddleware(RootReducer)



class Main extends Component {
    render(){
    
        return(
           
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component = {LandingPage}/>
                <Route path="/login" component={Login}/>
                <Route path="/ownerlogin" component={OwnerLogin}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/ownersignup" component={OwnerSignup}/>
                <Route path="/home" component={Home}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/searchresults" component={SearchResults}/>
                <Route path="/postproperty" component={PostProperty}/>
                <Route path="/details" component={Details}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/ownerdashboard" component={OwnerDashboard}/>
                <Route path="/messages" component={Messages}/>
                <Route path="/inbox" component={Inbox}/>
               
            </div>
        )
    }
}
//Export The Main Component
export default Main;
