export const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";
export const UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";

export const LOAD_AUTHORS_SUCCESS = "LOAD_AUTHORS_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";

export const CHANGE_NAME = "CHANGE_NAME";
export const CHANGE_SCHOOL = "CHANGE_SCHOOL";

/** Actions that end in _SUCCESS are summed to have completed an API call
 * 
 * For Optimistic delete actions, we will hide loading state THUS deliberately omit the "_SUCCESS" suffix
 * If it had the "_SUCCESS" suffix, the apiCallInProgress counter would get decremented below zero because 
 * we are NOT incrementing it when delete request begins (to hide loading progress wheel)
 * 
 */
export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";