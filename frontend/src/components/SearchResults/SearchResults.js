import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

class SearchResults extends Component {
    constructor(props) {
        super(props);
       
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        
        this.hiddenChangeHandler = this.hiddenChangeHandler.bind(this);
        this.getNext = this.getNext.bind(this);
    
    }
  
    componentDidMount() {
        console.log("Did Mount Search Results");

        this.props.getsearchresults();


    }
    nameChangeHandler = (e) => {
        const values = {
            name: e.target.value
        }
        this.props.setname(values);
        
    }


   
    hiddenChangeHandler = (e) =>{
     this.setState({hidden : e.target.value})}   
     
     
     onSubmit = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
     
        const values = {
            name: this.props.name,
            arrive: sessionStorage.getItem('arrive'),
            depart: sessionStorage.getItem('depart'),
            guests: sessionStorage.getItem('guests'),
            
         //   hidden : this.state.hidden

        }
/* this.setState({
            submit: true

        });*/
       //Push to Details
       console.log(values.name);
       this.props.submitSearch(values,() => {this.props.history.push("/details");});
    
    }

    getNext = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        console.log("GetNextValue: ", e.target.value);
        const data = {
            name: e.target.value

        }
       
        var counter; 
        
        var resetcounter = true;

        for (var i = 0; i < this.props.searchresults.length; i++) {

            var testVar = this.props.searchresults[i].name;
             
            if (data.name == testVar && data.name == this.props.selectedGetNext) {
                if (typeof (this.props.searchresults[i].images[this.props.count + 1]) == 'string') {
                    console.log("Next Image Exists");
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


 getNextPage = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
	console.log(this.props.page);

var nextPage, nextStartIndex, nextEndIndex;
var displaySearchResults = [];

	if(this.props.searchresults.length<=10)
	{
		nextPage = 1;
		displaySearchResults = this.props.searchresults;
	}
   	else 
	{
		nextPage = this.props.page + 1;
		nextStartIndex = (nextPage * 10 ) - 10;
		
		
		if(this.props.searchresults.length < nextStartIndex)
			{
				nextPage = nextPage - 1;
				displaySearchResults = this.props.displayresults;
			}
		else
			{
				nextEndIndex = nextPage*10;
				displaySearchResults  = this.props.searchresults.slice(nextStartIndex,nextEndIndex);
			} 
	}
	const data = 
	{
		nextPage : nextPage,
		displaySearchResults : displaySearchResults
	}
	console.log("Data: ", data);
        this.props.getNextPage(data);


    }
 getPrevPage = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
	
        var prevPage, prevStartIndex,  prevEndIndex;
	var displaySearchResults = [];


	if(this.props.page==1)
	{
		prevPage = 1;
		displaySearchResults = this.props.displayresults;
	}
   	else 
	{
		prevPage = this.props.page - 1;
		prevStartIndex= (prevPage * 10 ) - 10;
		prevEndIndex= (prevPage *10) ;
		displaySearchResults  = this.props.searchresults.slice(prevStartIndex,prevEndIndex);
		
			 
	}
	const data = 
	{
		prevPage: prevPage,
		displaySearchResults : displaySearchResults
	}
	console.log("Data: ", data);
        this.props.getPrevPage(data);


    }


    render() {

        var searchresults = null;
       
        if(this.props.searchresults && this.props.searchresults.length!=0)
        {
          //  const { handleSubmit } = this.props;
        
         searchresults = this.props.displayresults.map(searchresult => {
            
            let imageView = 'data:image/jpg;base64, ';
            if (imageView == "" || this.props.selectedGetNext != searchresult.name) {
                imageView = imageView + searchresult.images[0];
            }
            else {

                imageView = imageView + searchresult.images[this.props.count];
            }
         

            return (
                <div>

                    <form onSubmit={this.onSubmit.bind(this)} >
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">

                                    <img width={'200em'} height={'200em'} src={imageView} />
                                    <button name="next" type="button" className="btn btn-secondary" onClick={this.getNext} value={searchresult.name}>></button>

                                </div>
                                <div className="col-sm-6">
                                    <p>
                                        <input type="submit" className="btn btn-link" name="details" onClick={this.nameChangeHandler} value={searchresult.name}></input>

                                    </p>
                                    Type: {searchresult.type} | Bedrooms: {searchresult.bedrooms} | Bathrooms: {searchresult.bathrooms} | Sleeps: {searchresult.sleeps} | Price: {searchresult.price}
                                
                                {
                                   // <p>
                                   // <Link to={"/messages/" +this.props.owner }>Message Property Owner</Link> 
                                   // </p>
                                }
                                </div>
                            </div>
                        </div>
                    </form>
                </div >
            )
        })
    }
        let redirectVar = null;
        let alert = null;
      //  if (!cookie.load('cookie')) {
	if(!this.props.authFlag) {
            redirectVar = <Redirect to="/login" />
        }
        else if (this.props.submit) {
            this.props.resetsubmit();
            redirectVar = <Redirect to="/details" />

        }
       
        if(this.props.rerendered == false)
            alert = <h4>Searching for properties...</h4>
        else if (this.props.rerendered && searchresults == null)
            alert = <h4>Sorry, no properties available for entered combination</h4>
        return (
            <div>
                {redirectVar}
                <div>
                    <div className="input-group">
                        <input type="text" className="form-control" name="destination" defaultValue={sessionStorage.getItem('destination')} placeholder = {"Destination"} />
                        <input type="text" className="form-control" name="arrive" defaultValue={sessionStorage.getItem('arrive')} placeholder={"Date of Arrival"}  onFocus ={(e) => e.target.type = "date"}  />
                        <input type="text" className="form-control" name="depart" defaultValue={sessionStorage.getItem('depart')} placeholder={"Date of Departure"}  onFocus ={(e) => e.target.type = "date"} />
                        <input type="text" className="form-control" name="guests" defaultValue={sessionStorage.getItem('guests')} placeholder={"Guests"} />
                    </div>
                    
                    <div className="container">

                        <div className="row">
                            <div className="col-*-*">
                                {alert}
                                {searchresults}
                            </div>
                        </div>
		    <div> 
			<button name="previousPage" type="button" className="btn btn-secondary" onClick={this.getPrevPage} >Prev</button> {this.props.page}  <button name="nextPage" type="button" className="btn btn-secondary" onClick={this.getNextPage} >Next</button>
		    </div>
                    </div>
                    </div>
                </div>
            

        )
        
    }
}

