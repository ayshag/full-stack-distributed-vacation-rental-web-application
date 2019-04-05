import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

class Profile extends Component {
   
    constructor(props){
        super(props);       
        this.onSubmit = this.onSubmit.bind(this);
    }



    componentDidMount() {
        console.log("Did Mount Profile");
        this.props.getprofile(this.props.username);
      //  console.log("Test: ", this.props.getprofile);
    }
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <input className="form-control" pattern={field.pattern} value={field.value} placeholder={field.placeholder} type={field.type} {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    /*  onSubmit = (values) => {
          var headers = new Headers();
  
          //prevent page from refresh
         // values.preventDefault();
          console.log("values" ,values);
          this.props.login(values,() => {this.props.history.push("/login");});
          
        
          //set the with credentials to true
         axios.defaults.withCredentials = true;
      }
  */

 onSubmit (values)  {
    var headers = new Headers();
   // preventDefault();
    //prevent page from refresh
   // values.preventDefault();
   values.email = this.props.username;
   //values.email = cookie.load('cookie');
    console.log(this.props);
   if (values.name == null  && this.props.name != null)
   
     values.name = this.props.name;


     if (values.phone == null  && this.props.phone!=null)
         values.phone = this.props.phone;

     if (values.city == null && this.props.city!=null)
         values.city = this.props.city;
     

     if (values.country == null && this.props.country!=null)
     values.country = this.props.country;


     if (values.aboutme == null && this.props.aboutme!=null)
     values.aboutme = this.props.aboutme;

     if (values.company == null && this.props.company!=null)
     values.company = this.props.company;


     if (values.school == null && this.props.school!=null)
     values.school = this.props.school;


     if (values.languages == null && this.props.languages!=null)
     values.languages = this.props.languages;

     if (values.gender == null && this.props.gender !=null)
     values.gender = this.props.gender;

     if (values.hometown == null && this.props.hometown !=null)
     values.hometown = this.props.hometown;

   
    console.log("Values on Updating Profile" ,values);
    this.props.postprofile(values,() => {this.props.history.push("/profile");});
    
}

    render() {
        console.log("Inside Profile Render");
        const { handleSubmit } = this.props;
        var name, phone, city, country, aboutme, company, school, languages, gender, hometown;
        if (this.props.name)
            name = this.props.name;
        else
            name = "Name";

        if (this.props.phone)
            phone = this.props.phone;
        else
            phone = "Phone";

        if (this.props.city)
            city = this.props.city;
        else
            city = "City";

        if (this.props.country)
            country = this.props.country;
        else
            country = "Country";

        if (this.props.aboutme)
            aboutme = this.props.aboutme;
        else
            aboutme = "About Me";

        if (this.props.company)
            company = this.props.company;
        else
            company = "Company";

        if (this.props.school)
            school = this.props.school;
        else
            school = "School";

        if (this.props.languages)
            languages = this.props.languages;
        else
            languages = "Languages";

        if (this.props.gender)
            gender = this.props.gender;
        else
            gender = "Gender";
        if (this.props.hometown)
            hometown = this.props.hometown;
        else
            hometown = "Hometown";

            var redirectVar = null;
            if (this.props.updated)
            {    
              this.props.resetupdated();          
               redirectVar = <Redirect to="/profile" />
            }
        return (

            <div>
                {redirectVar}
                <div className="container">

                    <div className="signup-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2>Profile</h2>
                            </div>
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}/*handleSubmit(this.submitUpdate.bind(this))*/ >
                               
                                <Field

                                    placeholder={name}
                                    name="name"
                                    type="text"
                                 
                                    component={this.renderField}
                                />

                                <Field
                                    placeholder={phone}
                                    name="phone"
                                    type="text"
				      pattern={'[0-9]{10}'}    
                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={aboutme}
                                    name="aboutme"
                                    type="text"
				
                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={city}
                                    name="city"
                                    type="text"

                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={country}
                                    name="country"
                                    type="text"

                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={company}
                                    name="company"
                                    type="text"

                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={school}
                                    name="school"
                                    type="text"

                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={hometown}
                                    name="hometown"
                                    type="text"

                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={languages}
                                    name="languages"
                                    type="text"

                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={gender}
                                    name="gender"
                                    type="text"

                                    component={this.renderField}
                                />
                                {/* <button onClick= /*{this.submitUpdate} {handleSubmit(this.submitUpdate.bind(this))} className="btn btn-primary">Update</button> */}
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



        );
    }
}




const mapStateToProps = state =>{
   
    return {
        name : state.reducer_profile.name,
        phone : state.reducer_profile.phone,
        aboutme : state.reducer_profile.aboutme,
        city : state.reducer_profile.city,
        country : state.reducer_profile.country,
        company : state.reducer_profile.company,
        school : state.reducer_profile.school,
        hometown : state.reducer_profile.hometown,
        languages : state.reducer_profile.languages,
        gender : state.reducer_profile.gender,
        updated : state.reducer_profile.updated,
	username : state.reducer.username
       }
}
const mapDispatchStateToProps = dispatch => {

    return {
        getprofile : (username) => {
            axios.get('http://localhost:3001/profile/'+ username,{headers: {authorization : "jwt" + sessionStorage.getItem("usertoken")}} )
                .then((response) => {                  
                    dispatch({type: "GETPROFILE",payload : response.data,statusCode : response.status})
            })
        },
        postprofile : (values) => {
            axios.post('http://localhost:3001/profile', values)
                .then((response) => {
                    
                    dispatch({type: "POSTPROFILE",payload : response.data})
            })
        },

        resetupdated : () => {
 
                    dispatch({type: "RESETUPDATED"})
                }
             
        }
    }


export default reduxForm({

    form: "ProfileForm",
    reducer : "ProfileReducer"
})(connect(mapStateToProps,mapDispatchStateToProps)(Profile)); 


/* <Field

                                    placeholder="Image"
                                    name="Image"
                                    type="text"

                                    component={this.renderField}
                                />*/