import * as types from "./actionTypes";
import * as authorApi from '../../api/authorApi';

/** ACTION CREATOR */
export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors} // {type: types.LOAD_AUTHORS_SUCCESS, authors: authors} -> object shorthand syntax
}


/** THUNKS - Action Creators that return functions 
 * dispatch param is injected into thunks automatically by redux-thunk (ie - not needed as param for loadCourses())
 * 
*/
export function loadAuthors() {
  return function(dispatch) {
    return authorApi.getAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors)); // once dispatched, redux hands off control to reducer with matching type
    }).catch(error => {
      throw error;
    })
  }
}