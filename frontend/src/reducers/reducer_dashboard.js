
const initialStore = {
    trips :[]  , 
    count : 0,
    selectedGetNext : "",  
    rerendered : false,
    page : 1,
    displaytrips : [],
    owner :"",
    goToMessage : false,
      
}

const reducer_dashboard = (state = initialStore,action) => {
   

    if(action.type === "DASHBOARD"){
 	var display; 
	if(action.payload.length<=5)
		display = action.payload; 
	else
		display = action.payload.slice(0,5);
        return {
            ...state,
            trips : action.payload  ,
            rerendered : true ,
	    displaytrips : display   
        }
    }

   
    if(action.type === "GETNEXT"){
      
        return {
            ...state,
            selectedGetNext : action.payload.selectedGetNext,
            count : action.payload.count        
        }
    }

 if(action.type === "GETNEXTPAGE"){
      
        return {
            ...state,
            page : action.payload.nextPage,
	    displaytrips : action.payload.displayTrips
        }
    }
 if(action.type === "GETPREVPAGE"){
      
        return {
            ...state,
            page : action.payload.prevPage,
	    displaytrips : action.payload.displayTrips
        }
    }
 if(action.type === "SETOWNER"){
        console.log(action.payload);
        return {
            ...state,
            owner : action.payload.owner   ,
            goToMessage : true
        }
    }
    if(action.type === "RESETGOTOMESSAGE"){
      
        return {
            ...state,
            goToMessage: false
        }
    }
    if(action.type === "LOGOUT"){
        return {
            ...state,
            trips :[]  , 
            count : 0,
            selectedGetNext : "",  
            rerendered : false  ,
	    page : 1,
	    displaytrips : []

        }
    }


    return state;
}

export default reducer_dashboard;