import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

import userReducer from './Redux/userReducer'
import palettesReducer from './Redux/palettesReducer'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { transitions, positions, Provider as AlertProvider, types } from 'react-alert'

let reducer = combineReducers({
  userInfo: userReducer,
  palettesInfo: palettesReducer
})

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

document.addEventListener('keydown', (e) => {
	if (e.key === "Tab") {
		document.body.classList.add("keyboard-accessible");
	}
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove("keyboard-accessible");
});

const AlertTemplate = (props) => {
  const { message, close } = props;

  return <div className="alert-wrapper">
            <div className="alert">
              <div className="close-alert-wrapper" onClick={close} ><i  className="material-icons close-alert-btn">close</i></div>
              <i className="material-icons error-icon">error_outline</i>
              <span className="error-msg">{ message }</span>
            </div>
         </div>
}

const options = {
  position: "top center",
  timeout: 5000,
  containerStyle: {
    height: "100%",
    pointerEvents: "auto"
  }
}

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AlertProvider>
, document.getElementById('root'));

serviceWorker.unregister();
