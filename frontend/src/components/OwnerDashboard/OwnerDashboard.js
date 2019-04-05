import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class OwnerDashboard extends Component {
    constructor(props) {

        super(props);
       
        this.getNext = this.getNext.bind(this);
        this.getNextBooking = this.getNextBooking.bind(this);
    }
    componentWillMount() {
       
    }

    componentDidMount() {
        this.props.ownerdashboard(this.props.username);
        this.props.ownerdashboardprops(this.props.username);
    }

    getNext = (e) => {
        var headers = new Headers();
       
        e.preventDefault();

      //  console.log("GetNextValue: ", e.target.value);
        const data = {
            name: e.target.value
        }
       // console.log(data.name, this.state.selectedGetNext);
        var counter;
        var resetcounter = true;

        for (var i = 0; i < this.props.properties.length; i++) {

            var testVar = this.props.properties[i].name;

            if (data.name == testVar && data.name == this.props.selectedGetNext) {

                if (typeof (this.props.properties[i].images[this.props.count + 1]) == 'string') {
                    //Checking if image exists

                    counter = this.props.count + 1;
                }
                else {
                    counter = 0;
                }
                resetcounter = false;
                break;

            }
        }

        if (resetcounter) {
            counter = 1;
        }
       
       const values = {
            selectedGetNext: data.name,
            count: counter
        }

        this.props.getNext(values);
       
    }

    getNextBooking = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        console.log("GetNextBookingValue: ", e.target.value);
        const data = {
            name: e.target.value
        }
       // console.log(data.name, this.state.selectedGetNextBooking);
        var bookingcounter;
        var resetcounter = true;

        for (var i = 0; i < this.props.bookings.length; i++) {

            var testVar = this.props.bookings[i].propertyname + this.props.bookings[i].arrive.split('T')[0];

            if (data.name == testVar && data.name == this.props.selectedGetNextBooking) {

                if (typeof (this.props.bookings[i].images[this.props.bookingcount + 1]) == 'string') {
                    //Checking if image exists

                    bookingcounter = this.props.bookingcount + 1;
                }
                else {
                    bookingcounter = 0;

                }
                resetcounter = false;
                break;

            }
        }

        if (resetcounter) {
            bookingcounter = 1;
        }

        const values = {
            selectedGetNextBooking: data.name,
            bookingcount: bookingcounter
        }

       this.props.getNextBooking(values);
     //   console.log(this.state.selectedGetNextBooking);
     //   console.log(this.state.bookingcount);
    }



 getNextPage = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
	console.log(this.props.page);

var nextPage, nextStartIndex, nextEndIndex;
var displayProperties = [];

	if(this.props.properties.length<=5)
	{
		nextPage = 1;
		displayProperties = this.props.properties;
	}
   	else 
	{
		nextPage = this.props.page + 1;
		nextStartIndex = (nextPage * 5 ) - 5;
		
		if(this.props.properties.length < nextStartIndex)
			{
				nextPage = nextPage - 1;
				displayProperties = this.props.displayproperties ;
			}
		else
			{
				nextEndIndex = (nextPage*5) ;
				displayProperties = this.props.properties.slice(nextStartIndex,nextEndIndex);
			} 
	}
	const data = 
	{
		nextPage : nextPage,
		displayProperties : displayProperties 
	}
	console.log("Data: ", data);
        this.props.getNextPage(data);


    }
 getPrevPage = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
	
        var prevPage, prevStartIndex,  prevEndIndex;
	var displayProperties = [];


	if(this.props.page==1)
	{
		prevPage = 1;
		displayProperties = this.props.displayproperties;
	}
   	else 
	{
		prevPage = this.props.page - 1
		prevStartIndex = (prevPage * 5) - 5;
		prevEndIndex= (prevPage *5) ;
		displayProperties = this.props.properties.slice(prevStartIndex,prevEndIndex);
		
			 
	}
	const data = 
	{
		prevPage: prevPage,
		displayProperties : displayProperties 
	}
	console.log("Data: ", data);
        this.props.getPrevPage(data);


    }


 getNextBookingsPage = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
	console.log(this.props.bookingspage );

