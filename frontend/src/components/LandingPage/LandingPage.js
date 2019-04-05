import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";


class LandingPage extends Component {
    constructor() {
        super();
          this.submitSignout = this.submitSignout.bind(this);
       // this.getuseraccess = this.getuseraccess.bind(this);
    }

  
    submitSignout = (e) => {

        cookie.remove('cookie', { path: '/' });
        this.props.logout();

        sessionStorage.setItem('destination', "");
        sessionStorage.setItem('arrive', "");
        sessionStorage.setItem('depart', "");
        sessionStorage.setItem('guests', "");
        

    }
    render() {
        let navLogin = null;
        let homeaway = null;
        console.log("Rendering Landing Page");
        console.log("Cookie at LP: ", cookie.load('cookie'));
	console.log("AuthFlag:", this.props.authFlag);
        //if (cookie.load('cookie')) {
	if(this.props.authFlag){
            console.log("Able to read cookie");
          let ownerdash = null;
           let propertypost = null;
           
          
                 ownerdash =  <div> <Link to="/ownerdashboard">Owner Dashboard</Link> | </div>
                 propertypost = <div> <Link to="/postproperty">Post a Property Now</Link> | </div>
     

            navLogin = (

                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link to="/dashboard">Dashboard</Link> |
                    </li>
                    <li className="nav-item">
                        <Link to="/inbox">Inbox</Link> |
                    </li>
                    <li className="nav-item">
                        <Link to="/profile">Profile</Link> |
                    </li>
                    <li className="nav-item">
                        {ownerdash}
                    </li>
                    <li className="nav-item">
                        {propertypost}
                    </li>
                    <li className="nav-item">
                        <Link to="/login" onClick={this.submitSignout}>Signout</Link>
                    </li>
                </ul>

            );

        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul className="nav navbar-nav">
                 <li className="nav-item">
                 
                     <Link to="/login">Traveler Login</Link> |
                </li>
                <li className="nav-item">
                    <Link to="/ownerlogin">Owner Login</Link>
                    </li>
                </ul>
            );


        }

        homeaway = (<Link to="/home"><h1> HomeAway</h1> </Link>);
        let redirectVar = <Redirect to="/home" />

        return (
            <div>
            
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                
                    <div className="container-fluid">
                        <div className="navbar-header">
                            {homeaway}
                        </div>
                        {navLogin}
                    </div>

   
                </nav>
                {redirectVar}
            </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
  //  console.log(state);
    return {
        authFlag : state.reducer.authFlag,
        login_status : state.reducer.login_status
    }
}

const mapDispatchStateToProps = dispatch => {
    const data = {
        login_status : "Logged Out"
    };
    return {
        logout : () => dispatch({type: "LOGOUT",payload : data})
                    
        }
    
}
export default connect(mapStateToProps,mapDispatchStateToProps)(LandingPage); 

//export default LandingPage;
