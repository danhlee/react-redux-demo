import React from 'react';
import { connect } from 'react-redux';
import {changeSchool} from '../../redux/actions/testGlobalAction';

class SchoolComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newSchoolValue: ''
    }

    this.changeNameFunction = this.changeNameFunction.bind(this);
    this.handleSchoolChange = this.handleSchoolChange.bind(this);
  }

  handleSchoolChange(e) {
    this.setState({
      newSchoolValue: e.target.value
    })
  }

  changeNameFunction() {
    this.props.changeSchoolAC(this.state.newSchoolValue);
  }

  

  render() {
    console.log('[SCHOOL] COMPONENT RENDERED!');
    return (
      <div>
        <h1>Hello, {this.props.school}</h1>
        <input type="text" value={this.state.newSchoolValue} onChange={this.handleSchoolChange} />
        <button onClick={this.changeNameFunction}>Change School</button>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    school: state.testReducer.school,
  };
}

const mapDispatchToProps = {
  changeSchoolAC: changeSchool,
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolComponent);