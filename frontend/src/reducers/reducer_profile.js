
const initialStore = {
    name : null,
    phone: null,
    aboutme: null,
   city: null,
  country : null,
  company : null,
  school: null,
  hometown: null,
  languages: null,
  gender : null,
  updated : false
}

const reducer_profile = (state = initialStore,action) => {
    
    if(action.type === "GETPROFILE" && action.statusCode == 200){
       
        return {
            ...state,
            name : action.payload.name,
            phone : action.payload.phone,
            city : action.payload.city,
            aboutme:action.payload.aboutme,
            country : action.payload.country,
            company : action.payload.company,
            hometown : action.payload.hometown,
            languages : action.payload.languages,
            gender : action.payload.gender,
            updated : false
        
        }
    }

    if(action.type === "POSTPROFILE" && action.payload == "Updated"){
      
        return {
            ...state,
            updated : true
        
        }
    }

    if(action.type === "RESETUPDATED"){
      
        return {
            ...state,
            updated: false
        }
    }

    if (action.type === "LOGOUT") {
        return {
            ...state,
            name : null,
            phone: null,
            aboutme: null,
           city: null,
          country : null,
          company : null,
          school: null,
          hometown: null,
          languages: null,
          gender : null,
          updated : false
        }
    }


    return state;
}

export default reducer_profile;