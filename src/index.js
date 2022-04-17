import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';



let 초기값 = [
  { id : 0, name : '멋진 자동차', quan : 2},
  { id : 1, name : '좋은 자동차', quan : 3}
];
let state초기값 = [ {id : 0, name : '새로운상품', quan : 2} ];

function reducer(state = 초기값, 액션){

  if (액션.type === '항목추가') {
    let 몇번째있니 = state.findIndex( (a)=> { return a.id === 액션.데이터.id });

    if ( 몇번째있니 >= 0){
      let copy = [...state];
      copy[몇번째있니].quan++;
    } else {
      let copy = [...state];
      copy.push(액션.데이터);
      return copy
    }
  } else if (액션.type === '수량증가'){
    let copy = [...state];
    copy[액션.데이터].quan++;
    return copy 
  } else if (액션.type === '수량감소'){
    let copy = [...state];
    copy[액션.데이터].quan--;
    return copy 
  } else {
    return state
  }
};

let alert초기값 = true;

function reducer2(state = alert초기값, 액션){
  if (액션.type === 'alert닫기'){
    return false
  } else {
    return state
  }
  
}

let store = createStore( combineReducers({reducer, reducer2}) );


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
