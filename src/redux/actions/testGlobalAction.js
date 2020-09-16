import * as types from './actionTypes';

/** ACTION CREATOR */
// course = payload

export function changeName(payload) {
  console.log('AC - changeName');
  return { type: types.CHANGE_NAME, payload };
}

export function changeSchool(payload) {
  console.log('AC - changeSchool');
  return { type: types.CHANGE_SCHOOL, payload };
}