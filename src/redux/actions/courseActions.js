import * as types from "./actionTypes";

/** ACTION CREATOR */
// course = payload
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}
