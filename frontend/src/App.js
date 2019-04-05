import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import rootReducer from "./reducers";
import Login from './components/Login/Login';
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(rootReducer, composePlugin(applyMiddleware(promise)));
//createStoreWithMiddleware(RootReducer)

//App Component
class App extends Component {
  render() {
 //   console.log(store.getState());
    return (
      //Use Browser Router to route to different pages
      <Provider store={store}>

      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
          
         
        </div>
      </BrowserRouter>
      </Provider>/*,document.querySelector(".container")*/
        
    );
  
  }
}
//Export the App component so that it can be used in index.js
export default App;