const mapStateToProps = state =>{
   console.log("Page: ", state.reducer_searchresults.page);
   console.log("DisplayResults: ", state.reducer_searchresults.displayresults);
    return {
        searchresults: state.reducer_searchresults.searchresults,
    name: state.reducer_searchresults.name,
    hidden: state.reducer_searchresults.hidden ,
    submit: state.reducer_searchresults.submit,
    count: state.reducer_searchresults.count,
    selectedGetNext: state.reducer_searchresults.selectedGetNext,
    rerendered : state.reducer_searchresults.rerendered,
    
    authFlag : state.reducer.authFlag,
    page : state.reducer_searchresults.page,
    displayresults : state.reducer_searchresults.displayresults
   }
   
}

const mapDispatchStateToProps = dispatch => {
    return {
        resetSubmit : () =>
        {
          dispatch({type: "RESETSUBMIT"})  
        },
        getsearchresults : () => {
            axios.get('http://localhost:3001/searchresults',{headers: {authorization : "jwt" + sessionStorage.getItem("usertoken")}} )
            .then((response) => {
           
                dispatch({type: "SEARCHRESULTS",payload : response.data});

               
            });
        },

        setname :(values) => {
           
                dispatch({type: "SETNAME",payload : values});
        
        },
      
        submitSearch : (values) => {
            
            axios.post('http://localhost:3001/details/query', values)
            .then(response => {
              
                console.log(response.data);
                dispatch({type: "SUBMIT",payload : response.data});
            });
        },

        getNext : (values) => {

            dispatch({type:"GETNEXT", payload: values });
        },

        resetsubmit: () => {

            dispatch({ type: "RESETSUBMIT" });
        },

       
 	getNextPage : (values) => {

            dispatch({type:"GETNEXTPAGE", payload: values });
        },
	getPrevPage : (values) => {

            dispatch({type:"GETPREVPAGE", payload: values });
        },




        
    }
}


export default connect(mapStateToProps,mapDispatchStateToProps)(SearchResults); 