import { combineReducers } from 'redux';
import courses from './courseReducer'; // courses = function called courseReducer() *DEFAULT exports can be renamed on import -> REASON = reducers return the state, which makes sense to name as nouns/objects
import authors from './authorReducer'; // authors = function called authorsReducer() *DEFAULT exports can be renamed on import -> REASON = reducers return the state, which makes sense to name as nouns/objects
import apiCallsInProgress from './apiStatusReducer';

// param = { stateName: reducerName } **side note, if key == reducer name we can use object shorthand syntax { commonReducerName }
const rootReducer = combineReducers({
  courses: courses, // convention {stateName: reducerImportedName} *stateName is ref used in mapStateToProps()
  authors: authors,
  apiCallsInProgress  // using object shorthand syntax here just to show it works
});

export default rootReducer;