var nextPage, nextStartIndex, nextEndIndex;
var displayBookings = [];

	if(this.props.bookings.length<=5)
	{
		nextPage = 1;
		displayBookings = this.props.bookings;
	}
   	else 
	{
		nextPage = this.props.bookingspage + 1;
		nextStartIndex = (nextPage * 5 ) - 5;
		
		if(this.props.bookings.length < nextStartIndex)
			{
				nextPage = nextPage - 1;
				displayBookings = this.props.displaybookings ;
			}
		else
			{
				nextEndIndex = (nextPage*5) ;
				displayBookings = this.props.bookings.slice(nextStartIndex,nextEndIndex);
			} 
	}
	const data = 
	{
		nextPage : nextPage,
		displayBookings : displayBookings 
	}
	console.log("Data: ", data);
        this.props.getNextBookingsPage(data);


    }
 getPrevBookingsPage = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
	
        var prevPage, prevStartIndex,  prevEndIndex;
	var displayBookings = [];


	if(this.props.bookingspage==1)
	{
		prevPage = 1;
		displayBookings = this.props.displaybookings;
	}
   	else 
	{
		prevPage = this.props.bookingspage - 1
		prevStartIndex = (prevPage * 5) - 5;
		prevEndIndex= (prevPage *5) ;
		displayBookings = this.props.bookings.slice(prevStartIndex,prevEndIndex);
		
			 
	}
	const data = 
	{
		prevPage: prevPage,
		displayBookings : displayBookings 
	}
	console.log("Data: ", data);
        this.props.getPrevBookingsPage(data);


    }



    render() {
    var properties = null, bookings= null;
    this.props.owneraccess(this.props.username);
    if(this.props.properties){
         properties = this.props.properties.map(property => {
            let imageView = 'data:image/jpg;base64, ';
            if (imageView == "" || this.props.selectedGetNext != property.name) {
                imageView = imageView + property.images[0];
            }
            else {

                imageView = imageView + property.images[this.props.count];
            }
        
            return (

                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <img width={'200em'} height={'200em'} src={imageView} />
                            <button name="next" type="button" className="btn btn-secondary" onClick={this.getNext} value={property.name}>></button>
                        </div>
                        <div className="col-sm-6">
                            <h3>{property.name},{property.location}</h3>
                            <h5> Type: {property.type} | Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms} | Sleeps: {property.sleeps} | Price: {property.price} </h5>
                            <h5> Available From: {property.availablestart.split('T')[0]} | Available Till : {property.availableend.split('T')[0]}</h5>

                        </div>

                    </div>
                </div>

            )
        })
    }

    if(this.props.bookings)
    {
         bookings = this.props.bookings.map(booking => {
            let bookingimageView = 'data:image/jpg;base64, ';
            if (bookingimageView == "" || this.props.selectedGetNextBooking != (booking.propertyname + booking.arrive.split('T')[0])) {
                bookingimageView = bookingimageView + booking.images[0];
            }
            else {

                bookingimageView = bookingimageView + booking.images[this.props.bookingcount];
            }
            return (
                <div>

                    <div className="container">
                        <div className="row" >
                            <div className="col-sm-6">
                                <img width={'200em'} height={'200em'} src={bookingimageView} />
                                <button name="next" type="button" className="btn btn-secondary" onClick={this.getNextBooking} value={booking.propertyname + booking.arrive.split('T')[0]}>></button>
                            </div>
                            <div className="col-sm-6">
                                <h3>{booking.propertyname},{booking.location}</h3>
                                <h5>Booked by: {booking.traveler}</h5>
                                <h5>Arrival Date: {booking.arrive.split('T')[0]}, Departure Date: {booking.depart.split('T')[0]}</h5>
                                <h5> Trip Income: {booking.cost_income}</h5>
                            </div>
                        </div>
                    </div>

                </div >
            )
        })
    }
        //redirect based on successful login
        let redirectVar = null;
        let alertbookings = null;
        let alertproperties = null;
        let redirectNotOwner = null;
        console.log(this.props.owner)
      //  if (!cookie.load('cookie')) {
	if(!this.props.authFlag) {
            redirectVar = <Redirect to="/login" />
        }
        if (!this.props.owner)
            redirectNotOwner = <Redirect to="/home" />

        if (this.props.rerendered == false) {
            alertbookings = <h4>Loading traveler bookings for you properties...</h4>
            alertproperties = <h4>Loading your properties...</h4>
        }

        if (this.props.rerendered && bookings.length == 0)
            alertbookings = <h3>You do not have any traveler bookings on properties </h3>
        if (this.props.rerendered && properties.length == 0)
            alertproperties = <h3>You do not have any properties. </h3>

        return (
            <div>
                {redirectNotOwner}
                {redirectVar}
                <h3> Your Properties </h3>
                <div className="container">

                    <div className="row">
                        <div className="col-*-*">
                            {alertproperties}
                            {properties}
                        </div>
                    </div>
	              <div> 
			<button name="previousPage" type="button" className="btn btn-secondary" onClick={this.getPrevPage} >Prev</button> {this.props.page}  <button name="nextPage" type="button" className="btn btn-secondary" onClick={this.getNextPage} >Next</button>
		    </div>

                </div>
                <h3> Traveler Bookings  On Your Properties </h3>
                <div className="container">

                    <div className="row">
                        <div className="col-*-*">
                            {alertbookings}
                            {bookings}
                        </div>
                    </div>
			  <div> 
			<button name="previousPage" type="button" className="btn btn-secondary" onClick={this.getPrevBookingsPage} >Prev</button> {this.props.page}  <button name="nextPage" type="button" className="btn btn-secondary" onClick={this.getNextBookingsPage} >Next</button>
		    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = state =>{
   
    return {
        
        properties: state.reducer_ownerdashboard.properties,
        bookings: state.reducer_ownerdashboard.bookings,
        owner: state.reducer_ownerdashboard.owner,
        count: state.reducer_ownerdashboard.count,
        bookingcount: state.reducer_ownerdashboard.bookingcount,
        selectedGetNext: state.reducer_ownerdashboard.selectedGetNext,
        selectedGetNextBooking: state.reducer_ownerdashboard.selectedGetNextBooking,
        rerendered: state.reducer_ownerdashboard.rerendered,
	authFlag : state.reducer.authFlag,
	username : state.reducer.username,
	 page : state.reducer_ownerdashboard.page,
   	 displayproperties : state.reducer_ownerdashboard.displayproperties,
	bookingspage : state.reducer_ownerdashboard.bookingspage,
   	 displayproperties : state.reducer_ownerdashboard.displayproperties,

      
    }
   
}

const mapDispatchStateToProps = dispatch => {
    return {

        owneraccess : (username) => {
            console.log("Checking Owner Access");
            axios.get('http://localhost:3001/getuseraccess/' +username ,{headers: {authorization : "jwt" + sessionStorage.getItem("usertoken")}} )
            .then((response) => {
                console.log("Respnose for OwnerAccess: ",response);
                dispatch({type: "OWNERACCESS",payload : response.data})
             
            })
        },

        ownerdashboard :(username) => {
            axios.get('http://ec2-18-217-104-211.us-east-2.compute.amazonaws.com:3001/ownerdashboard/' + username ,{headers: {authorization : "jwt" + sessionStorage.getItem("usertoken")}})
            .then((response) => {
                console.log(response);
                dispatch({type: "OWNERDASHBOARD",payload : response.data});
            });
        },

        ownerdashboardprops : (username) => {
            
            axios.get('http://localhost:3001/ownerdashboardprops/' + username ,{headers: {authorization : "jwt" + sessionStorage.getItem("usertoken")}})
                .then((response) => {
                    
                    dispatch({type: "OWNERDASHBOARDPROPS",payload : response.data});
                    
                });
        },

        getNext : (values) => {

            dispatch({type:"GETNEXT", payload: values });
        },

        getNextBooking: (values) => {
            dispatch({type:"GETNEXTBOOKING",payload : values});
        },
	getNextPage : (values) => {

            dispatch({type:"GETNEXTPAGE", payload: values });
        },
	getPrevPage : (values) => {

            dispatch({type:"GETPREVPAGE", payload: values });
        },
	getNextBookingPage : (values) => {

            dispatch({type:"GETNEXTBOOKINGSPAGE", payload: values });
        },
	getPrevBookingPage : (values) => {

            dispatch({type:"GETPREVBOOKINGSPAGE", payload: values });
        }



    }
}

//reducer_property: "PostPropertyReducer"   
//properties: this.state.properties.concat(response.data)

export default connect(mapStateToProps,mapDispatchStateToProps)(OwnerDashboard); 





