import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./Redux/store"
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
export const renderEntireTree = () => {
   root.render(
      <Provider store={store}>
         <App/>
      </Provider>
   );
}

renderEntireTree(store.getState());


reportWebVitals();
