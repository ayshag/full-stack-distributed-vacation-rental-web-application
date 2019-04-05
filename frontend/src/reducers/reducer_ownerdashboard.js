
const initialStore = {
    properties: [],
    bookings: [],
    owner: true,
    count: 0,
    bookingcount: 0,
    selectedGetNext: "",
    selectedGetNextBooking: "",
    rerendered: false,
    page : 1,
    displayproperties : [],
    bookingspage : 1,
    displaybookings : [],


	
}

const reducer_ownerdashboard = (state = initialStore,action) => {
    
    if(action.type === "OWNERACCESS" && action.payload === 'owner' ){
       console.log(action.payload);
        return {
            ...state,
            owner : true                
        }
    }

    if(action.type === "OWNERACCESS" && action.payload == "traveler"){
        console.log(action.payload);
        return {
            ...state,
            owner : false        
        }
    }

    if(action.type === "OWNERDASHBOARD"){
        
	var display; 
	if(action.payload.length<=5)
		display = action.payload; 
	else
		display = action.payload.slice(0,5);
     

        return {
            ...state,
            bookings : action.payload  ,
            rerendered : true      ,
	     displaybookings : display

        }
    }

    if(action.type == "OWNERDASHBOARDPROPS"){
      var display; 
	if(action.payload.length<=5)
		display = action.payload; 
	else
		display = action.payload.slice(0,5);
     

        return {
            ...state,
            properties : action.payload  ,
            rerendered : true,
	    displayproperties : display    
        }
    }

    if(action.type === "GETNEXT"){
      
        return {
            ...state,
            selectedGetNext : action.payload.selectedGetNext,
            count : action.payload.count        
        }
    }

    if(action.type === "GETNEXTBOOKING"){
      
        return {
            ...state,
            selectedGetNextBooking : action.payload.selectedGetNextBooking,
            bookingcount : action.payload.bookingcount        
        }
    }

	 if(action.type === "GETNEXTPAGE"){
      
        return {
            ...state,
            page : action.payload.nextPage,
	    displayproperties : action.payload.displayProperties
        }
    }
 if(action.type === "GETPREVPAGE"){
      
        return {
            ...state,
            page : action.payload.prevPage,
	    displayproperties : action.payload.displayProperties
        }
    }

if(action.type === "GETNEXTBOOKINGSPAGE"){
      
        return {
            ...state,
            bookingspage : action.payload.nextPage,
	    displaybookings : action.payload.displayBookings
        }
    }
 if(action.type === "GETPREVBOOKINGSPAGE"){
      
        return {
            ...state,
            bookingspage : action.payload.prevPage,
	    displaybookings : action.payload.displayBookings
        }
    }

    if (action.type === "LOGOUT") {
        return {
            ...state,
            properties: [],
            bookings: [],
            owner: true,
            count: 0,
            bookingcount: 0,
            selectedGetNext: "",
            selectedGetNextBooking: "",
            rerendered: false,	
	    page : 1,
	    displayproperties : [],
    	    bookingspage : 1,
    	    displaybookings : [],

        }
    }

    return state;
}

export default reducer_ownerdashboard;