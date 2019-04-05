import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const initialStore = {
   
      submit : false
}

const reducer = (state = initialStore,action) => {
    
    if(action.type === "SUBMITSEARCH" ){
        return {
            ...state,
           submit : true,
          }
    }
     
    if(action.type === "RESETSUBMIT"){
        return {
            ...state,
            submit : false
        }
    }
 
    return state;
}

export default reducer;