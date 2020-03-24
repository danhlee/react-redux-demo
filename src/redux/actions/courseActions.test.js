import * as courseActions from './courseActions';
import * as types from './actionTypes';
import { courses } from '../../../tools/mockData';

// need these for testing thunks
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'; // mocks fetch calls used in our thunks
import configureMockStore from 'redux-mock-store';

/** TESTING ACTION CREATORS */
describe('createCourseSuccess', () => {
  it('should create a CREATE_COURSE_SUCCESS action', () => {
    // created expectation
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course
    };

    // create action using action creator you want to test
    const action = courseActions.createCourseSuccess(course);

    // assert
    expect(action).toEqual(expectedAction);
  });
});

/** TESTING ASYNC ACTIONS (thunks)
 *
 * - still asserting actions are created
 *
 */
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  // the afterEach function will run after each test within this DESCRIBE BLOCK
  // fetchMock.restore() re-initializes fetchMock for each test (keeps test "atomic")
  afterEach(() => {
    fetchMock.restore();
  });

  describe('Load Courses Thunk', () => {
    it('should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses', () => {
      // capture all fetch calls and respons with mock data (2nd param containing body: courses and headers)
      // avoids making an ACTUAL API call
      fetchMock.mock('*', {
        body: courses,
        headers: { 'content-type': 'application/json' }
      });
      
      // declare expected actions
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];

      // create and initialize mockStore
      // dispatch loadCourses() action that returns a promise
      const store = mockStore({courses: []});
      return store.dispatch(courseActions.loadCourses()).then(() => {
        // getActions() returns a list (array) of action objects that have occurred
        expect(store.getActions()).toEqual(expectedActions);
      });

    });
  });
  
});


describe('Async Actions', () => {
  // the afterEach function will run after each test within this DESCRIBE BLOCK
  // fetchMock.restore() re-initializes fetchMock for each test (keeps test "atomic")
  afterEach(() => {
    fetchMock.restore();
  });

  describe('Load Courses Thunk', () => {
    it('should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses', () => {
      // capture all fetch calls and respons with mock data (2nd param containing body: courses and headers)
      // avoids making an ACTUAL API call
      fetchMock.mock('*', {
        body: courses,
        headers: { 'content-type': 'application/json' }
      });
      
      // declare expected actions
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];

      // create and initialize mockStore
      // dispatch loadCourses() action that returns a promise
      const store = mockStore({courses: []});
      return store.dispatch(courseActions.loadCourses()).then(() => {
        // getActions() returns a list (array) of action objects that have occurred
        expect(store.getActions()).toEqual(expectedActions);
      });

    });
  });
  
});