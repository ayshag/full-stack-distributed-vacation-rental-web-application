
const initialStore = {
    propertydetails: [],
    name: "",
    back: false,
    submit: false,
    count: 0

}

const reducer_details = (state = initialStore, action) => {

    if (action.type === "GETDETAILS") {
        return {
            ...state,

            propertydetails: action.payload

        }
    }
    if (action.type === "BOOKPROPERTY") {

        return {
            ...state,
            submit: true
        }
    }
    if (action.type === "GETNEXT") {

        return {
            ...state,
            count: action.payload.count
        }
    }

    if (action.type === "RESETSUBMIT") {

        return {
            ...state,
            submit: false
        }
    }

    if (action.type === "LOGOUT") {
        return {
            ...state,
            propertydetails: [],
            name: "",
            back: false,
            submit: false,
            count: 0
        }
    }

    return state;
}

export default reducer_details;