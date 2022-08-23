import {SHOW, HIDE} from '../actions/HandlerLoading';

const stateDefault = {
  isShowLoading: false,
};
export const handlerLoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SHOW:
      return {isShowLoading: true};
    case HIDE:
      return {isShowLoading: false};
    default:
      return state;
  }
};
