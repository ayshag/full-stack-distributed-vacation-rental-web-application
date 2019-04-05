import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class OwnerSignup extends Component {
    constructor(props){       
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount()
   {
     axios.defaults.withCredentials = true;
   }
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        

        return (
            <div className={className}>
                <input className="form-control" pattern={field.pattern} placeholder={field.placeholder} type={field.type} {...field.input} />
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
         this.props.ownersignup(values,() => {this.props.history.push("/ownersignup");});
      
    }

    render() {
        const { handleSubmit } = this.props;
        let redirectVar = null;
        let uniqueUserAlert = null;
console.log("AuthFlag at PP Rerender: " , this.props.authFlag);
        if(this.props.authFlag)
        {
            redirectVar = <Redirect to= "/postproperty"/>
        }
       
        else if(this.props.login_status == "Username exists")
            uniqueUserAlert = <h6>Username not available. Please pick another username</h6>
        return (
           
            <div className="container">
             {redirectVar}
            <div className="centralize">          
            
                    <div className="login-form">
                        <div className="signin-signup">
                        
                            <div className="panel">
                            <form onSubmit=/*{this.submitSignup}*/ {handleSubmit(this.onSubmit.bind(this))}>
                                <h3>Owner Signup</h3>
                                <p>Create Owner Account</p>
                            
                            <Field
                                    placeholder="Name"
                                    name="name"
                                    type="text"
                                    component={this.renderField}
                                />
                                 <Field
                                    placeholder="Phone"
                                    name="phone"
                                    type="text"
				    pattern={'[0-9]{10}'}  
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
                                
                               </form>
                        </div>
                    </div>
             
                    </div>
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

    if (!values.phone) {
        errors.phone = "Enter Phone";
      //  if(values.phone.length!=10 || values.phone.matches('[0-9]{10}'))
      //  {
      //      errors.phone = "Phone Number should be 10 digits long"
      //  }
      
    }
  
    if (!values.name) {
        errors.name = "Enter Name";
    }

    return errors;
}

const mapStateToProps = state =>{
   console.log("User Type at MSTP: ", state.reducer.type);
    return {
        authFlag : state.reducer.authFlag,
        username : state.reducer.username,
        login_status : state.reducer.login_status,
    type : state.reducer.type    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        ownersignup : (values) => {
            axios.post('http://localhost:3001/ownersignup', values)
                .then((response) => {
                    console.log("Owner Signup Response: ", response.data);
                    dispatch({type: "OWNERSIGNUP",payload : response.data,statusCode : response.status})
            }).catch((error) =>
            {
            
                dispatch({type: "OWNERSIGNUP",payload : error.response.data,statusCode : error.response.status})
            })
            
        }
    }
}
export default reduxForm({
    validate,
    form: "OwnerSignupForm",
    reducer: "OwnerSignupReducer"
})(connect(mapStateToProps,mapDispatchStateToProps)(OwnerSignup)); 