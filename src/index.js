import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/'
import createSagaMiddleware from 'redux-saga'
import { helloSaga } from './sagas'
import axios from 'axios'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
    )
  )
)

sagaMiddleware.run(helloSaga)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


function * gen() {
  var a = yield axios.get('https://jsonplaceholder.typicode.com/posts')
  console.log( "a: ", a )
  var b = yield axios.get('https://jsonplaceholder.typicode.com/users')
  console.log( "b: ", b )
  return 'end'
}

run(gen)

function run(generator) {
  var gen = generator()
  function handle(yielded) {
    if (!yielded.done) {
      yielded.value.then(res => {
        return handle(gen.next(res))
      })
    }
  }
  return handle(gen.next())
}
