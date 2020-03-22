import React, { useEffect, useState } from 'react'; // useEffect = hook that allows side effects like componentDidMount
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions'; // action creators and thunks
import { loadAuthors } from '../../redux/actions/authorActions';
import { newCourse } from '../../../tools/mockData.js';
import CourseForm from './CourseForm';

/** Function Component with HOOKS -> allows function components to have state and side-effiects
 *
 * props can be destructured in the signature area of the function component
 * ...props at the end holds any remaining props that haven't been destructured in signature (...props is a REST operator, which looks EXACTLY the same as a SPREAD operator)
 * props that are not destructured will be accessed via props.varName
 *
 */
function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  /** STATE VARIABLES using "Array Destructuring Syntax"
   *
   * useState() returns a pair of values
   * const [stateVariable, stateSetterFunction] = useState({defaultStateValue })
   * {...props.course} is a copy of the object props.course (ie - spread operator)
   */
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  /** useEffect(effectFunction, arrayOfItemsToWatchAndRerun)
   *
   * if arrayOfItemsToWatchAndRerun is empty it will only run once when the component mounts (essentially acting like componentDidMount)
   * if any vars in arrayOfItemsToWatchAndRerun changes/updates, the useEffect() function will fire again
   * 
   */
  useEffect(() => {
    // length check on the courses state to only make fetch calls when state is empty
    if (courses.length === 0) {
      // loadCourses() is a thunk that can THROW an error (so it must be handled when called)
      loadCourses().catch(error => {
        alert('Loading courses failed' + error);
      });
    } else {
      setCourse({...props.course});
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert('Loading authors failed' + error);
      });
    }
  }, [props.course]);

  /** In, function components, we declare internal functions using "function keyword", whereas class components have no keyword */
  function handleChange(event) {
    // need to destruction values on event.target so that it is available (and not garbage collected) inside the nested callback inside setCourse()
    const { name, value } = event.target;

    // prevCourse = prevState: ...prevCourse just fills new state with values of prevCourse in addition to a "name" property that is
    // overwritten with the new input value or id# if the field name is "authorID"
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault(); // to prevent page from POSTING BACK

    // this is the locally scoped destructured variable NOT the imported actionCreator (saveCourse is actually a thunk)
    saveCourse(course).then(() => {
      history.push('/courses');
    });
  }

  /** Function component doesn't have a render and instead just uses a return statement */
  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired // any component loaded via <Route> gets history passed in on props from React Router
};

function getCourseBySlug(courses, slug) {
  // find() returns the value of the first element in the provided array that satisfies the provided testing function
  // find() returns undefined if no matches exist
  // (undefined || null) returns null
  return courses.find(course => course.slug === slug) || null;
}

/**
 * ownProps (2nd param) allows us to access any props that are being attached to this component
 * ownProps is auto-populated by redux
 *
 * */
function mapStateToProps(state, ownProps) {
  // read course slug from url
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0            // ensures that the ajax call to load courses is completed and state.courses is not empty before searching through them
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  // don't share the ENTIRE store's state with each component, else this component will rerender EVERY TIME any variable in the store is changed!
  return {
    course: course,
    courses: state.courses,
    authors: state.authors
  };
}

/** "Object Form" of mapDispatchToProps
 *
 * each property in object is a ref to a acton-creator { propRef: actionCreator }
 * dispatch is automatically injected into each action-creator!!
 * { propsVarName: importedActionCreatorWrappedInDispatch }
 *
 */
const mapDispatchToProps = {
  loadCourses: loadCourses,
  loadAuthors: loadAuthors,
  saveCourse: saveCourse
};

/**
 * mapStateToProps -> controls which state variables are exposed to our component
 * mapDispatchToProps (optional - this.props.dispatch() gets injected auto if omitted) -> contols which actions are exposed to our component (can be object or func)
 */
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
