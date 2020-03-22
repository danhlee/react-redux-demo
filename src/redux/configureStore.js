import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'; // middleware = function, warns any attemts to mutate store
import thunk from 'redux-thunk'; // a piece of middleware

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // adds support for redux dev tools

  // createStore(rootReducer(), initialState, applyMiddleware())
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())) // can add as many middleware params into applyMiddleware(...middleware)
  ); 
}
