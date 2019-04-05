// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// import registerServiceWorker from './registerServiceWorker';

// import { Provider } from "react-redux";
// import { createStore, applyMiddleware, compose } from "redux";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import promise from "redux-promise";

// import RootReducer from "./reducers";
// import Login from './components/Login/Login';

// //middleware settings
// // To resolve promise to store we use apply
// const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));
// //createStoreWithMiddleware(RootReducer)




// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

// ReactDOM.render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <div>
//           <Switch>
//           <Route path="/login" component={Login}/>

//           </Switch>
//         </div>
//       </BrowserRouter>
//     </Provider>,
//     document.querySelector(".container")
//   );

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();