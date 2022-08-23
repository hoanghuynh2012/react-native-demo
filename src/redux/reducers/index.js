import {combineReducers} from 'redux';
import {handlerLoadingReducer} from './HandlerLoading';

const rootReducer = combineReducers({
  handlerLoadingReducer,
});

export default rootReducer;
