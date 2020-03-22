import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

/** ACTION CREATOR */
// course = payload

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses }; // {type: types.LOAD_COURSES_SUCCESS, courses: courses} -> object shorthand syntax
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course}
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course}
}

/** THUNKS - Action Creators that return functions (with dispatch as a parameter, but can also take getState as parameter)
 * dispatch param is injected into thunks automatically by redux-thunk (ie - not needed as param for loadCourses())
 *
 */
export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

// courseApi.saveCourse(course) is an AJAX POST request that returns the (saved course?) response if successful
export function saveCourse(course) {
  return function(dispatch, getState) {
    return courseApi.saveCourse(course)
    .then(savedCourse => {
      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    })
    .catch(error => {
      throw error;
    });
  };
}
