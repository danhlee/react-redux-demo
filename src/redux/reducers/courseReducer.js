import * as types from  './../actions/actionTypes';
import initialState from './initialState';

/** REDUCERS - accept state and action then returns a NEW state 
 * 
 * initialState.courses is an array of course objects
 * 
*/
export default function courseReducer(state = initialState.courses, action) {
  switch(action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, {...action.course}];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map(course => course.id === action.course.id ? action.course : course) // creates a NEW ARRAY populated with the results of calling a provided function on every element in the calling array. (alters elements according to function)
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== action.course.id); //array.filter(predicateFunction()) creates a NEW ARRAY with all elements that pass the test implemented by the predicateFunction
    default:
      return state;
  }
}