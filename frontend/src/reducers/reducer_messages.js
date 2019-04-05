
const initialStore = {
    sender : "",
    receiver: "",
    //message : "",
    submit : false

}

const reducer_messages = (state = initialStore,action) => {
    
    if(action.type === "SUBMIT"){
      
        return {
            ...state,
            submit: true
        }
    }
    if(action.type === "RESETSUBMIT"){
      
        return {
            ...state,
            submit: false
        }
    }

    if (action.type === "LOGOUT") {
        return {
            ...state,
            sender : "",
            receiver: "",
            //message : "",
            submit : false
        }
    }

    
    
 
    return state;
}

export default reducer_messages;