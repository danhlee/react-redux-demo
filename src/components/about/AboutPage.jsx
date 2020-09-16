import React, { useState } from 'react';
import { connect } from 'react-redux';
import SchoolComponent from './SchoolComponent';
import { changeName } from '../../redux/actions/testGlobalAction';

const AboutPage = (props) => {

  const [stateVarCalledName, setNewNameValue] = useState('');


  function handleChange(e) {
    setNewNameValue(e.target.value);
  }

  function changeNameHandler() {
    props.changeNameAction(stateVarCalledName);
  }

  console.log('[NAME] COMPONENT RENDERED!');
  return (
    <>
      <h2>About</h2>
      <p>This app uses React, React Router, and other helpful libraries</p>
      <p>name: {props.myName}</p>
      <p>school: {props.mySchool}</p>
      <input value={stateVarCalledName} onChange={handleChange} />
      <button onClick={changeNameHandler}>Change Name</button>
      <SchoolComponent />
    </>
  );
};


function mapStateToProps(state) {
  return {
    myName: state.testReducer.name,
    mySchool: state.testReducer.school
  };
}

const mapDispatchToProps = {
  changeNameAction: changeName
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);