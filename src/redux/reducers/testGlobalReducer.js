import * as types from './../actions/actionTypes';
import initialState from './initialState';

/** REDUCERS - accept state and action then returns a NEW state 
 * 
 * initialState.courses is an array of course objects
 * 
*/
export default function testReducer(state = initialState, action) {
  console.log('[REDUCER] action.type = ' + action.type);
  switch (action.type) {
    case types.CHANGE_NAME:
      console.log('...updating name in store');
      console.log('action.payload = ' + action.payload);

      return Object.assign({}, state, {
        name: action.payload
      });
    case types.CHANGE_SCHOOL:
      console.log('...updating school in store');
      console.log('action.payload = ' + action.payload);

      return Object.assign({}, state, {
        school: action.payload
      });
    default:
      return state;
  }
}