import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
//import Login from './Login/Login';
import { connect } from "react-redux";


class Details extends Component {
    constructor() {
        super();

        this.submitBook = this.submitBook.bind(this);
        this.getNext = this.getNext.bind(this);
       
    }

    componentDidMount() {

        const data = { name: sessionStorage.getItem('SelectedProperty') };
        this.props.getdetails(data);
      

    }

   

    submitBook = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name: this.props.propertydetails.name,
            location : this.props.propertydetails.location,
            owner : this.props.propertydetails.owner,
            arrive: sessionStorage.getItem('arrive'),
            depart: sessionStorage.getItem('depart'),
            guests: sessionStorage.getItem('guests'),
            user: cookie.load('cookie'),
            totalcost: this.props.propertydetails.totalcost

        }
        this.props.bookProperty(data);

    }

    getNext = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        var counter;

        if (typeof (this.props.propertydetails.images[this.props.count + 1]) === "string")
            counter = this.props.count + 1;
        else
            counter = 0;

        const values = ({

            count: counter
        });
        this.props.getNext(values);

    }




    render() {

        let redirectVar = null;
        let available = null;
        //   if(propertydetails.available)
        available = "Available"
        //  else    
        //      available = "Unavailable"

        console.log("AuthFlag at Details: ", this.props.authFlag);
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        else if (this.props.submit) {
            this.props.resetsubmit();
            redirectVar = <Redirect to="/dashboard" />

        }
        let imageView = null, totalcost = null, name = null, type = null , bedrooms = null, bathrooms = null, sleeps = null, price = null, amenities = null;

        if (this.props.propertydetails) {
            if (this.props.propertydetails.images)
                imageView = 'data:image/jpg;base64, ' + this.props.propertydetails.images[this.props.count];

            if (this.props.propertydetails.totalcost)
                totalcost = this.props.propertydetails.totalcost;

            if (this.props.propertydetails.name)
                name = this.props.propertydetails.name;

                
            if (this.props.propertydetails.type)
            type = this.props.propertydetails.type;

            if (this.props.propertydetails.bedrooms)
                name = this.props.propertydetails.bedrooms;

            if (this.props.propertydetails.bathrooms)
                name = this.props.propertydetails.bathrooms;

            if (this.props.propertydetails.sleeps)
                name = this.props.propertydetails.sleeps;

            if (this.props.propertydetails.amenities)
            amenities = this.props.propertydetails.amenities;

            if (this.props.propertydetails.price)
                price = this.props.propertydetails.price;


        }

        return (
            <div>
                <button onClick={this.submitBack} name="back" className="btn btn-primary">Back to Search</button>
                <div className="container">
                    <div>

                        <div className="row">
                            <div className="col-sm-6">
                                <div>
                                    <img width={'300em'} height={'300em'} src={imageView} />
                                    <button name="next" type="button" className="btn btn-secondary" onClick={this.getNext}>></button>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="container">
                               
                                    <div> <div>
                                        {redirectVar}
                                        <div>
                                            <h2> ${price}</h2>
                                            <h5>per night</h5>
                                        </div>
                                    </div>
                                    </div>
                                    <p>Your dates are {available}</p>
                                    <div className="form-group">
                                        <input type="date" className="form-control" name="arrive" value={sessionStorage.getItem('arrive')} placeholder="Arrive" />
                                    </div>
                                    <div className="form-group">
                                        <input type="date" className="form-control" name="depart" value={sessionStorage.getItem('depart')} placeholder="Depart" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="guests" value={sessionStorage.getItem('guests')} placeholder="Guests" />
                                    </div>
                                    <div className="form-group">
                                        <p>Total   $ {totalcost}</p>
                                    </div>
                                    <button onClick={this.submitBook} className="btn btn-primary">Book Now</button>

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div>

                                <h2>{name}</h2>

                                <h6>Type: {type} | Bedrooms: {bedrooms} | Bathrooms: {bathrooms} | Sleeps: {sleeps} </h6>
                                <h6>{amenities}</h6>

                            </div>


                        </div>

                    </div>
                </div>
            </div>
        )
    }
}




const mapStateToProps = state => {
    // console.log(state.reducer_details.propertydetails);
    return {

        propertydetails: state.reducer_details.propertydetails,
        name: state.reducer_details.name,

        submit: state.reducer_details.submit,
        count: state.reducer_details.count,
    }

}

const mapDispatchStateToProps = dispatch => {
    return {

        getdetails: (data) => {
            axios.get('http://localhost:3001/details', data)
                .then((response) => {
                   
                    dispatch({ type: "GETDETAILS", payload: response.data });

                });
        },

        bookProperty: (values) => {
            axios.post('http://localhost:3001/details', values)
                .then(() => {

                    dispatch({ type: "BOOKPROPERTY" });
                });


        },

        submitSearch: (values) => {

            axios.post('http://localhost:3001/searchresults', values)
                .then(response => {

                    console.log(response.data);
                    dispatch({ type: "SUBMIT", payload: response.data });
                });
        },

        getNext: (values) => {

            dispatch({ type: "GETNEXT", payload: values });
        },

        resetsubmit : () => {
 
            dispatch({type: "RESETSUBMIT"})
        }
       


    }
}


export default connect(mapStateToProps, mapDispatchStateToProps)(Details);

