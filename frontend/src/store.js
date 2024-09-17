import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from './reducers';
// import { createLogger } from 'redux-logger';

export default createStore(reducers, applyMiddleware(thunk));
