import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

import userReducer from './Redux/userReducer'
import paletteReducer from './Redux/paletteReducer'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

let reducer = combineReducers({
  userInfo: userReducer,
  paletteInfo: paletteReducer
})

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
