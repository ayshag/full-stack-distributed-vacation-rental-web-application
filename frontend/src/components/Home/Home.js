import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

class Home extends Component {
    constructor(){
        super();
      
        this.setFocus = this.setFocus.bind(this);   
        this.setBlur = this.setBlur.bind(this);
       
    }


	renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;       

        return (
            <div className={className}>
                <input className="form-control" pattern={field.pattern} onFocus={field.onFocus} onBlur={field.onBlur} placeholder={field.placeholder} type={field.type} {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }
  
        
    componentDidMount(){
        axios.get('http://ec2-18-217-104-211.us-east-2.compute.amazonaws.com:3001/home')
                .then(() => {});
    }

    submitSearch = (values) => {
        var headers = new Headers();
        //prevent page from refresh
       // values.preventDefault();
	console.log("Values: ", values);
        sessionStorage.setItem('destination', values.destination);        
        sessionStorage.setItem('arrive', values.arrive);
        sessionStorage.setItem('depart', values.depart);        
        sessionStorage.setItem('guests', values.guests);
        
        this.props.search(values);
      
          
    }

    
    setFocus = (e) => 
    {
        e.target.type = "date"
    }
    setBlur = (e) =>
    {
        e.target.type = "text"
    }


    render(){
const { handleSubmit } = this.props;
    
       let redirectVar = null;
     
    let destination = "Destination"; let arrive = "Date of Arrival";let depart ="Date of Departure";let guests = "Guests";
    if(sessionStorage.getItem('destination')!='')
    {
        destination = sessionStorage.getItem('destination');
     
    }
    if(sessionStorage.getItem('arrive')!='')
    {
        arrive = sessionStorage.getItem('arrive');
  
    }
    if(sessionStorage.getItem('depart')!='')
    {
        depart = sessionStorage.getItem('depart');
        
    }
    if(sessionStorage.getItem('guests')!='')
    {
        guests = sessionStorage.getItem('guests');
            }
    if(this.props.submit)
    {
       // if(cookie.load('cookie'))
	if(this.props.authFlag)
        {
            redirectVar = <Redirect to= "/searchresults"/>   
        }
        else 
        {
            redirectVar = <Redirect to= "/login"/>
        }
    }
       
        return(
            <div>
              {redirectVar}
            <div className="container">            
                <div className="main-form">
                    <div className="main-div">
          	    <form onSubmit={handleSubmit(this.submitSearch.bind(this))}  >
                         
                        <div className="form-group input-group"  >
				<Field

                                   placeholder="Destination"
                                   name="destination"
                                   type="text"                                
                                   component={this.renderField}
                               />
				<Field

                                   placeholder="Date of Arrival"
                                   name="arrive"
                                   type="text"               
				   onFocus ={this.setFocus}    
				   onBlur ={this.setBlur}             
                                   component={this.renderField}
                               />
				<Field

                                   placeholder="Date of Departure"
                                   name="depart"
                                   type="text"               
				   onFocus ={this.setFocus}    
				   onBlur ={this.setBlur}             
                                   component={this.renderField}
                               />
				<Field

                                   placeholder="Guests"
                                   name="guests"
                                   type="text"               
				     
				   pattern={'[0-9]{1,}'}        
                                   component={this.renderField}
                               />

				<div>
			        <button type="submit" className="btn btn-primary">Search</button> 
                         	</div>
                         </div>  
                         </form>                      
                    </div>
                </div>
            </div>
            </div>
            
               
                
        )
    }
}


function validate(values) {

    const errors = {};
    if (!values.destination) {
        errors.destination= "Enter Destination";
    }
    if (!values.arrive) {
        errors.arrive= "Enter Arrive Date";
    }
    if (!values.guests) {
        errors.guests = "Enter Guests";
    }
    if (!values.depart) {
        errors.depart= "Enter Depart Date";
    }
   
    return errors;
}


const mapStateToProps = state =>{
     return {
        destination: state.reducer_home.destination,
    arrive: state.reducer_home.arrive,
    depart: state.reducer_home.depart,
    guests: state.reducer_home.guests,
    submit: state.reducer_home.submit,
	authFlag : state.reducer.authFlag
      }
   
}

const mapDispatchStateToProps = dispatch => {
    return {
        resetSubmit : () =>
        {
          dispatch({type: "RESETSUBMIT"})  
        },
        search : (values) => {
           axios.post('http://localhost:3001/searchresults/query',values)
            .then(response => {
            
		dispatch({type: "SUBMITSEARCH"})                 
            });
        },

      

        
    }
}


export default reduxForm({
    validate,
    form: "HomeForm",
    reducer_home: "HomeReducer",
   

})(connect(mapStateToProps,mapDispatchStateToProps)(Home)); 
