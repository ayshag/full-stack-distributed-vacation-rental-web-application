import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class Signup extends Component {

    constructor(props){      
        super(props);       
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount()
    {
      //set the with credentials to true
      axios.defaults.withCredentials = true;
    }
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        

        return (
            <div className={className}>
                <input className="form-control" placeholder={field.placeholder} type={field.type} {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }
 
  
    onSubmit(values) {
        var headers = new Headers();

        //prevent page from refresh
        //e.preventDefault();
        console.log("values" ,values);
         this.props.signup(values,() => {this.props.history.push("/signup");});
    
    }

    render() {
        const { handleSubmit } = this.props;
        let redirectVar = null;
        let uniqueUserAlert = null;
       if(this.props.authFlag)
        {
            redirectVar = <Redirect to= "/home"/>
        }
        
        else if (this.props.login_status == "Username exists")
            uniqueUserAlert = <h6>Username not available. Please pick another username</h6>
        return (
            <div>
                {redirectVar}
                <div className="container">
             
                    <form onSubmit=/*{this.submitSignup}*/ {handleSubmit(this.onSubmit.bind(this))}>
                        <div className="login-form">

                            <div className="signin-signup">
                                <div className="panel">
                                    <h2>Traveler Signup</h2>
                                    <p>Please enter your details to create an account</p>
                                </div>
                            
                            <Field
                                    placeholder="Name"
                                    name="name"
                                    type="text"
                                    component={this.renderField}
                                />

                               <Field
                                    placeholder="Username"
                                    name="username"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    placeholder="Password"
                                    name="password"
                                    type = "password"
                                    component={this.renderField}
                                />

                                <div>{uniqueUserAlert}</div>
                                <button type="submit" className="btn btn-primary">Signup</button>
                                
                            </div>
                        </div>
                    </form>
                   
                </div>
            </div>
            
        );
    }
}

function validate(values) {

    const errors = {};

    // Validate the inputs from 'values'
    if (!values.username) {
        errors.username = "Enter Username";
    }
    if (!values.password) {
        errors.password = "Enter Password";
    }

    if (!values.name) {
        errors.name = "Enter Name";
    }

    return errors;
}



const mapStateToProps = state =>{
   
    return {
        authFlag : state.reducer.authFlag,
        username : state.reducer.username,
        login_status : state.reducer.login_status,
    type : state.reducer.type    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        signup : (values) => {
            axios.post('http://localhost:3001/signup', values)
                .then((response) => {
                    
                    dispatch({type: "SIGNUP",payload : response.data,statusCode : response.status})
            }).catch((error) =>
            {
            
                dispatch({type: "SIGNUP",payload : error.response.data,statusCode : error.response.status})
            })
            
        }
    }
}
export default reduxForm({
    validate,
    form: "SignupForm",
    reducer: "SignupReducer"
})(connect(mapStateToProps,mapDispatchStateToProps)(Signup)); 