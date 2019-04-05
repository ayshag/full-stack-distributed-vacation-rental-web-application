
const initialStore = {
    messages : [],
    replyTo : "",
    gotToMessage : false

}

const reducer_inbox = (state = initialStore,action) => {
    
    if(action.type === "GETMESSAGES"){
      console.log(action.payload)
        return {
            ...state,
            messages: action.payload
        }
    }
    if(action.type === "SETREPLYTO"){
        console.log(action.payload);
        return {
            ...state,
            replyTo : action.payload.replyTo   ,
            goToMessage : true
        }
    }
    if(action.type === "RESETGOTOMESSAGE"){
      
        return {
            ...state,
            goToMessage: false
        }
    }
    if (action.type === "LOGOUT") {
        return {
            ...state,
            messages : [],
            replyTo : "",
            goToMessage : false
        }
    }

    
 
    return state;
}

export default reducer_inbox;