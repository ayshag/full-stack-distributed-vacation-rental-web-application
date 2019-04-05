import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import GetProfileReducer from "./reducer_profile";
import PostProfileReducer from "./reducer_profile";

const initialStore = {
    username : "",
    authFlag : false,
    login_status: "",
    type : ""
}

const reducer = (state = initialStore,action) => {
    
    if(action.type === "LOGIN" && action.statusCode == 200){
        sessionStorage.setItem("usertoken", action.payload.token);
      
        return {
            ...state,
            username : action.payload.username,
            authFlag : action.payload.authFlag,
            login_status : action.payload.login_status,
            type : action.payload.type
        }
    }
    if(action.type === "LOGIN" && action.statusCode == 400){
       
        return {
            ...state,
            authFlag : action.payload.authFlag,
            login_status : action.payload.login_status,
            username : "",
            type: ""
        }
    }
    if(action.type === "OWNERLOGIN" && action.statusCode == 200){
        sessionStorage.setItem("usertoken", action.payload.token);
        return {
            ...state,
            username : action.payload.username,
            authFlag : action.payload.authFlag,
            login_status : action.payload.login_status,
            type : action.payload.type
        }
    }
    if(action.type === "OWNERLOGIN" && action.statusCode == 400){
   
        return {
            ...state,
            authFlag : action.payload.authFlag,
            login_status : action.payload.login_status,
            username : "",
            type: ""
        }
    }

    if(action.type === "SIGNUP" && action.statusCode == 200){
        sessionStorage.setItem("usertoken", action.payload.token);
        return {
            ...state,
            username : action.payload.username,
            authFlag : action.payload.authFlag,
            login_status : action.payload.login_status,
            type : action.payload.type
        }
    }
    if(action.type === "SIGNUP" && action.statusCode == 400){
   
        return {
            ...state,
            authFlag : action.payload.authFlag,
            login_status : action.payload.login_status,
            username : "",
            type: ""
        }
    }

    if(action.type === "OWNERSIGNUP" && action.statusCode == 200){
        sessionStorage.setItem("usertoken", action.payload.token);
        return {
            ...state,
            username : action.payload.username,
            authFlag : action.payload.authFlag,
            login_status : action.payload.login_status,
            type : action.payload.type
        }
    }
    if(action.type === "OWNERSIGNUP" && action.statusCode == 400){
   
        return {
            ...state,
            authFlag : action.payload.authFlag,
            login_status : action.payload.login_status,
            username : "",
            type: ""
        }
    }

    if(action.type === "LOGOUT"){
        sessionStorage.setItem("usertoken", "");
        console.log(sessionStorage.getItem("usertoken"));
        return {
            ...state,
            username : "",
            authFlag : false,
            login_status : action.payload.login_status,
            type : ""
        }
    }
 
    return state;
}

export default reducer;