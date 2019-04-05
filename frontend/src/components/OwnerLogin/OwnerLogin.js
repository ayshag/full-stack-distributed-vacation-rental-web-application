import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';



class OwnerLogin extends Component {

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
 
  
       onSubmit = (values) => {
        var headers = new Headers();
        console.log("Submitting Owner Login Values");
        //prevent page from refresh
       // values.preventDefault();
       
       this.props.ownerlogin(values, () => {
        this.props.history.push("/ownerlogin");
      });
       
       
    }

    render() {
        const { handleSubmit } = this.props;
        let redirectVar = null;
        let notvalidatedalert = null;
       // if (cookie.load('cookie')) {
        if(this.props.authFlag)
        {
            console.log("Redirecting to Home");
            redirectVar = <Redirect to="/postproperty" />
        }
        else if (this.props.authFlag === false && (this.props.login_status === "Invalid Information"  || this.props.login_status === "Username does not exist"))
        {
            notvalidatedalert = <h6>Incorrect username or password entered. Please try again</h6>
        }
    
        return (

            <div className="container">
                {redirectVar}
                <div className="login-form">
                    <div className="signin-signup">
                       
                        <div className="panel">
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <h3>Signin To HomeAway as Owner</h3>
                                <h6>Don't have an account?  <Link to="/ownersignup" >Owner Signup</Link>  </h6>
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


                                <div>{notvalidatedalert}</div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>

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
        ownerlogin : (values) => {
            axios.post('http://localhost:3001/ownerlogin', values)
                .then((response) => {
                    
                    dispatch({type: "OWNERLOGIN",payload : response.data,statusCode : response.status})
            }).catch((error) =>
            {
            
                dispatch({type: "OWNERLOGIN",payload : error.response.data,statusCode : error.response.status})
            })
            
        }
    }
}

export default reduxForm({
    validate,
    form: "OwnerLoginForm",
    reducer: "OwnerLoginReducer"
})(connect(mapStateToProps,mapDispatchStateToProps)(OwnerLogin)); 