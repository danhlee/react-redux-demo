import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class CoursesPage extends Component {
  // NEW WAY (class properties means no more "this" keyword, "this" is auto tied to component's instance)
  state = {
    course: {
      title: ''
    }
  };

  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };

    this.setState({ course }); // object shorthand syntax (ie - same as this.setState({course: course}) )
  };

  handleSubmit = event => {
    event.preventDefault();

    // using auto-injected dispatch() prop function to dispatch CREATE_COURSE action
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/** using onSubmit property on form allows submission via enter key as well as on clicking button (use this rather than onClick on submit button) */}
        <h3>Courses</h3>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired // actions is an object containing all actionCreators in courseActions.js
};

// ownProps (2nd param) allows us to access any props that are being attached to this component
function mapStateToProps(state, ownProps) {
  // don't share the ENTIRE store's state with each component, else this component will rerender EVERY TIME any variable in the store is changed!
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  // createCouse will be available as this.props.createCourse when returned
  // bindActionCreators() can accept 1 function (action-creator) or 1 object (a bundle of action-creators) as the 1st param 
  // and wrap them in the dispatch() function (which is the 2nd param)
  return {
    actions: bindActionCreators(courseActions, dispatch)
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
