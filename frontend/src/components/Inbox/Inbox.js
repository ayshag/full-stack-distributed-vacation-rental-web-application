import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";


class Inbox extends Component {

    constructor(props) {
        super(props);
        this.replyToChangeHandler = this.replyToChangeHandler.bind(this);
    }

    componentWillMount() {
        this.props.getmessages(this.props.username);
       
    }


    
   replyToChangeHandler = (e) => {
        var replyname = e.target.value.split(" - ")[0];
        const values = {
            replyTo: replyname
        }
        sessionStorage.setItem('replyTo',replyname);
        this.props.setreplyTo(values);
        
    }


  //  onSubmit = (values) => {
        /* var headers = new Headers();
          //prevent page from refresh
          //e.preventDefault();
        
         const data = {
             message : values,
             sender : this.props.sender,
             receiver : this.props.receiver, //this.props.receiver
         }
         console.log(data);
     this.props.sendMessage(data);
     
       */
   // }

    render() {
        var redirectVar = null;
      //  if (!cookie.load('cookie')) {
	if(!this.props.authFlag) {
            redirectVar = <Redirect to="/login" />
        }
      
        else if (this.props.goToMessage){
            this.props.resetgoToMessage();
            redirectVar = <Redirect to="/messages" />
        }

        var messages = null;
    
        console.log("rendering messages", this.props.messages);
        if (this.props.messages && this.props.messages.length != 0) {
            
            messages = this.props.messages.map(message => {



                return (
                    <div>
                {redirectVar}

                        <div className="container">
                        <div className="bordered-div">
                            <div className="row">
                                <div className="col-sm-12">

                                    <div>
                                       <div> Sender : {message.sender} </div>
                                        <div> Message : {message.message}</div>
                                        <button className="btn btn-primary" name="reply" onClick={this.replyToChangeHandler} value={message.sender} >Reply</button>

                                    </div>


                                </div>
                            </div>
                            </div>
                        </div>

                    </div >
                )
            })
        }

        return (
            <div className="container">
                <div className="signup-form">
                    <div className="main-div">
                        <div className="panel">

                            <h2>Inbox</h2>

                        </div>

                        <div className="container">

                            <div className="row">
                                <div className="col-*-*">
                                    
                                    {messages}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}





const mapStateToProps = state => {

  
    return {
        messages: state.reducer_inbox.messages,
        replyTo : state.reducer_inbox.replyTo,
        goToMessage : state.reducer_inbox.goToMessage,
	authFlag : state.reducer.authFlag,
	username : state.reducer.username

    }

}

const mapDispatchStateToProps = dispatch => {
   // var user;
    //if(this.props.username == "")
    //user = cookie.load('cookie');
    //else
      //user = this.props.username;
    return {
        getmessages: (username) => {
            axios.get('http://localhost:3001/messages/' + username,{headers: {authorization : "jwt" + sessionStorage.getItem("usertoken")}})
                .then((response) => {
                    console.log(response.data);
                    dispatch({ type: "GETMESSAGES", payload: response.data });
                })
        },
        setreplyTo : (values) => {
           
            dispatch({type: "SETREPLYTO",payload : values});
    
    },
    resetgoToMessage: () => {

        dispatch({ type: "RESETGOTOMESSAGE" });
    }


    }
}


export default connect(mapStateToProps, mapDispatchStateToProps)(Inbox);

