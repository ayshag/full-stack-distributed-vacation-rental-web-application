 
const initialStore = {
    searchresults: [],
    name: "",
 
    hidden: "",
    submit: false,
    count: 0,
    selectedGetNext: "",
   
    rerendered : false,
    page : 1,
    displayresults : []
}

const reducer_searchresults = (state = initialStore,action) => {
    
    if(action.type === "SEARCHRESULTS" )
    {
	var display; 
	if(action.payload.length<=10)
		display = action.payload; 
	else
		display = action.payload.slice(0,10);
	console.log("Display: ", display);
       
        return {
            ...state,
            
                searchresults: action.payload,
                rerendered : true,
               	displayresults : display
            }                
        }
    

    if(action.type === "SETNAME"){
        
        return {
            ...state,
            name : action.payload.name     
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
	    displayresults : action.payload.displaySearchResults
        }
    }
 if(action.type === "GETPREVPAGE"){
      
        return {
            ...state,
            page : action.payload.prevPage,
	    displayresults : action.payload.displaySearchResults
        }
    }




    if(action.type === "SUBMIT"){
      
        return {
            ...state,
            submit: true
        }
    }

    if(action.type === "RESETSUBMIT"){
      
        return {
            ...state,
            submit: false,
	    displayresults : []
        }
    }
   
    if (action.type === "LOGOUT") {
        return {
            ...state,
            searchresults: [],
            name: "",
            
            hidden: "",
            submit: false,
            count: 0,
            selectedGetNext: "",
    
            rerendered : false,
	    page : 1,
	    displayresults : []

        }
    }
    return state;
}

export default reducer_searchresults;