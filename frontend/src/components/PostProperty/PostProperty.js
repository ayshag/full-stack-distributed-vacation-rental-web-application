import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";


class PostProperty extends Component {
    constructor(props) {
        super(props);
    
   //     this.submitPostProperty = this.submitPostProperty.bind(this);
    }
    componentWillMount()
    {
        this.props.owneraccess(this.props.username);
    }
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;       

        return (
            <div className={className}>
                <input className="form-control" pattern={field.pattern}onChange={File.onChange} multiple={field.multiple} placeholder={field.placeholder} type={field.type} {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    onChangeimages = (e) => {
     console.log("Images: ",e.target.name);
        if(e.target.name == 'images'){
       console.log(e.target.files);
  //        this.setState({
  //          images: e.target.files
   //      })
        }else{
            
     //     this.setState({ [e.target.name]: e.target.value });
        }
        var values = e.target.files;
      this.props.uploadimages(values);
    //   console.log(e.target.files);
    }


    onSubmit = (values) => {
       var headers = new Headers();
        //prevent page from refresh
       // e.preventDefault();
        const images  = this.props.images;
        console.log(images);
        let formData = new FormData();
        const data = {filename : values.name  };
       for(var i = 0; i<images.length; i++)
        {
          formData.append("images[]",images[i]);
        }

        axios.post('http://localhost:3001/uploadphotos/setname', data)
        .then(() => {
            axios.post('http://localhost:3001/uploadphotos', formData)
            .then(() => {});
        });
        console.log("Cookie at PP: ", cookie.load('cookie'));
       /* const propdata = {
            location: values.location,
            name: values.name,
            type: values.type,
            bedrooms: values.bedrooms,
            bathrooms: values.bathrooms,
            sleeps: values.sleeps,
            price: values.price,
            amenities: values.amenities,
            availablestart: values.availablestart,
            availableend : values.availableend,
            owner :  cookie.load('cookie')

        }*/
      // values.owner = cookie.load('cookie');
	values.owner = this.props.username;
       console.log("Values at PostProperty: ",values);
       this.props.postproperty(values,() => {this.props.history.push("/ownerdashboard");});
       
    }

//       uploadMultiple = (e) =>
//       {
//         e.preventDefault();
//           const images  = this.state.images;
//           console.log(images);
//           let formData = new FormData();
//           const data = {filename : this.state.name  };
//          for(var i = 0; i<images.length; i++)
//           {
      
//             formData.append("images[]",images[i]);
//           }
   

//           axios.post('http://localhost:3001/setphotoname', data)
//           .then((result) => {
//               axios.post('http://localhost:3001/uploadpropphotos', formData)
//               .then((result) => {});
//           });

          
    
//       }
    render() {
        const { handleSubmit } = this.props;
        let redirectVar = null;
        let redirectNotOwner = null;


        let uniquePropNameAlert = null;
      console.log("Redirect to Login: ",this.props.authFlag);
        //if (!cookie.load('cookie')) {
if(!this.props.authFlag){
            redirectVar = <Redirect to="/login" />
        }
        
   
     console.log("This Props: ",this.props);
          console.log("This Props Owner: ",this.props.owner);
           if(this.props.owner=="traveler")
             redirectNotOwner = <Redirect to="/home" />
        
         if(this.props.uniquePropName == "Name exists")
          uniquePropNameAlert = <h5>Property already exists with this name. Please pick another property name</h5>

          if (this.props.submit)
          {    
            this.props.resetsubmit();          
             redirectVar = <Redirect to="/ownerdashboard" />
          }
         
        // const { selectedFile,images } = this.state;
         return (
            <div>
                         {redirectNotOwner}
                     {redirectVar}
                <div className="container">
                     <div className="signup-form">
                         <div className="main-div">
                             <div className="panel">
                                 <h2>Post Property</h2>

                             </div>
                             {/* <form onSubmit={this.submitPostProperty} enctype="multipart/form-data" > */}
                             <form onSubmit={handleSubmit(this.onSubmit.bind(this))}  enctype="multipart/form-data" /*handleSubmit(this.submitUpdate.bind(this))*/ >
                               
                               <Field

                                   placeholder="Location"
                                   name="location"
                                   type="text"
                                
                                   component={this.renderField}
                               />

                               <Field
                                   placeholder="Name"
                                   name="name"
                                   type="text"

                                   component={this.renderField}
                               />
                               {uniquePropNameAlert}
                               <Field
                                   placeholder="Type"
                                   name="type"
                                   type="text"

                                   component={this.renderField}
                               />
                               <Field
                                   placeholder="Bedrooms"
                                   name="bedrooms"
                                   type="text"
			             pattern={'[0-9]{1,}'}    
                                   component={this.renderField}
                               />
                               <Field
                                   placeholder="Bathrooms"
                                   name="bathrooms"
                                   type="text"
				    pattern={'[0-9]{1,}'}    
                                   component={this.renderField}
                               />
                               <Field
                                   placeholder="Sleeps"
                                   name="sleeps"
                                   type="text"
				      pattern={'[0-9]{1,}'}    
                                   component={this.renderField}
                               />
                               <Field
                                   placeholder="Price"
                                   name="price"
                                   type="text"
			           pattern={'[0-9]{1,}'}    
                                   component={this.renderField}
                               />
                               <Field
                                   placeholder="Amenities"
                                   name="amenties"
                                   type="text"

                                   component={this.renderField}
                               />
                               <Field
                                   placeholder="Available Start Date"
                                   name="availablestart"
                                   type="date"

                                   component={this.renderField}
                               />
                               <Field
                                   placeholder="Available End Date"
                                   name="availableend"
                                   type="date"

                                   component={this.renderField}
                               />
                               <div>
                                Upload Property Photos
                               
                             <input type="file" multiple name="images"  onChange={this.onChangeimages} />
                                  
                               
                            </div>

                        

                        <button type = "submit" className="btn btn-primary">Post Property</button>
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
    if (!values.location) {
        errors.location = "Enter Location";
    }
    if (!values.name) {
        errors.name = "Enter Name";
    }
    if (!values.sleeps) {
        errors.sleeps = "Enter Sleeps";
    }
    if (!values.price) {
        errors.price = "Enter Price";
    }
    if (!values.availablestart) {
        errors.availablestart = "Enter Starting Availability Date";
    }
    if (!values.availableend) {
        errors.availableend = "Enter Ending Availability Date";
    }

    return errors;
}


const mapStateToProps = state =>{
   
    return {
        
        owner : state.reducer.type,  
        images : state.reducer_property.images,
        uniquePropName : state.reducer_property.uniquePropName,
        submit:state.reducer_property.submit,
	authFlag : state.reducer.authFlag,
	username : state.reducer.username

    }
   
}

const mapDispatchStateToProps = dispatch => {
    return {
	
        owneraccess : (username) => {
             axios.get('http://localhost:3001/getuseraccess/' + username /*cookie.load('cookie')*/)
            .then((response) => {
                dispatch({type: "OWNERACCESS",payload : response.data})
             
            })
        },
        uploadimages : (values) =>{
            console.log("Values; ", values);
            dispatch({type:"UPLOADIMAGES",payload: values})
        },
        postproperty : (values) =>{

        axios.post('http://localhost:3001/postproperty', values)
        .then((response) => {
            console.log("Property Added");
           dispatch({type: "POSTPROPERTY",payload : response.data, statusCode: response.status})
        }).catch((error) =>{
            console.log("Failed");
            dispatch({type: "POSTPROPERTY",payload : error.response.data, statusCode: error.response.status})
        })
    },
    resetsubmit: () => {

        dispatch({ type: "RESETSUBMIT" });
    },
    
       }
}
export default reduxForm({
    validate,
    form: "PostPropertyForm",
    reducer_property: "PostPropertyReducer",
   

})(connect(mapStateToProps,mapDispatchStateToProps)(PostProperty)); 
