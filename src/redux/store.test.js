import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import initialState from './reducers/initialState';
import * as courseActions from './actions/courseActions';

/** INTEGRATION TEST
 * 
 * - tests integration of action, store, reducers
 * - ACTION --dispatched--> STORE --triggers--> REDUCER --returns updated state--> STORE
 * 
 */
it('Should handle createing courses', function() {
  // ARRANGE
  const store = createStore(rootReducer, initialState);
  const course = {
    title: 'Clean Code'
  };

  // ACT
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);     // reducer should get triggered by dispatching the action and change the state

  // ASSERT
  const createdCourse = store.getState().courses[0];    // store was initially empty, so after adding, the first course should be the one we added
  // console.log(store.getState())
  expect(createdCourse).toEqual(course);
});
