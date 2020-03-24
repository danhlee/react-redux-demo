import React from 'react';
import { cleanup, render } from '@testing-library/react';
import CourseForm from './CourseForm';

/** React Testing Library
 *
 * - there is now SHALLOW rendering. Components are always mounted and child components are rendered
 * - focuses on what end users can see
 *
 */

// runs after each test
afterEach(cleanup);

// PATTERN: factory function to call react components with default values
function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it('should render Add Course header', () => {
  // react-testing-library's render(<Component/>) function returns an object with different methods inside
  // method refs can be destructured (ie - const {getByText} ) getByText is one of those methods
  const { getByText } = renderCourseForm();

  // getByText() has built-in assertion
  // if it doesn't find text we pass in, it will fail
  getByText('Add Course');
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText('Save');
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText, debug } = renderCourseForm({ saving: true });
  
  // debug shows generated HTML in console
  // debug();
  getByText('Saving...');
});
