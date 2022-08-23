import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from '../reducers';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger)),
);

export default store;
