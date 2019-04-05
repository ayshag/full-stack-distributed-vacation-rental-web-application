import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";


class Messages extends Component{
   
    constructor(props){
        super(props);
    }
   
    componentDidMount(){
      
     }
  
     renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;       

        return (
            <div className={className}>
                <input className="form-control" onChange={File.onChange} multiple={field.multiple} placeholder={field.placeholder} type={field.type} {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    onSubmit = (values) => {
        var headers = new Headers();
         //prevent page from refresh
         //e.preventDefault();
       
        const data = {
            message : values.message,
            sender : this.props.sender,
            receiver : this.props.receiver, //this.props.receiver
        }
        console.log(data);
    sessionStorage.setItem("sendToOwner", "");
    sessionStorage.setItem("replyTo", "");
    this.props.sendMessage(data);
    
       
        }
    
    render(){
        console.log(this.props);
       
            console.log("Rendering Send Message Page");
            var redirectVar = null;
        const { handleSubmit } = this.props;
       if( this.props.submit) {
            this.props.resetsubmit();
            redirectVar = <Redirect to="/inbox" />

        }
      
        return(
            <div className="container">
            <div className="signup-form">
                <div className="main-div">
                    <div className="panel">
                    {redirectVar}
                        <h2>Send Message</h2>

                    </div>
                    <p>Sender: {this.props.sender}</p> 
                    <p>Receiver: {this.props.receiver}</p>
                    <form  onSubmit={handleSubmit(this.onSubmit.bind(this))}     >
                      
                      <Field

                          placeholder="Your Message"
                          name="message"
                          type="textbox"
                       
                          component={this.renderField}
                      />

                                    

               <button type = "submit" className="btn btn-primary">Send Message</button>
                  </form>

                      </div>
            </div>
        </div>
        )
    }
}




const mapStateToProps = state =>{

    var setsender, setreceiver;
    
      setsender = state.reducer.username;
        
      if(sessionStorage.getItem("sendToOwner")!="" && sessionStorage.getItem("sendToOwner")!=null)
        setreceiver = sessionStorage.getItem("sendToOwner");

    if(sessionStorage.getItem("replyTo")!="" && sessionStorage.getItem("replyTo")!= null )
        setreceiver = sessionStorage.getItem("replyTo");
   
    return {
        sender : setsender,  
        receiver : setreceiver,
        submit : state.reducer_messages.submit 
        
    }
   
}

const mapDispatchStateToProps = dispatch => {
    return {
            sendMessage : (data)=>
            {
                axios.post('http://localhost:3001/messages', data)
                .then((response) =>
                {
                    dispatch({ type: "SUBMIT"});
                }) 
        
            },
            resetsubmit: () => {

                dispatch({ type: "RESETSUBMIT" });
            }
 

    }
}


export default reduxForm({
    
    form: "MessagesForm"
   // reducer_property: "PostPropertyReducer",
   

})(connect(mapStateToProps,mapDispatchStateToProps)(Messages)); 

