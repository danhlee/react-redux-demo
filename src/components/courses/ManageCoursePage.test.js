import React from 'react';
import { mount } from 'enzyme';
import {authors, newCourse, courses} from '../../../tools/mockData.js';
// import ManageCoursePage from './ManageCoursePage';   // this is to import the DEFAULT export (which is the connected ver of component)
import {ManageCoursePage} from './ManageCoursePage';    // This is to import NAMED non-default export (unconnected ver)


// PATTERN: factory function to call react components with default values
function render(args) {
  const defaultProps = {
    authors,
    courses,
    // history is passed from React Router in real app, stubbing for test
    // could also use MemoryRouter like in Header.test.js
    // could also wrap with React Router (if you want to test React Router related behavior)
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {}
  };

  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);

  // 1. wrapping the provider
  // return mount(<Provider store={store}><ManageCoursePage/></Provider>)

  // 2. Export raw unconnected version of component (avoids having to import provider and store)
  // - to do this you must export the ACTUAL component first and import here

}

// validation test for if a user hits save w/o title
it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  
  // we know error should exist at this point, and errors have the class alert so we try to find the first instance
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is Required.");
});