import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  // if the substring index is greater than the length of the string, it returns ""
  return type.substring(type.length - 8) === "_SUCCESS"
}

export default function apiCallStatusReducer(state = initialState.apiCallsInProgress, action) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (action.type === types.API_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  // default is to return the state
  return state;
}