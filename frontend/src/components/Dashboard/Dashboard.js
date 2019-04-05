import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
class Dashboard extends Component{
   
    constructor(props){
        
        super(props);
        this.getNext = this.getNext.bind(this);
        this.ownerChangeHandler = this.ownerChangeHandler.bind(this);
    }
   
    componentDidMount(){
      this.props.dashboard(this.props.username);
       
     }

     getNext = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
           name : e.target.value
        }
      
        var counter; 
        var resetcounter = true;
       
        for(var i = 0 ;i<this.props.trips.length; i++)
        {
            var testVar = this.props.trips[i].name + this.props.trips[i].arrive.split('T')[0];
        
             if(data.name == testVar && data.name == this.props.selectedGetNext)
            {
            
             if(typeof(this.props.trips[i].images[this.props.count + 1])=='string') 
            {
               //Checking if image exists
             
                 counter = this.props.count + 1;  
             }
             else 
            {
               
                 counter = 0;
                 
            }
            resetcounter = false;
            break;

        }
    }
  
        if(resetcounter)
        { 
            counter = 1;
        }

        const values = {
            selectedGetNext : data.name,
          count : counter
        }

       this.props.getNext(values);

       
    }


 getNextPage = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
	console.log(this.props.page);

var nextPage, nextStartIndex, nextEndIndex;
var displayTrips = [];

	if(this.props.trips.length<=5)
	{
		nextPage = 1;
		displayTrips = this.props.trips;
	}
   	else 
	{
		nextPage = this.props.page + 1;
		nextStartIndex = (nextPage * 5 ) - 5;
		
		if(this.props.trips.length < nextStartIndex)
			{
				nextPage = nextPage - 1;
				displayTrips = this.props.displaytrips;
			}
		else
			{
				nextEndIndex = (nextPage*5) ;
				displayTrips  = this.props.trips.slice(nextStartIndex,nextEndIndex);
			} 
	}
	const data = 
	{
		nextPage : nextPage,
		displayTrips : displayTrips
	}
	console.log("Data: ", data);
        this.props.getNextPage(data);


    }
 getPrevPage = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
	
        var prevPage, prevStartIndex,  prevEndIndex;
	var displayTrips = [];


	if(this.props.page==1)
	{
		prevPage = 1;
		displayTrips = this.props.displaytrips;
	}
   	else 
	{
		prevPage = this.props.page - 1;
		//prevStartIndex= (prevPage * 5 ) - 5;
		prevStartIndex = (prevPage * 5 ) - 5;
		prevEndIndex= (prevPage *5) ;
		displayTrips = this.props.trips.slice(prevStartIndex,prevEndIndex);
		
			 
	}
	const data = 
	{
		prevPage: prevPage,
		displayTrips : displayTrips
	}
	console.log("Data: ", data);
        this.props.getPrevPage(data);


    }


ownerChangeHandler = (e) => {
        var ownername = e.target.value;//.split(" - ")[0];
        console.log(e.target.value);
        const values = {
            owner: ownername
        }
        sessionStorage.setItem('sendToOwner',ownername);
        console.log(sessionStorage.getItem("sendToOwner"));
        this.props.setowner(values);
        
    }
    render(){
        var trips  = null ;

        if(this.props.trips)
        {
            console.log(this.props.trips);
         trips = this.props.displaytrips.map(trip => {
            let imageView = 'data:image/jpg;base64, ';
            if(imageView == "" || this.props.selectedGetNext != (trip.name+trip.arrive.split('T')[0]))
            {
                 imageView = imageView +trip.images[0];
            }
            else 
            {
                 
                imageView = imageView + trip.images[this.props.count];
            }
            return(
                <div>
                   
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                 <img width = {'200em'}  height={'200em'} src={imageView} />
                                    <button name = "next" type = "button" className = "btn btn-secondary" onClick={this.getNext} value = {trip.name+trip.arrive.split('T')[0]}>></button> 
                                   
                                </div>
                                <div className="col-sm-6">
                                    <h3>{trip.propertyname},{trip.location}</h3>
                                    <h5>Arrival Date: {trip.arrive.split('T')[0]}, Departure Date: {trip.depart.split('T')[0]}</h5>
                                    <h5>Guests: {trip.guests} Trip Cost: {trip.cost_income}</h5> 
 				    <p>
                                        <button className="btn btn-link" name="messageowner" onClick={this.ownerChangeHandler} value={trip.owner} >Message Owner</button>

                                    </p>
                                </div>
                                
                        </div>
                </div>
           
             </div >
            )
        })
    }
     
        let redirectVar = null;
        let alert = null
       // if(!cookie.load('cookie')){
	if(!this.props.authFlag){
            redirectVar = <Redirect to= "/login"/>
        }
	
	 if (this.props.goToMessage){
	   
            this.props.resetgoToMessage();
            redirectVar = <Redirect to="/messages" />
        }
        if(this.props.rerendered == false)
        alert = <h4>Loading your trips...</h4>
        else if (this.props.rerendered && trips.length==0)
             alert = <p>You do not have any past trips! Book a trip now : <Link to="/home">Search</Link> </p>  
      
        return(
            <div>
          {redirectVar}
                <div className="container">
                <h3> Your Trips Booked </h3>
                    <div className="row">
                        <div className="col-*-*">

                            {trips}
                            {alert}
                        </div>
                    </div>
		    <div> 
			<button name="previousPage" type="button" className="btn btn-secondary" onClick={this.getPrevPage} >Prev</button> {this.props.page}  <button name="nextPage" type="button" className="btn btn-secondary" onClick={this.getNextPage} >Next</button>
		    </div>

                </div>
            </div>
        )
    }
}




const mapStateToProps = state =>{
   
    return {
        trips : state.reducer_dashboard.trips , 
        count : state.reducer_dashboard.count,
    
        selectedGetNext : state.reducer_dashboard.selectedGetNext,
        rerendered : state.reducer_dashboard.rerendered ,
	authFlag : state.reducer.authFlag,
	username : state.reducer.username,
	page : state.reducer_searchresults.page,
   	displaytrips : state.reducer_dashboard.displaytrips,
 	owner : state.reducer_dashboard.owner,
        goToMessage : state.reducer_dashboard.goToMessage


    }
   
}

const mapDispatchStateToProps = dispatch => {
    return {
            dashboard :(username) => {

            axios.get('http://localhost:3001/dashboard/'+ username ,{headers: {authorization : "jwt" + sessionStorage.getItem("usertoken")}})
            .then((response) => {
               dispatch({type: "DASHBOARD",payload : response.data});
            });
        },

        
        getNext : (values) => {

            dispatch({type:"GETNEXT", payload: values });
        },
	getNextPage : (values) => {

            dispatch({type:"GETNEXTPAGE", payload: values });
        },
	getPrevPage : (values) => {

            dispatch({type:"GETPREVPAGE", payload: values });
        },
	resetgoToMessage: () => {

            dispatch({ type: "RESETGOTOMESSAGE" });
        },
        setowner :(values) => {
           
            dispatch({type: "SETOWNER",payload : values});
    
    	}
        

    }
}


export default connect(mapStateToProps,mapDispatchStateToProps)(Dashboard); 


