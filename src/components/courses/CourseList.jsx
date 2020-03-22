import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** if you don't use PROPS DESTRUCTURING
 *
 * const CourseList = (props) => (
 *  const { courses } = props;
 *  return()
 * )
 *
 */

const CourseList = ({ courses, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {courses.map(course => {
        return (
          <tr key={course.id}>
            <td>
              <a
                className="btn btn-light"
                href={'http://pluralsight.com/courses/' + course.slug}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={'/course/' + course.slug}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(course)} 
              >
                Delete
              </button>
              {/** using arrow function that triggers onDeleteClick(course) otherwise it will fire on creation, can't use just reference onDeleteClick without parens, becaue then no params are being passed in */}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CourseList;
