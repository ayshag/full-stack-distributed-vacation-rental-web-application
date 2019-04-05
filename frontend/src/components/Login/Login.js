import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import { login } from "../../actions";
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';



class Login extends Component {

    constructor(props){
        super(props);       
        this.onSubmit = this.onSubmit.bind(this);
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
 
   componentDidMount()
   {
     //set the with credentials to true
     axios.defaults.withCredentials = true;
   }
    onSubmit = (values) => {
        var headers = new Headers();
        console.log("Submitting Login Values");
        //prevent page from refresh
       // values.preventDefault();
       
       this.props.login(values, () => {
        this.props.history.push("/login");
      });
       
       
    }

    render() {
        
        const { handleSubmit } = this.props;

        let redirectVar = null;
        let notvalidatedalert = null;
       
        if(this.props.authFlag)
        {            
        // if (cookie.load('cookie')) {
             console.log("Redirecting to Home");
             redirectVar = <Redirect to="/home" />
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
                                <h3>Signin To HomeAway</h3>
                                <h6>Don't have an account?  <Link to="/signup" >Traveler Signup</Link>  </h6>
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

/*

function mapStateToProps(state) {
    return { username: state.username,
             password: state.password };
  }

  function mapDispatchToProps(store) {
    return { username: store.username,
             password: store.password };
  }
 
export default reduxForm({
    validate,
    form: "LoginForm"
})(connect(mapDispatchToProps, { login })(Login));
*/


const mapStateToProps = state =>{
   
    return {
        authFlag : state.reducer.authFlag,
        username : state.reducer.username,
        login_status : state.reducer.login_status,
        type : state.reducer.type   }
}

const mapDispatchStateToProps = dispatch => {
    return {
        login : (values) => {
            axios.post('http://localhost:3001/login', values)
                .then((response) => {
                    console.log(response);
                    dispatch({type: "LOGIN",payload : response.data,statusCode : response.status})
            }).catch((error) =>
            {
            
                dispatch({type: "LOGIN",payload : error.response.data,statusCode : error.response.status})
            })
            
        }
    }
}
export default reduxForm({
    validate,
    form: "LoginForm",
    reducer: "LoginReducer"
})(connect(mapStateToProps,mapDispatchStateToProps)(Login)); 
//export default connect(mapStateToProps,mapDispatchStateToProps)(Login); 