
const initialStore = {
   
    /*       location: "",
           name: "",
           type: "",
           bedrooms: "",
           bathrooms: "",
           sleeps: "",
           price: "",
           amenities: "",
           availablestart: "",
           availableend : "",
         
           selectedFile: '',*/
           images : '',
           submit: false,
           owner : true,
           uniquePropName : ""
       
}

const reducer_property = (state = initialStore,action) => {
   
   if(action.type === "OWNERACCESS" && action.payload === 'owner' ){
      
       return {
           ...state,
           owner : true,
           submit : false            
       }
   }

   if(action.type === "OWNERACCESS" && action.payload == "traveler"){
     
       return {
           ...state,
           owner : false,
           submit:false
       
       }
   }

   if(action.type === "UPLOADIMAGES" ){
  
       return {
           ...state,
           images : action.payload
       
       }
   }

   if(action.type === "POSTPROPERTY" && action.statusCode == 400)
   {   
       console.log("Payload: ", action.payload);
       console.log("Status Code : ", action.statusCode);
       return {
           ...state,
           uniquePropName : action.payload,
       
       }

   }

   if(action.type === "POSTPROPERTY" && action.statusCode == 200)
   {
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

  
   return state;
}

export default reducer_property;