import { combineReducers } from 'redux';
import courses from './courseReducer'; // courses = function called courseReducer() DEFAULT imports can be renamed on import


// param = { key: reducerName } **side note, if key == reducer name we can use object shorthand syntax { commonReducerName }
const rootReducer = combineReducers({
  courses: courses
});

export default rootReducer;
