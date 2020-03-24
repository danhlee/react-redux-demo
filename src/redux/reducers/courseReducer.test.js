import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

/** PATTERN: ARRANGE, ACT, ASSERT
 *
 * Arrange - describes whatever setup is needed
 * Act - describes/invokes code under test
 * Assert - describes the verification of test code's behavior
 *
 */
it('should add course when passed CREATE_COURSE_SUCCESS', () => {
  // arrange test scenario
  // omitting any properties that we aren't testing (ie - author, category)
  const initialState = [
    {
      title: 'A'
    },
    {
      title: 'B'
    }
  ];

  const newCourse = {
    title: 'C'
  };

  // create action
  const action = actions.createCourseSuccess(newCourse);

  // get newState by passing action into the reducer under test
  const newState = courseReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual('A');
  expect(newState[1].title).toEqual('B');
  expect(newState[2].title).toEqual('C');
});

it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
  // ARRANGE
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];

  const courseToUpdate = { id: 2, title: 'New Title' };
  const action = actions.updateCourseSuccess(courseToUpdate);

  // ACT
  const newState = courseReducer(initialState, action);
  const updatedCourse = newState.find(course => course.id == courseToUpdate.id);
  const untouchedCourse = newState.find(course => course.id == 1);

  // ASSERT
  expect(updatedCourse.title).toEqual("New Title");
  expect(untouchedCourse.title).toEqual("A");
  expect(newState.length).toEqual(3);
});
