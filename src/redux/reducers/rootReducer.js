import { combineReducers } from 'redux';
import courses from './courseReducer'; // courses = function called courseReducer() *DEFAULT exports can be renamed on import
import authors from './authorReducer';

// param = { key: reducerName } **side note, if key == reducer name we can use object shorthand syntax { commonReducerName }
const rootReducer = combineReducers({
  courses: courses, // convention {stateName: reducerImportedName} *stateName is ref used in mapStateToProps()
  authors: authors
});

export default rootReducer;
