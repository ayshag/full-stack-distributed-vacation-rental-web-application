import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import reducer from "./reducer";
import reducer_profile from "./reducer_profile";
import reducer_property from "./reducer_property";
import reducer_ownerdashboard from "./reducer_ownerdashboard";
import reducer_dashboard from "./reducer_dashboard";
import reducer_searchresults from "./reducer_searchresults";
import reducer_details from "./reducer_details"
import reducer_messages from "./reducer_messages"
import reducer_inbox from "./reducer_inbox"
import reducer_home from "./reducer_home"



const rootReducer = combineReducers({

  reducer_profile: reducer_profile,
  reducer : reducer,
  reducer_property : reducer_property,
  reducer_ownerdashboard : reducer_ownerdashboard,
  reducer_dashboard : reducer_dashboard,
  reducer_searchresults : reducer_searchresults,
  reducer_details : reducer_details,
  reducer_messages : reducer_messages,
  reducer_inbox : reducer_inbox,
 reducer_home: reducer_home,
  form: formReducer
});

export default rootReducer;
