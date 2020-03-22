import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';
import Spinner from './../common/Spinner';
import { toast } from 'react-toastify';

class CoursesPage extends Component {
  // using class field instead of constructor
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    // length check on the courses state to only make fetch calls when state is empty
    if (courses.length === 0) {
      // this.props.actions.loadCourses() is a thunk that can THROW an error (so it must be handled when called)
      actions.loadCourses().catch(error => {
        alert('Loading courses failed' + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert('Loading authors failed' + error);
      });
    }
  }

  handleDeleteCourse = course => {
    toast.success('Course deleted.');
    this.props.actions.deleteCourse(course).catch(error => {
      toast.error('Delete failed. ' + error.message, { autoClose: false });
    });
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h3>Courses</h3>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired, // actions is an object containing all actionCreators in courseActions.js
  loading: PropTypes.bool.isRequired
};

// ownProps (2nd param) allows us to access any props that are being attached to this component
function mapStateToProps(state, ownProps) {
  // don't share the ENTIRE store's state with each component, else this component will rerender EVERY TIME any variable in the store is changed!
  return {
    courses:
      state.authors.length === 0 // authors are fetched async, so need to check if available first, IF NOT pass back empty array
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }), // return object has convention { propsName: stateName } *stateName is defined in rootReducer
    authors: state.authors,
    loading: state.apiCallsInProgress > 0 // adds a boolean prop to our component that is true if there are any api call in progress according to our counter in the redux store (apiCallsInProgress)
  };
}

function mapDispatchToProps(dispatch) {
  // loadCourses will be available as this.props.actions.loadCourses when returned
  // bindActionCreators() can accept 1 function (action-creator) or 1 object (a bundle of action-creators) as the 1st param
  // and wrap them in the dispatch() function (which is the 2nd param)
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

/**
 * mapStateToProps -> controls which state variables are exposed to our component
 * mapDispatchToProps (optional - this.props.dispatch() gets injected auto if omitted) -> contols which actions are exposed to our component
 */
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

/** OLD WAY
  constructor(props) {
    super(props);
    this.state = {
      course: {
        title: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);  // DON'T NEED BINDING IF USING ARROW FUNCTIONS
  }

  handleChange(event) {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course }); // object shorthand syntax (ie - same as this.setState({course: course}) )
  }
 */

// LONG way to use connect()
// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
